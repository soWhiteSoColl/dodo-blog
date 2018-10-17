import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1'
axios.defaults.baseURL = 'https://zeus-ui.com/api/v1'
axios.defaults.withCredentials = true
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

        if (response.status !== 200) {
            return Promise.reject(response)
        }

        const result = response.data
        if (!result.success) {
            return Promise.reject(result)
        }

        return result.data
    },
    error => {
        if (!error) {
            return Promise.reject('unexpect error')
        }
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