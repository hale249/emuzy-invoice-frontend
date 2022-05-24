import axios from 'axios';
import type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { message } from 'ant-design-vue';
import Cookie from '@/utils/cookie';

const baseURL = '';

const service = axios.create({
    baseURL,
    timeout: 10000
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = Cookie.getCookie('token')
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (err: AxiosError) => Promise.reject(err)
)

service.interceptors.response.use(
    (res: AxiosResponse) => {
        return res.data
    },
    (err: AxiosError) => {
        if (err.response) {
            Cookie.removeCookie('token')
            //   location.reload();
        }
        message.error(err.message)
        return Promise.reject(err)
    }
)

export default service;