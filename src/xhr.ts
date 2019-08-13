import { AxiosRequestConfig } from "./types"
export default function xhr(congfig: AxiosRequestConfig): void {
    const { data = null, url, method = 'get', headers } = congfig
    const request = new XMLHttpRequest()
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
}