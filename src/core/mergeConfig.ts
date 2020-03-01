import { AxiosRequestConfig } from "../types"

function mergeConfig(defaults: AxiosRequestConfig, config: AxiosRequestConfig): AxiosRequestConfig {
    let merged = config
    for (let key in defaults) {
if()
    }
    return merged
}
export default mergeConfig

//都有的属性，以config为准，再用defaults补齐，添加headers.test
// config1 = {
//     method: 'get',

//     timeout: 0,

//     headers: {
//         common: {
//             Accept: 'application/json, text/plain, */*'
//         }
//     }
// }

// config2 = {
//     url: '/config/post',
//     method: 'post',
//     data: {
//         a: 1
//     },
//     headers: {
//         test: '321'
//     }
// }

// merged = {
//     url: '/config/post',
//     method: 'post',
//     data: {
//         a: 1
//     },
//     timeout: 0,
//     headers: {
//         common: {
//             Accept: 'application/json, text/plain, */*'
//         }
//       test: '321'
//     }
// }