import axios from 'axios'

axios.interceptors.response.use(
    response => {
        return response.data;
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
        return Promise.reject(error.response.data)
    }
);