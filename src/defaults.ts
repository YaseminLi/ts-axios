import { AxiosRequestConfig } from './types/index'
const defaults: AxiosRequestConfig = {
    method: 'get',
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*'
        }
    },
    timeout: 0
}

//以下是对几种请求方法添加headers属性的简写

//不带requestData的方法
const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
    defaults.headers[method] = {}
})

//带requestData的方法 
const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export default defaults