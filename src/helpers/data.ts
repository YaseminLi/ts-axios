import { isPlainObject } from './util'
// stringfy对象格式的request data
export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data)
    }
    return data
}

export function transformResponse(data:any):any{
    if(typeof data==='string'){
        try {
            data=JSON.parse(data) // 不一定转化成功，所以用try catch
        } catch (error) {
            // 什么都不用做
        }
    }
    return data
}
