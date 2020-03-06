import axios from '../../src/index'
import qs from 'qs'
import {AxiosTransformer} from '../../src/types/index'
axios({
  transformRequest: [(function(data) {
    console.log('hello');
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.a = 333
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})