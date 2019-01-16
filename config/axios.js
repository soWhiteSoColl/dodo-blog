import axios from 'axios'
import qs from 'qs'

const requestQueue = []
const cancelToken = axios.CancelToken

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

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.baseURL = 'https://zeus-ui.com/api'
axios.defaults.withCredentials = true
axios.interceptors.response.use(
  response => {
    removePending(response.config)
    
    if (response.hasAxiosPassport
      || typeof response === 'string'
      || typeof response === 'number'
      || typeof response === 'boolean'
      || !response
    ) {
      return Promise.resolve(response)
    }
    if (!response) {
      return Promise.reject('Uncatch error')
    }

    if (response.status !== 200) {
      return Promise.reject(response)
    }

    const result = response.data
    if (!result.success) {
      return Promise.reject(result)
    }

    if (result.data && result.data instanceof Object) {
      result.data.hasAxiosPassport = true
    }

    return Promise.resolve(result.data)
  }
)

axios.interceptors.request.use(config => {
  removePending(config)
  config.cancelToken = new cancelToken(
    (cancel) => requestQueue.push({ token: config.customCancelToken || generateCancelToken(config), cancel })
  )

  return config;
}, error => {
  return Promise.reject(error);
});


export default axios

export const staticAxios = axios.create({
  baseURL: '/static',
})