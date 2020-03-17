import axios from '../src/index'
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
            expect(request.method).toBe('GET')
        })
    })
    test('should treat method value as uppercase string', done => {
        axios({
            url: '/foo',
            method: 'POST'
        }).then(response => {
            // jasmine resolve出response后，这里就拿到了response
            // 老师的demo里是'post'
            expect(response.config.method).toBe('POST')
            done()
        })

        getAjaxRequest().then(request => {
            // 给最近一次的请求模拟一个响应
            request.respondWith({
                status: 200
            })
        })
    })


})
