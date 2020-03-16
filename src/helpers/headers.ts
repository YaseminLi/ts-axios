import { isPlainObject, deepMerge } from './util'
import { Method } from '../types/index'
// 将headers的属性名替换为指定大小写法
export function normalizeHeaderName(headers: any, normalizedName: string): void {
    if (!headers) {
        return
    }
    Object.keys(headers).forEach(name => {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name]
            delete headers[name]
        }
    })
}
// 将headers属性名contnt-type规范写法，当data是对象时，给headers添加content-type
export function processHeaders(headers: any, data: any): any {
    normalizeHeaderName(headers, 'Content-Type')
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {// 没有设置content-type时，默认添加
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers
}

// 将字符串headers转化成对象
export function parseHeaders(headers: string): any {
    // {} 没有索签名,parsed[key]会报错
    let parsed = Object.create(null)
    if (!headers) {
        return parsed
    }
    headers.split('\r\n').forEach(line => {
        let [key, ...vals] = line.split(':')
        key = key.trim().toLowerCase()
        if (!key) {
            return
        }
        const value=vals.join(':').trim()
        parsed[key] = value
    })
    return parsed
}

// 默认配置合并后，对headers属性值进行处理，对于 common 中定义的 header 字段，我们都要提取，而对于 post、get 这类提取，需要和该次请求的方法对应,最后再删除多余的属性
export function flattenHeaders(headers: any, method: Method): any {
    if (!headers) {
        return headers
    }
    headers = deepMerge(headers.common || {}, headers[method] || {}, headers)
    // 多余的属性
    const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
    methodsToDelete.forEach(method => {
        delete headers[method]
    })
    return headers
}
