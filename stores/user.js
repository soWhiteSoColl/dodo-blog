import { observable, action, toJS } from 'mobx'
import githubAxios from '../config/axios'
import axios from 'axios'
import Base from './base'

export default class Store extends Base {
  @observable isLogin = false
  @observable info = null
  @observable token = null
  @observable currentUserEmail = '1256790127@qq.com'

  get isLogin() {
    return !!this.info
  }

  @action
  signUp = user => {
    return axios.post('/users', user)
  }

  @action
  login = userInfo => {
    return axios.post('/users/login', userInfo).then(data => {
      this.info = data.user
      localStorage.setItem('user-jwt', data.token)
      return data
    })
  }

  @action
  logOut = () => {
    this.info = null
    localStorage.removeItem('user-jwt')
  }

  @action
  checkEmailAndSendCode = email => {
    return axios.post('/users/sign-up/check', { email })
  }

  @action
  getInfo = () => {
    return githubAxios.get('/users/info').then(data => {
      return (this.info = data)
    })
  }

  @action
  loginWithGithub = () => {
    return githubAxios.post('/users/login', {
      params: { origin: 'http://localhost:8082/login-result' }
    })
  }

  @action
  saveToken = token => {
    this.token = token
    return localStorage.setItem('github-oauth-token', token)
  }
}
