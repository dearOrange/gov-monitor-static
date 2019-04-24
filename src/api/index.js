import axios from 'axios'
import qs from 'qs'
import config from '@/config'
import { showErrorMessage } from '@utils/error'

import { Message } from 'element-ui'

// 创建axios实例，可以自定义配置
const instance = axios.create({
  baseURL: config.server,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 响应拦截器

instance.interceptors.response.use(
  ...(() => {
    let result = {}
    return [
      response => {
        let { status, data } = response
        if (status === 200) {
          let success = data.code === '0'
          let code = data.code
          if (!success) {
            showErrorMessage(code, data)
          }
          return Promise.resolve({
            success,
            msg: '', // TODO
            data
          })
        }
      },
      ({ message, response }) => {
        let { status, data } = response
        showErrorMessage(status)
        return Promise.resolve({
          success: false,
          msg: message,
          data
        })
      }
    ]
  })()
)

// instance.interceptors.response.use(
//   response => {
//     if (response.status === 200) {
//       return Promise.resolve(response)
//     } else {
//       return Promise.reject(response)
//     }
//   },
//   error => {
//     console.log(error)
//     return Promise.reject(error.response)
//   }
// )

function get(url, params = {}) {
  return instance.get(url, {
    params
  })
  // .then(res => {
  //   return res.data
  // })
  // .catch(err => {
  //   // TODO 错误情况
  //   return {}
  // })
}

function post(url, params = {}) {
  return instance.post(url, qs.stringify(params))
  // .then(res => {
  //   return res.data
  // })
  // .catch(err => {
  //   // TODO 错误情况
  //   return {}
  // })
}

export let GET = get
export let POST = post

// export default instance
