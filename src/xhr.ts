//发送请求


import { AxiosRequestConfig } from "./types"
export default function xhr(congfig: AxiosRequestConfig): void {
    const { data = null, url, method = 'get' } = congfig
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)
    request.send(data)
}