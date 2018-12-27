import { observable, action } from 'mobx'
import Base from './base'
import axios from '../config/axios'

export default class Store extends Base {
  @observable nickname = ''
  @observable leavedMessages = { list: [], page: 1, perPage: 20, total: 0 }

  @action
  saveView = () => {
    const nickname = this.nickname
    if (nickname === '小明' || nickname === '小寒' || 'nickname' === '小白') return false
    axios.post('/view-records', { siteName: 'blog', info: { nickname } })
  }

  @action
  saveNickname = nickname => {
    this.nickname = nickname
    this.saveView()
    localStorage.setItem('dodo_name', nickname)
  }

  @action
  getLeavedMessages = () => {
    return axios.get('/leaved-messages', { params: { type: 0 } })
      .then(messages => {
        this.leavedMessages = messages
        return Promise.resolve(messages)
      })
  }

  @action
  leaveMessage = message => {
    const nickname = this.nickname
    return axios.post('/leaved-messages', { nickname, message, type: 0 })
  }

  @action
  getNickName = () => {
    this.nickname = localStorage.getItem('dodo_name') || ''
  }
}