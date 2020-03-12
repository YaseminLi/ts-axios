const toString = Object.prototype.toString

// val isDate是什么用法？？
export function isDate(val: any): val is Date {
    return toString.call(val) === '[object Date]'
}

// arrayBuffer formdata 不能排除掉
// export function isObject(val:any):val is Object{
//     return val!==null&&typeof val==='object'
// }

export function isPlainObject(val: any): val is Object {
    return toString.call(val) === '[object Object]'
}

// 这里的类型？？为什么加；?如果括号开头的语句不加分号，那么代码压缩后合并到一行后非常容易变成一个函数的调用了，所以需要加分号。另外以 +、-、/、()、[] 这些字符开头的语句，都需要加分号。 不用排除重复属性吗？
export function extend<T, U>(to: T, from: U): T & U {
    for (const key in from) {
        ; (to as T & U)[key] = from[key] as any
    }
    return to as T & U
}

export function deepMerge(...objs: any[]): any {
    const result = Object.create(null)
    objs.forEach(obj => {
        if (obj) {
            for (let key in obj) {
                const val = obj[key]
                if (isPlainObject(val)) {
                    if (isPlainObject(result[key])) {
                        result[key] = deepMerge(result[key], val)
                    } else {
                        result[key] = deepMerge(val)
                    }
                } else {
                    result[key] = val
                }
            }
        }
    })
    return result
}

export function isFormData(val: any): boolean {
    return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): boolean{
    return typeof val !== 'undefined' && val instanceof URLSearchParams
}

// 判断请求的url是否为绝对地址
export function isAbsoluteURL(url:string):boolean{
    return  /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

// 合并baseURL和请求url
export function combineURL(baseURL:string,relativeURL?:string):string{
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}