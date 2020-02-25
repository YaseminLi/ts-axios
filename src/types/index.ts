// | 联合类型，可以取多种类型中的一种
// interface描述对象键值类型，type相当于是值类型，你自己定义的，与类型string，number等一样
export type Method = 'get' | 'GET'
    | 'delete' | 'Delete'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
    url?: string // 为什么要变成可选的呢？？
    method?: Method     // 指定传入的方法名
    data?: any     // ?:表示参数可选
    params?: any
    headers?: any
    responseType?: XMLHttpRequestResponseType
    timeout?: number
}

export interface AxiosResponse<T = any> {
    data: T
    status: number
    statusText: string
    headers: any
    config: AxiosRequestConfig
    request: any
}


// Promise<T>，T 是什么，则 resolve 函数参数的类型就是什么，这是 Promise 内部的实现
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> { }


// 供外部使用的接口
export interface AxiosError extends Error {
    config: AxiosRequestConfig
    code?: string
    request?: any
    response?: AxiosResponse
    isAxiosError: boolean
}

// axios类中的公共方法
export interface Axios {
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 混合类型的接口，本身是一个函数（参数为config,函数返回promise),又继承了axios的属性方法。
export interface AxiosInstance extends Axios {
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
    <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInterceptorManager<T> {
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
    eject(id: number): void
}

export interface ResolvedFn<T = any> {
    (val: T): T | Promise<T>
}

export interface RejectedFn {
    (error: any): any
}
