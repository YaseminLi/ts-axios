//为什么./types就可以找到该文件夹下的index.ts文件，因为在tsconfig中配置了node文件解析策略
//export default 只导出一个，export可导出多个，所以引入方法也不一样

import { AxiosRequestConfig } from "./types"
import xhr from "./xhr"
function axios(config: AxiosRequestConfig) {
    xhr(config)

}
export default axios