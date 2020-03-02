import { AxiosRequestConfig,AxiosPromise, AxiosResponse } from "../types"
import {transformResponse,transformRequest} from '../helpers/data'
import xhr from "./xhr"
import { buildURL } from '../helpers/url'
import {processHeaders,flatternHeaders} from '../helpers/headers'
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then(res=>{
        return transformReponseData(res)
    })

}
function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config)
    config.headers=transformHeaders(config)
    config.data=transformRequestData(config)
    config.headers = flatternHeaders(config.headers, config.method!)
}
function transformUrl(config: AxiosRequestConfig): string {
    const { url, params } = config
    return buildURL(url!, params)// ！类型断言，一定存在这个参数
}
function transformRequestData(config:AxiosRequestConfig):any{
    const {data}=config
    return transformRequest(data)
}
function transformHeaders(config:AxiosRequestConfig):any{
    const {headers={},data}=config
    return processHeaders(headers,data)
}

function transformReponseData(res:AxiosResponse):AxiosResponse{
    res.data=transformResponse(res.data)
    return res
}
export default dispatchRequest