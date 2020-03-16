import { transformRequest, transformResponse } from '../../src/helpers/data'
describe('helpers:data', () => {
    describe('transformRequest', () => {
        test('should transform request data if data is plainObject', () => {
            const data = { a: 1 }
            expect(transformRequest(data)).toBe('{"a":1}')
        })
        test('should do nothing  if data is not plainObject', () => {
            const data = new URLSearchParams('a=b')
            expect(transformRequest(data)).toBe(data)
        })
    })
    describe('transformResponse', () => {
        test('should transform response data to Object if data is a JSON string', () => {
            const a = '{"a": 2}'
            expect(transformResponse(a)).toEqual({ a: 2 })
        })

        test('should do nothing if data is a string but not a JSON string', () => {
            const a = '{a: 2}'
            expect(transformResponse(a)).toBe('{a: 2}')
        })

        test('should do nothing if data is not a string', () => {
            const a = { a: 2 }
            expect(transformResponse(a)).toBe(a)
        })
    })
})