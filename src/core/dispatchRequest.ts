// 对请求数据和响应数据的处理
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types"
import xhr from "./xhr"
import { buildURL } from '../helpers/url'
import { processHeaders, flatternHeaders } from '../helpers/headers'
import transform from './transform'
import {isAbsoluteURL,combineURL} from '../helpers/util'
export function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    throwIfCancellationRequested(config)
    processConfig(config)
    return xhr(config).then(res => {
        return transformReponseData(res)
    })
}
function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config)
    config.headers = transformHeaders(config)
    config.data = transform(config.data, config.headers, config.transformRequest)
    config.headers = flatternHeaders(config.headers, config.method!)
}
export function transformUrl(config: AxiosRequestConfig): string {
    let { url, params, paramsSerializer,baseURL } = config
    if(baseURL&&!isAbsoluteURL(url!)){
        url=combineURL(baseURL,url)
    }
    
    return buildURL(url!, params, paramsSerializer)// ！类型断言，一定存在这个参数
}
function transformHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config
    return processHeaders(headers, data)
}

function transformReponseData(res: AxiosResponse): AxiosResponse {
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested()
    }
}