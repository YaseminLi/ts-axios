import { AxiosRequestConfig } from "../types"
import { isPlainObject, deepMerge } from '../helpers/util'
// 合并策略：['url','params','data']这几种属性按照config2的值，其他的优先取config2，headers走复杂合并

// 默认合并策略：优先取config2
function defaultStrat(val1: any, val2: any): any {
    // 这里注意undefined 是string类型
    return typeof val2 !== 'undefined' ? val2 : val1
}

// 只取config2
const stratKeysFromVal2 = ['url', 'params', 'data']
function fromVal2Strat(val1: any, val2: any): any {
    if (typeof val2 !== undefined) {
        return val2
    }
}
const strats = Object.create(null)
stratKeysFromVal2.forEach(key => {
    strats[key] = fromVal2Strat   
})



// 复杂合并
function deepMergeStrat(val1: any, val2: any): any {
    if (isPlainObject(val2)) {
        return deepMerge(val1, val2)
    } else if (typeof val2 !== 'undefined') {
        return val2
    } else if (isPlainObject(val1)) {
        return deepMerge(val1)
    } else if (typeof val1 !== 'undefined') {
        return val1
    }
}
const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(key => {
    strats[key] = deepMergeStrat
})

function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
    let config = Object.create(null)
    if (!config2) {
        config2 = {}
    }
    for (let key in config2) {
        mergeField(key)
    }
    for (let key in config1) {
        if (!config2[key]) {
            mergeField(key)
        }
    }

    function mergeField(key: string): void {
        const strat = strats[key] || defaultStrat
        config[key] = strat(config1[key], config2![key])
    }
    return config
}
export default mergeConfig
