import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
    config: AxiosRequestConfig
    code?: string | null
    request?: any
    response?: AxiosResponse
    isAxiosError: boolean

    constructor(
        message: string,// message就是自定义报错的信息
        config: AxiosRequestConfig,
        code?: string | null,
        request?: any,
        response?: AxiosResponse,
    ) {
        super(message) // 这句原因导致测试覆盖率为50%

        this.config = config
        this.code = code
        this.request = request
        this.response = response
        this.isAxiosError = true // 与其它ERRor区分开，告诉别人这是Axios里的错误哦！

        Object.setPrototypeOf(this, AxiosError.prototype)// ts 的坑，用来明确原型，否则子类不能正常调用方法
    }
}
export function createError(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse): AxiosError {
    const error = new AxiosError(message, config, code, request, response)
    return error
}