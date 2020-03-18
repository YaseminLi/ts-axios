import axios, { AxiosError, AxiosResponse } from '../src/index'
import { getAjaxRequest } from './helper'
describe('request', () => {
    // 测试用例运行前的钩子函数
    beforeEach(() => {
        jasmine.Ajax.install()
    })
    // 测试用例运行结束的钩子函数
    afterEach(() => {
        jasmine.Ajax.uninstall()
    })
    test('should treat single string arg as url', () => {
        axios('/foo')
        // return 一个promise来解决异步
        return getAjaxRequest().then(request => {
            expect(request.url).toBe('/foo')
            expect(request.method).toBe('get')
        })
    })
    test('should treat method value as lowercase string', done => {
        axios({
            url: '/foo',
            method: 'POST'
        }).then(response => {
            // jasmine resolve出response后，这里就拿到了response
            // 老师的demo里是'post'
            expect(response.config.method).toBe('post')
            done()
        })

        getAjaxRequest().then(request => {
            // 给最近一次的请求模拟一个响应
            request.respondWith({
                status: 200
            })
        })
    })
    // 模拟网络错误
    test('should reject on network errors', done => {
        // axios请求成功调用的函数
        const resolveSpy = jest.fn((res) => {
            return res
        })
        const rejectSpy = jest.fn((err) => {
            return err
        })
        // 这里为什么用uninstall来模拟请求错误？本质上 jasmine.Ajax 就是 fake 了 XMLHTTPRequest，一旦 uninstall 了，那么请求就会变成真实的 ajax，你发送了 /foo，但本地并没有起任何服务和这个接口，所以就会触发网络错误。
        jasmine.Ajax.uninstall()
        axios('/foo').then(resolveSpy).catch(rejectSpy).then(next) //then(next)??
        function next(reason: AxiosResponse | AxiosError) {
            // reason就是reject出的值
            expect(resolveSpy).not.toHaveBeenCalled()
            expect(rejectSpy).toHaveBeenCalled()
            expect(reason instanceof Error).toBeTruthy()
            expect((reason as AxiosError).message).toBe('Network Error')
            expect(reason.request).toEqual(expect.any(XMLHttpRequest)) //expect.any(constructor)表示匹配任意由constructor创建的实例
        }
        //为什么还要install?测试用例结束的钩子函数要uninstall,之前已经已经uninstall了
        jasmine.Ajax.install()
        done()
    })
    // 模拟超时
    test('should reject when request timeout', done => {
        let err: AxiosError
        axios('/foo', {
            timeout: 2000,
            method: 'post'
        }).catch(error => {
            err = error
        })
        getAjaxRequest().then(request => {
            // @ts-ignore
            // 忽略ts报错，触发timeout事件
            request.eventBus.trigger('timeout')// 会走到axios的catch
            setTimeout(() => {
                expect(err instanceof Error).toBeTruthy()
                expect(err.message).toBe('Timeout of 2000 ms exceeded')
                done()
            }, 100)
        })
    })
    // 模拟合法状态码修改
    test('should reject when validateStatus returns false', done => {
        const resolveSpy = jest.fn((res) => {
            return res
        })
        const rejectSpy = jest.fn((err) => {
            return err
        })
        axios('/foo', {
            validateStatus(status) {
                return status !== 500
            }
        }).then(resolveSpy).catch(rejectSpy).then(next)
        getAjaxRequest().then(request => {
            request.respondWith({
                status: 500
            })
        })
        function next(reason: AxiosResponse | AxiosError) {
            expect(resolveSpy).not.toHaveBeenCalled()
            expect(rejectSpy).toHaveBeenCalled()
            expect(reason instanceof Error).toBeTruthy()
            expect((reason as AxiosError).message).toBe('Request failed with status code 500')
            expect((reason as AxiosError).response!.status).toBe(500)
            done()
        }
    })
    test('should resolve when validateStatus returns true', done => {
        const resolveSpy = jest.fn((res) => {
            return res
        })
        const rejectSpy = jest.fn((err) => {
            return err
        })
        axios('/foo', {
            validateStatus(status) {
                return status === 500
            }
        }).then(resolveSpy).catch(rejectSpy).then(next)
        getAjaxRequest().then(request => {
            request.respondWith({
                status: 500
            })
        })
        function next(res: AxiosResponse | AxiosError) {
            expect(rejectSpy).not.toHaveBeenCalled()
            expect(resolveSpy).toHaveBeenCalled()
            expect(res.config.url).toBe('/foo')
            done()
        }
    })
    test('should return JSON when resolved', done => {
        let response: AxiosResponse
        axios('/api/account/signup', {
            auth: {
                username: '',
                password: ''
            },
            method: 'post',
            headers: {
                Accept: 'application/json'
            }
        }).then(res => {
            response = res
        })
        getAjaxRequest().then(request => {
            request.respondWith({
                status: 200,
                statusText: 'OK',
                responseText: '{"a": 1}'
            })
        })
        setTimeout(() => {
            expect(response.data).toEqual({ a: 1 })
            done()
        }, 100)
    })
    test('should return JSON when rejected', done => {
        let response: AxiosResponse
        axios('/api/account/signup', {
            auth: {
                username: '',
                password: ''
            },
            method: 'post',
            headers: {
                Accept: 'application/json'
            }
        }).catch(err => {
            response = err.response
        })
        getAjaxRequest().then(request => {
            request.respondWith({
                status: 400,
                statusText: 'Bad Request',
                responseText: '{"error": "BAD USERNAME", "code": 1}'
            })
        })
        setTimeout(() => {
            expect(typeof response.data).toBe('object')
            expect(response.data.error).toBe('BAD USERNAME')
            expect(response.data.code).toBe(1)
            done()
        }, 100)
    })
})
