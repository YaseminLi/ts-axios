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
// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

// instance.get('/more/get').then(res => {
//   console.log(res)
// })



// 上传和下载速度的监控
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// const instance = axios.create()
// // 计算进度条显示比例
// function calculatePercentage(loaded: number, total: number) {
//   return Math.floor(loaded * 1.0) / total
// }

// // 加载进度条
// function loadProgressBar() {
//   // 添加请求拦截器
//   const setupStartProgress = () => {
//     instance.interceptors.request.use(config => {
//       // 进度条开始
//       NProgress.start()
//       return config
//     })
//   }

//   const setupUpdateProgress = () => {
//     const update = (e: ProgressEvent) => {
//       console.log(e.loaded)
//       console.log(e.total)
//       NProgress.set(calculatePercentage(e.loaded, e.total))
//     }
//     instance.defaults.onDownloadProgress = update
//     instance.defaults.onUploadProgress = update
//   }
// // 添加响应拦截器
//   const setupStopProgress = () => {
//     instance.interceptors.response.use(response => {
//       // 进度条结束
//       NProgress.done()
//       return response
//     }, error => {
//       NProgress.done()
//       return Promise.reject(error)
//     })
//   }

//   setupStartProgress()
//   setupUpdateProgress()
//   setupStopProgress()
// }

// loadProgressBar()

// const downloadEl = document.getElementById('download')

// // 点击下载发送请求
// downloadEl!.addEventListener('click', e => {
//   instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
// })

// const uploadEl = document.getElementById('upload')

// // 点击上传文件
// uploadEl!.addEventListener('click', e => {
//   const data = new FormData()
//   const fileEl = document.getElementById('file') as HTMLInputElement
//   if (fileEl.files) {
//     data.append('file', fileEl.files[0])

//     instance.post('/more/upload', data)
//   }
// })


// http授权
// axios.post('/more/post', {
//   a: 1
// }, {
//   auth: {
//     username: 'Yee1',
//     password: '123456'
//   }
// }).then(res => {
//   console.log(res)
// })

// 自定义状态码
axios.get('/more/304').then(res => {
  console.log(res)
}).catch((e) => {
  console.log(e.message)
})

axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch((e) => {
  console.log(e.message)
})