import axios from 'axios';
import { message as $message } from 'ant-design-vue';
import type { AxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN_KEY } from '../constants/CacheConstant';
import { Storage } from './storage';
// import { useUserStore } from '@/store/modules/user';
// import {ExclamationCircleOutlined} from '@ant-design/icons'

export interface RequestOptions {
    permCode?: string;
    isGetDataDirectly?: boolean;
    successMsg?: string;
    errorMsg?: string;
    isMock?: boolean;
}

const UNKNOWN_ERROR = '未知错误，请重试';
// const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const baseApiUrl = process.env.VUE_APP_BASE_API;
const baseMockUrl = process.env.VUE_APP_MOCK_API;

const service = axios.create({
    // baseURL: baseApiUrl,
    timeout: 6000,
});

service.interceptors.request.use(
    (config) => {
        const token = Storage.get(ACCESS_TOKEN_KEY);
        if (token && config.headers) {
            // token
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

service.interceptors.response.use(
    (response) => {
        const res = response.data;

        // if the custom code is not 200, it is judged as an error.
        if (res.code !== 200) {
            $message.error(res.message || UNKNOWN_ERROR);

            // Illegal token
            if (res.code === 11001 || res.code === 11002) {
                window.localStorage.clear();
                window.location.reload();
            }

            // throw other
            const error = new Error(res.message || UNKNOWN_ERROR) as Error & { code: any };
            error.code = res.code;
            return Promise.reject(error);
        } else {
            return res;
        }
    },
    (error) => {
        // Show code 422 and 500
        const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
        $message.error(errMsg);
        error.message = errMsg;
        return Promise.reject(error);
    },
);

export type Response<T = any> = {
    code: number;
    message: string;
    data: T;
};

export type BaseResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param config
 * @param options
 */
export const request = async <T = any>(
    config: AxiosRequestConfig,
    options: RequestOptions = {},
): Promise<T> => {
    try {
        const { successMsg, errorMsg, permCode, isMock, isGetDataDirectly = true } = options;
        // if (permCode && !useUserStore().perms.includes(permCode)) {
        //     return $message.error('你没有访问该接口的权限，请联系管理员！');
        // }
        // @ts-ignore
        const fullUrl = `${(isMock ? baseMockUrl : baseApiUrl) + config.url}`;
        config.url = fullUrl.replace(/(?<!:)\/{2,}/g, '/');
        // if (IS_PROD) {
        //   // 保持api请求的协议与当前访问的站点协议一致
        //   config.url.replace(/^https?:/g, location.protocol);
        // }
        const res = await service.request(config);
        successMsg && $message.success(successMsg);
        errorMsg && $message.error(errorMsg);
        return isGetDataDirectly ? res.data : res;
    } catch (error: any) {
        return Promise.reject(error);
    }
};