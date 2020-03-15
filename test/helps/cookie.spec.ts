import cookie from '../../src/helpers/cookie'
describe('helpers: cookie', () => {
    test('should read cookies', () => {
        document.cookie = 'name=vip'
        expect(cookie.read('name')).toBe('vip')
    })
    test('should return null if cookie name is not exist', () => {
        document.cookie = 'name=vip'
        expect(cookie.read('age')).toBeNull()
    })
})