import { CancelExecutor, CancelTokenSource, Canceler } from '../types/index'
import Cancel from './Cancel'
interface ResolvePromise {
    (reason?: Cancel): void
}
export default class CancelToken {
    promise: Promise<Cancel>
    reason?: Cancel
    constructor(executor: CancelExecutor) {
        let resolvePromise: ResolvePromise
        this.promise = new Promise<Cancel>(resolve => {
          resolvePromise = resolve
        })
        executor(message => {
            // 防止多次取消
            if (this.reason) {
                return
            }
            this.reason = new Cancel(message)
            resolvePromise(this.reason)
        })
    }
    throwIfRequested(){
        if (this.reason) {
            throw this.reason
        }
    }

    static source(): CancelTokenSource {
        // cancel断言有值
        let cancel!: Canceler
        const token = new CancelToken(c => {
            // 执行cancel函数时，其实就是执行executor函数的参数函数
            cancel = c
        })

        return {
            cancel,
            token
        }
    }
}