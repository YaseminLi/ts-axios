import axios from '../../src/index'


// 跨域携带cookie
// document.cookie='a=b'
// axios.get('/more/get').then(res => {
//   console.log(res.data)
// })

// axios.post('http://127.0.0.1:8088/more/server2', { }, {
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })


// xsrf攻击
const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => {
  console.log(res)
})