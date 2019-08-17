import axios from '../../src/index'

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })
// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

interface ResponseData<T = any> {
  code: number
  message: string
  result: T
}
interface User {
  name: string
  age: number
}

function getUser() {
  return axios<ResponseData<User>>('/extend/user')
    .then(res => {
      console.log(res.data);
      return res.data
    }
    ).catch(error => console.log(error))
}

// getUser<User>()
async function test() {
  const user = await getUser()
  if (user) {
    console.log(user.result)
  }
}

test()