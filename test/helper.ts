// 测试的辅助方法
export function getAjaxRequest():Promise<JasmineAjaxRequest>{
    return new Promise(resolve=>{
        // setTimeout 和直接resolve??
        setTimeout(()=>{
            // console.log('helper');
            return resolve(jasmine.Ajax.requests.mostRecent())
        },0)
    })
}
// jasmine.Ajax.requests.mostRecent() 拿到最近一次请求的 request 对象，这个 request 对象是 jasmine-ajax 库伪造的 xhr 对象，它模拟了 xhr 对象上的方法，并且提供一些 api 让我们使用

