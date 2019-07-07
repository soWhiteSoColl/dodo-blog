import axios from 'axios'
import qs from 'qs'
import { Message } from 'ui'

const requestQueue = []
const cancelToken = axios.CancelToken
axios.defaults.baseURL = 'https://www.dodoblog.cn/api'
axios.defaults.withCredentials = true

const generateCancelToken = (request = {}) => {
  const { params = {}, url, method } = request
  const parmasStr = qs.stringify(params)
  const token = `${url}?${parmasStr}&method=${method}`
  return token
}

let removePending = (request = {}) => {
  const currentToken = request.customCancelToken || generateCancelToken(request)
  requestQueue.filter(({ token, cancel }) => {
    if (token === currentToken) {
      cancel('same request has been cancel')
      return false
    }
    return true
  })
}

axios.interceptors.response.use(response => {
  removePending(response.config)

  // 特殊repsonse，包括值类型的response和已经经过axois处理的response
  if (
    typeof response === 'string' ||
    typeof response === 'number' ||
    typeof response === 'boolean' ||
    response['hasAxiosPassport'] === true
  ) {
    return Promise.resolve(response)
  }

  // repsonse 处理，只剩data返回给前段
  if (!response) {
    return Promise.reject('no response')
  }

  if (response.status !== 200) {
    console.error('------ server error -------')
    return Promise.reject(response)
  }

  const result = response.data

  if (!result.success) {
    console.error('------ operation error -------')
    result.message && Message.error(result.message)
    return Promise.reject(result)
  }

  if (result.data && result.data instanceof Object) {
    result.data['hasAxiosPassport'] = true
  }

  return Promise.resolve(result.data)
})

axios.interceptors.request.use(
  config => {
    removePending(config)
    config.cancelToken = new cancelToken(cancel =>
      requestQueue.push({ token: config.customCancelToken || generateCancelToken(config), cancel })
    )
    if (process.browser) {
      const jwt = localStorage.getItem('user-jwt')
      if (jwt) config.headers['Authorization'] = jwt
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios
