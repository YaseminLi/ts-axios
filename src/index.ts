// 为什么./types就可以找到该文件夹下的index.ts文件，因为在tsconfig中配置了node文件解析策略
// export default 只导出一个，export可导出多个，所以引入方法也不一样
import { AxiosRequestConfig } from "./types"
import xhr from "./xhr"
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import {processHeaders} from './helpers/headers'
function axios(config: AxiosRequestConfig): void {
    processConfig(config)
    xhr(config)

}
function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config)
    config.headers=transformHeaders(config)
    config.data=transformRequestData(config)
}
function transformUrl(config: AxiosRequestConfig): string {
    const { url, params } = config
    return buildURL(url, params)
}
function transformRequestData(config:AxiosRequestConfig):any{
    const {data}=config
    return transformRequest(data)
}
function transformHeaders(config:AxiosRequestConfig):any{
    const {headers={},data}=config
    return processHeaders(headers,data)
}
export default axios