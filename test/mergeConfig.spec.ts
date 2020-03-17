import axios from '../src/index'
import mergeConfig from '../src/core/mergeConfig'
describe('mergeConfig', () => {
    const defaults = axios.defaults
    // 第二个参数可以是undefined
    test('should accept undefined for second argument', () => {
        expect(mergeConfig(defaults, undefined)).toEqual(defaults)
    })
    // 第二个参数可以接受空对象
    test('should accept an object for second argument', () => {
        expect(mergeConfig(defaults, {})).toEqual(defaults)
    })
    // 是对参数的深拷贝,引用不相等
    test('should not leave references', () => {
        const merged = mergeConfig(defaults, {})
        expect(merged).not.toBe(defaults)
        expect(merged.headers).not.toBe(defaults.headers)
    })
    // url,params,data可以自定义数据
    test('should allow setting request options', () => {
        const config = {
            url: '__sample url__',
            params: '__sample params__',
            data: { foo: true }
        }
        const merged = mergeConfig(defaults, config)
        expect(merged.url).toBe(config.url)
        expect(merged.params).toBe(config.params)
        expect(merged.data).toEqual(config.data)
    })
    // url,params,data没有传入数据时为undefined,也就是只取undefined
    test('should not inherit request options', () => {
        const localDefaults = {
            url: '__sample url__',
            params: '__sample params__',
            data: { foo: true }
        }
        const merged = mergeConfig(localDefaults, {})
        expect(merged.url).toBeUndefined()
        expect(merged.params).toBeUndefined()
        expect(merged.data).toBeUndefined()
    })
    // config2没有传入headers时，使用默认defaults
    test('should return default headers if pass config2 with undefined', () => {
        expect(
            mergeConfig(
                {
                    headers: 'x-mock-header'
                },
                undefined
            )
        ).toEqual({
            headers: 'x-mock-header'
        })
    })
    // headers和auth属性做合并
    test('should merge auth, headers with defaults', () => {
        expect(
            mergeConfig(
                {
                    auth: undefined
                },
                {
                    auth: {
                        username: 'foo',
                        password: 'test'
                    }
                }
            )
        ).toEqual({
            auth: {
                username: 'foo',
                password: 'test'
            }
        })
        expect(
            mergeConfig(
                {
                    auth: {
                        username: 'foo',
                        password: 'test'
                    }
                },
                {
                    auth: {
                        username: 'baz',
                        password: 'foobar'
                    }
                }
            )
        ).toEqual({
            auth: {
                username: 'baz',
                password: 'foobar'
            }
        })
    })

    test('should overwrite auth, headers with a non-object value', () => {
        expect(
          mergeConfig(
            {
              headers: {
                common: {
                  Accept: 'application/json, text/plain, */*'
                }
              }
            },
            {
              headers: null
            }
          )
        ).toEqual({
          headers: null
        })
      })
    // 可以传入其他选项来merge
    test('should allow setting other options', () => {
        const merged = mergeConfig(defaults, {
            timeout: 123
        })
        expect(merged.timeout).toBe(123)
    })
})