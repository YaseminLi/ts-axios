import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types"
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
// 发送请求接收响应并构建响应对象，对res的加工处理放到外面
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { data = null, url, method = 'get', headers, responseType, timeout, cancelToken,withCredentials } = config
        const request = new XMLHttpRequest()
        // 请求中传入responseType时
        if (responseType) {
            request.responseType = responseType
        }
        if (timeout) {
            request.timeout = timeout
        }
        // withCredentials 为true获得的第三方cookies，将会依旧享受同源策略
        if(withCredentials){
            request.withCredentials=true
        }
        // 请求配置化
        request.open(method.toUpperCase(), url!, true)
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
        if (cancelToken) {
            cancelToken.promise.then(reason=> {
                request.abort()
                reject(reason)
            })
        }
        request.send(data)
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return
            }
            if (request.status === 0) {// 为0 时，请求未完成或超时或网络错误
                return
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
            // 这里为什么还要再用一次接口呢？？赋值的时候就可以检查类型了
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            handleResponse(response)
        }
        function handleResponse(response: AxiosResponse) {
            if (request.status >= 200 && request.status <= 300) {
                resolve(response)
            } else {
                // reject(new Error(`Request failed with status code ${response.status}`))
                reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
            }
        }
        // 处理网络错误，不加new Error是什么效果?控制台里error没有error标签
        request.onerror = function () {
            // reject(new Error('Network Error'))
            reject(createError('Network Error', config, null, request))
        }
        // 处理超时错误
        request.ontimeout = function () {
            // reject(new Error(`Timeout of ${timeout} ms exceeded`)) 
            reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
        }
    })

}