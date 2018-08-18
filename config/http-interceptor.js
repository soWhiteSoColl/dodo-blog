import axios from 'axios'

axios.defaults.baseURL = 'https://api.justdodo.cn'
axios.interceptors.request.use(
    request => {
        return request
    }
)
axios.interceptors.response.use(
    response => {
        if (!response) {
            return Promise.reject('Uncatch error')
        }
        if (!response.status) {
            return response
        }

        if (!response.data) {
            return Promise.reject(response)
        }

        const result = response.data
        if (!result.data || !result.code) {
            return Promise.reject(result)
        }

        if (result.code !== 1) {
            return Promise.reject(result.msg)
        }

        return result.data
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log('没权限')
                default:
                    console.log('出错了')
            }
        }
        return Promise.reject(error.response)
    }
);

export default axios