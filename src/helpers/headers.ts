import { isPlainObject } from './util'

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

export function processHeaders(headers: any, data: any): any {
    normalizeHeaderName(headers, 'Content-Type')
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {// 没有设置content-type时，默认添加
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers
}

export function parseHeaders(headers: string): any {
    // 这里为什么不直接用{}??? object.create(null)的类型为any
    let parsed=Object.create(null)
    if (!headers) {
        return parsed
    }
    
    headers.split('\r\n').forEach(line=>{
        // value里面有：时怎么处理？？let [key,...rest]=line.split(':')可以不？？
        // let [key,...value]=line.split(':')
        let [key,value]=line.split(':')
        key=key.trim().toLowerCase()
        if(!key){
            return
        }
        if(value){
            value=value.trim()
        }
        // if(value){
        //     value=Array.isArray(value)?value.join(':'):value.trim()
        // }
        parsed[key]=value
    })
    return parsed
}
