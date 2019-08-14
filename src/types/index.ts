import { request } from "http";

// | 联合类型，可以取多种类型中的一种
// interface描述对象键值类型，type相当于是值类型，你自己定义的，与类型string，number等一样
export type Method='get' | 'GET'
| 'delete' | 'Delete'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'

export interface AxiosRequestConfig{
    url:string
    method?:Method     // 指定传入的方法名
    data?:any     // ?:表示参数可选
    params?:any
    headers?:any
    responseType?:XMLHttpRequestResponseType
    timeout?:number
}

export interface AxiosResponse{
    data:any
    status:number
    statusText:string
    headers:any
    config:AxiosRequestConfig
    request:any
}


// Promise<T>，T 是什么，则 resolve 函数参数的类型就是什么，这是 Promise 内部的实现
export interface AxiosPromise extends Promise<AxiosResponse>{}


// 供外部使用的接口
export interface AxiosError extends Error{
    config:AxiosRequestConfig
    code?:string
    request?:any
    response?:AxiosResponse
    isAxiosError: boolean
}
