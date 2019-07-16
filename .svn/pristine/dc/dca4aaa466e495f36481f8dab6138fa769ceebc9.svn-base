import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { MessageBox } from 'element-ui'
import Cookies from 'js-cookie'
import _ from 'lodash'
import router from '../router/index'
// import process from '../../config/prod.env'

// 接口域名
axios.defaults.baseURL = process.env.VUE_APP_API
axios.defaults.headers.AppType = 'pc'
axios.defaults.headers.posTypeNewFlag = true
axios.defaults.headers.Accept = 'application/json'

// 允许设置cookie
axios.defaults.withCredentials = true

// 拦截request
axios.interceptors.request.use(
    (config) => {
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)
// 拦截response
axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error.response)
    }
)

/**
 *
 *
 * @export
 * @param {string} [url='']
 * @param {any} [data={}]
 * @param {(string | AxiosRequestConfig)} [type='post']
 * @returns
 */
export async function fetch<T>(url: string, data?: object | string, type?: string | AxiosRequestConfig): Promise<AxiosResponse<Res<T>>> {
    const requestConfig: AxiosRequestConfig = {}
    /*let type: string | AxiosRequestConfig = param[2] || 'post'*/
    let config: AxiosRequestConfig = {}
    if (!type) {
        type = 'post'
    }
    if (typeof type !== 'string') {
        config = type
        type = config.method
    }

    requestConfig.method = type || 'post'
    requestConfig.url = url
    requestConfig.url = `${url}?t=${Date.now()}`

    if (type === 'get') {
        if (data && typeof data === 'object') {
            for (const [key, val] of Object.entries(data)) {
                if (Array.isArray(val)) {
                    // @ts-ignore
                    data[key] = val.join(',')
                }
            }
        }
        requestConfig.params = data || {}
    } else {
        requestConfig.data = data || {}
    }
    try {
        const response: AxiosResponse<Res<T>> = await axios(_.assign(requestConfig, config))
        const res: Res<T> = response.data
        if (res.code !== 200) {
            if (res.code === 401) {
                let tip = '未登录或超时退出'
                MessageBox.alert(tip, '提示', {
                    callback: (action) => {
                        MessageBox.close()
                        Cookies.remove('per', { domain: '.sztest.job5156.com', path: '/' })
                        Cookies.remove('per', { domain: '.job5156.com', path: '/' })
                        // 针对个人中心，未登录跳到登录页
                        if (location.pathname.startsWith('/per')) {
                            location.href = process.env.VUE_APP_DOMAIN + '/login/per'
                        }
                    },
                    type: 'error'
                })
            }
        }
        return response
    } catch (e) {
        console.log(e)
        // let response = e.response
        // let tip: string = ''
        // if (response.status !== 200 && response.status !== 304) {
        //     tip = '您的网络有点慢，请稍后再试？'
        //     if (response.status === 400) {
        //         tip = response.msg
        //     }
        //     MessageBox.alert(tip, '提示', {
        //         callback: (action) => {
        //             MessageBox.close()
        //         },
        //         type: 'error'
        //     })
        // }
        return e
    }
}

export default async function <T>(url: string, data?: object | string, type?: string | AxiosRequestConfig): Promise<Res<T>> {
    const response = await fetch<T>(url, data, type)
    return response.data
}

