import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types"
import { parseHeaders,} from '../helpers/headers'
import { createError } from '../helpers/error'
import cookie from '../helpers/cookie'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
// 发送请求接收响应并构建响应对象，对res的加工处理放到外面
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const {
            data = null,
            url,
            method = 'get',
            headers,
            responseType,
            timeout,
            cancelToken,
            withCredentials,
            xsrfCookieName,
            xsrfHeaderName,
            onDownloadProgress,
            onUploadProgress,
            auth,
            validateStatus
        } = config
        const request = new XMLHttpRequest()// 第一步：创建request实例

        // method 方法转化为大写
        request.open(method.toUpperCase(), url!, true)// 第二步：request.open方法初始化

        configureRequest()// 第三步：执行 configureRequest 配置 request 对象

        addEventListener()// 第四步：执行 addEvents 给 request 添加事件处理函数

        processHeaders() // 第五步：执行 processHeaders 处理请求 headers

        processCancel()// 第六步：执行 processCancel 处理请求取消逻辑

        request.send(data)// 第七步：执行 request.send 方法发送请求


        // 配置request对象
        function configureRequest(): void {
            // 请求中传入responseType时
            if (responseType) {
                request.responseType = responseType
            }
            if (timeout) {
                request.timeout = timeout
            }
            // withCredentials 为true获得的第三方cookies，将会依旧享受同源策略
            if (withCredentials) {
                request.withCredentials = true
            }
        }
        // 给 request 添加事件处理函数
        function addEventListener(): void {
            if (onDownloadProgress) {
                request.onprogress = onDownloadProgress
            }
            if (onUploadProgress) {
                request.upload.onprogress = onUploadProgress
            }
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
                if (!validateStatus||validateStatus!(response.status)) {
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
        }
        // 处理请求headers
        function processHeaders(): void {
            // header中添加cookie
            if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
                const xsrfValue = cookie.read(xsrfCookieName)
                if (xsrfValue) {
                    headers[xsrfHeaderName!] = xsrfValue
                }
            }

            // 如果上传的数据为formdata,删除content-type属性，让浏览器自动设置
            if (isFormData(data)) {
                delete headers['Content-Type']
            }

            // 如果设置了auth属性，header 中添加 Authorization 属性
            if(auth){
                headers['Authorization']='Basic '+btoa(auth.username+':'+auth.password)
            }
            Object.keys(headers).forEach(name => {
                // data 为空时，设置content-type无效
                if (data === null && name.toLowerCase() === 'content-type') {
                    delete headers[name]
                } else {
                    request.setRequestHeader(name, headers[name])
                }
            })
        }
        // 处理请求取消逻辑
        function processCancel(): void {
            if (cancelToken) {
                cancelToken.promise.then(reason => {
                    request.abort()
                    reject(reason)
                })
            }
        }
    })
}