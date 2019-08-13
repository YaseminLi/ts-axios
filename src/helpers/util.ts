const toString=Object.prototype.toString

// val isDate是什么用法？？
export function isDate(val:any):val is Date{
return toString.call(val)==='[object Date]'
}

// arrayBuffer formdata 不能排除掉
// export function isObject(val:any):val is Object{
//     return val!==null&&typeof val==='object'
// }

export function isPlainObject(val:any):val is Object{
    return toString.call(val)==='[object Object]'
}