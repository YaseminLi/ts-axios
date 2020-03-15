import {
    isDate,
    isPlainObject,
    isFormData,
    isURLSearchParams,
    extend,
    deepMerge
} from '../../src/helpers/util'

describe('helpers:uril', () => {
    describe('isXX', () => {
        test('should validate Date', () => {
            expect(isDate(new Date())).toBeTruthy()
            expect(isDate(Date.now())).toBeFalsy()
        })
        test('should validate PlainObject', () => {
            expect(isPlainObject({})).toBeTruthy
            expect(isPlainObject(new Date())).toBeFalsy()
        })
        test('should validate FormData',()=>{
            expect(isFormData(new FormData())).toBeTruthy()
            expect(isFormData({})).toBeFalsy()
        })
        test('should validate URLSearchParams',()=>{
            expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
            expect(isURLSearchParams('a=1&b=2')).toBeFalsy()
        })
    })
    describe('extend',()=>{
    })
    describe('deepMerge',()=>{
    })
})