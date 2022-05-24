import type { AxiosResponse, AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios'
import Cookie  from '@/utils/cookie'
// @ts-ignore
import { Response, AxiosRequestOptions, ReqOptions, RequestTypeEnum } from '#/interceptorAxios'

import { clone, objToParams } from '@/utils/helper';
import { isString } from '@/utils/string';
import axios from 'axios'
import { message } from 'ant-design-vue'

export class Request {
    private reqInstance: AxiosInstance
    private readonly opts: AxiosRequestOptions

    constructor(opts: AxiosRequestOptions) {
        this.opts = opts
        this.reqInstance = axios.create(opts)
        this.initInterceptors()
    }

    /**
     @description:拦截器配置
     */
    private initInterceptors() {
        // request
        this.reqInstance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                 const token = Cookie.getCookie('token')
                if (token && config.headers) {
                  config.headers['Authorization'] = `Bearer ${token}`
                }
                return config
            },
            (err: AxiosError) => Promise.reject(err)
        )

        // response
        this.reqInstance.interceptors.response.use(
            (res: AxiosResponse) => {
                return res.data
            },
            (err: AxiosError) => {
                message.error(err.message)
                return Promise.reject(err)
            }
        )
    }

    /**
     @description: restful api
     */

    get<T = any>(config: AxiosRequestConfig, options?: ReqOptions): Promise<T> {
        return this.request(
            {
                ...config,
                method: 'GET'
            },
            options
        )
    }
    post<T = any>(config: AxiosRequestConfig, options?: ReqOptions): Promise<T> {
        return this.request(
            {
                ...config,
                method: 'POST'
            },
            options
        )
    }
    put<T = any>(config: AxiosRequestConfig, options?: ReqOptions): Promise<T> {
        return this.request(
            {
                ...config,
                method: 'PUT'
            },
            options
        )
    }
    delete<T = any>(config: AxiosRequestConfig, options: ReqOptions): Promise<T> {
        return this.request(
            {
                ...config,
                method: 'DELETE'
            },
            options
        )
    }

    //   merge config
    private handleConfig(config: AxiosRequestConfig, options: ReqOptions): AxiosRequestConfig {
        const { prefix } = options
        if (prefix) {
            config.url = `${prefix}${config.url}`
        }
        const params = config.params
        if (params) {
            if (config.method?.toLowerCase() === RequestTypeEnum.GET) {
                if (params && isString(params)) {
                    config['url'] = config.url + params
                } else {
                    config['url'] = config.url + objToParams(config.params)
                }
                config.params = undefined
            } else {
                // 非GET
                if (isString(params)) {
                    config.url = config.url + params
                } else {
                    config.url = config.url + objToParams(config.params)
                }
                config.params = undefined
            }
        }
        return config
    }

    request<T = any>(config: AxiosRequestConfig, options?: ReqOptions): Promise<T> {
        let tempConfig: AxiosRequestOptions = clone(config)
        const { initOptions } = this.opts
        const opts = { ...initOptions, ...options }
        tempConfig = this.handleConfig(tempConfig, opts)

        return new Promise((resolve, reject) => {
            this.reqInstance
                .request<any, AxiosResponse<Response>>(tempConfig)
                .then((res: AxiosResponse<Response>) => {
                    resolve((res as unknown) as Promise<T>)
                })
                .catch((e: Error | AxiosError) => {
                    reject(e)
                })
        })
    }
}
// https://github.com/4xian/vite-admin-ts/blob/main/src/utils/request/request.ts