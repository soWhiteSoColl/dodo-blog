import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.baseURL = 'https://zeus-ui.com/api'
axios.defaults.withCredentials = true
axios.interceptors.response.use(
    response => {
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
);

export default axios

export const staticAxios = axios.create({
    baseURL: '/static',
})