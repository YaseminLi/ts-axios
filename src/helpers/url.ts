import { isDate, isPlainObject,isURLSearchParams } from './util'

// 解析URL接口
interface URLOrigin {
    protocol: string
    host: string
}
function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}
export function buildURL(url: string, params?: any, paramsSerializer?:(params: any) => string): string {
    if (!params) {
        return url
    }
    let serializedParams
    if (paramsSerializer) {
        // 优先使用自定义参数序列化方法
        serializedParams = paramsSerializer(params)
    } else if (isURLSearchParams(params)) {
        // 如果params是URLSearchParams实例，直接返回toString
        serializedParams = params.toString()
    } else {
        const parts: string[] = []
        Object.keys(params).forEach((key) => {
            const val = params[key]
            if (val === null || typeof val === 'undefined') {
                return
            }
            let values = []
            if (Array.isArray(val)) {
                values = val
                key += '[]'
            } else {
                values = [val]
            }
            values.forEach((val) => {
                if (isDate(val)) {
                    val = val.toISOString()
                }
                if (isPlainObject(val)) {
                    val = JSON.stringify(val)
                }
                parts.push(`${encode(key)}=${encode(val)}`)
            })
        })
        serializedParams = parts.join('&')
    }
    if (serializedParams) {
        let markIndex = url.indexOf('#')
        if (markIndex !== -1) {
            url = url.substring(0, markIndex)
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }

    return url
}

// 判断是不是同源请求
export function isURLSameOrigin(requestURL: string): boolean {
    // 请求的url解析
    const parsedOrigin = resolveURL(requestURL)
    return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host)
}
const urlParsingNode = document.createElement('a')
// 当前的url解析
const currentOrigin = resolveURL(window.location.href)
// 解析协议和域名
function resolveURL(url: string): URLOrigin {
    urlParsingNode.setAttribute('href', url)
    const { protocol, host } = urlParsingNode
    return { protocol, host }
    // 也可直接用origin origin=protocal+host
}