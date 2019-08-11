// | 联合类型，可以取多种类型中的一种
//interface描述对象键值类型，type相当于是值类型，你自己定义的，与类型string，number等一样
export type Method='get' | 'GET'
| 'delete' | 'Delete'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'

export interface AxiosRequestConfig{
    url:string
    method?:Method     //指定传入的方法名
    data?:any     //?:表示参数可选
    params?:any
}
