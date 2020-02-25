import { ResolvedFn, RejectedFn } from '../types/index'
interface Interceptor<T> {
    resolved: ResolvedFn<T>
    rejected?: RejectedFn
}
class InterceptorManager<T>{
    private interceptors: Array<Interceptor<T> | null>
    constructor() {
        this.interceptors = []
    }
    use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
        this.interceptors.push({
            resolved,
            rejected
        })
        return this.interceptors.length - 1
    }
    eject(id: number): void {
        if (this.interceptors[id]) {
            this.interceptors[id] = null
        }

    }
}
export default InterceptorManager