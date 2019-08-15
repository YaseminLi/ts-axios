import {AxiosInstance} from './types'
import Axios from './core/Axios'
import {extend} from './helpers/util'

function createInstance():AxiosInstance{
    const context =new Axios()
    const instance=Axios.prototype.request.bind(context)
    extend(instance,context)
// instance 本身是一个函数，又拥有了 Axios 类的所有原型和实例属性
    return instance as AxiosInstance
}
const axios=createInstance()
export default axios