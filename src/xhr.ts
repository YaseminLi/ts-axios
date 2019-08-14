import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "./types"
import {parseHeaders} from './helpers/headers'

// 发送请求接收响应并构建响应对象，对res的加工处理放到外面
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise(resolve => {
        const { data = null, url, method = 'get', headers, responseType } = config
        const request = new XMLHttpRequest()
        // 请求中传入responseType时
        if (responseType) {
            request.responseType = responseType
        }
        request.open(method.toUpperCase(), url, true)
        // if (headers['Content-Type']) {
        //     request.setRequestHeader('Content-Type', headers['Content-Type'])
        // }
        Object.keys(headers).forEach(name => {
            // data 为空时，设置content-type无效
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })
        request.send(data)
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
            // 这里为什么还要再用一次接口呢？？
            const response:AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers:responseHeaders,
                config,
                request
            }
            resolve(response)
        }
    })

}