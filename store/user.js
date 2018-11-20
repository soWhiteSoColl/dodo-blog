import { observable, action, toJS } from 'mobx'
import axios from '../config/axios'
import Base from './base'


export default class Store extends Base {
  audio = null

  @observable isLogin = false
  @observable info = {}
  @observable token = null

  @action
  login = () => {
    return axios.get('/users/login-github', { params: { origin: 'http://localhost:8082/login-result' } })
  }

  @action
  saveToken = token => {
    this.token = token
    return localStorage.setItem('github-oauth-token', token)
  }

  @action
  getInfo = () => {
    return axios.get('/users/tokentoinfo', { headers: { vf: this.toekn } })
      .then(data => { this.info = data })
  }
}