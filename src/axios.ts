import { AxiosStatic, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
let i = 0
function createInstance(config: AxiosRequestConfig): AxiosStatic {
    const context = new Axios(config)
    const instance = Axios.prototype.request.bind(context)
    extend(instance, context)
    // instance 本身是一个函数，又拥有了 Axios 类的所有原型和实例属性
    return instance as AxiosStatic
}
const axios = createInstance(defaults)
axios.create = function create(config) {
    return createInstance(mergeConfig(defaults, config))
}
export default axios 