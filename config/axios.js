import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1'
axios.defaults.baseURL = 'https://zeus-ui.com/api/v1'
axios.defaults.withCredentials = true
axios.interceptors.response.use(
    response => {
        if(response.hasAxiosPassport){
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

        result.data.hasAxiosPassport = true

        return Promise.resolve(result.data)
    }
);

export default axios