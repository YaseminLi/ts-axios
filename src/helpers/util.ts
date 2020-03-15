const toString = Object.prototype.toString

// val is Date是什么用法？为布尔值，返回值是Date类型吗
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
export function isFormData(val: any): boolean {
    return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): boolean {
    return typeof val !== 'undefined' && val instanceof URLSearchParams
}


// 交叉类型，类型断言 把from上的属性全部扩展到to上，包括原型上的属性
export function extend<T, U>(to: T, from: U): T & U {
    for (const key in from) {
        ; (to as T & U)[key] = from[key] as any
    }
    return to as T & U
}

// 对象的深度合并
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


