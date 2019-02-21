import { observable, action, toJS } from 'mobx'
import githubAxios from '../config/axios'
import axios from 'axios'
import Base from './base'

export default class Store extends Base {
  audio = null

  @observable isLogin = false
  @observable info = {}
  @observable token = null

  @action
  login = userInfo => {
    return axios.post('/users/login', userInfo)
  }

  @action
  sendCodeToEmail = email => {
    return axios.post('/mail/code', { to: email })
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

  @action
  getInfo = () => {
    return githubAxios.get('/users/tokentoinfo', { headers: { vf: this.toekn } }).then(data => {
      this.info = data
    })
  }
}
