import { observable, action } from 'mobx'
import Base from './base'
import axios from '../config/axios'

export default class Store extends Base {
  @observable nickname = ''
  @observable leavedMessages = { list: [], page: 1, perPage: 20, total: 0 }

  @action
  saveView = () => {
    const nickname = this.nickname
    axios.post('/view-records', { siteName: 'blog', info: { nickname } })
  }

  @action
  saveNickname = nickname => {
    this.nickname = nickname
    localStorage.setItem('dodo_name', nickname)
  }

  @action
  getLeavedMessages = () => {
    axios.get('/leaved-messages')
      .then(messages => {
        this.leavedMessages = messages
        return Promise.resolve(messages)
      })
  }

  @action
  leaveMessage = message => {
    const nickname = this.nickname
    axios.post('/leaved-messages', { nickname, message })
      .then(this.getLeavedMessages)
  }

  @action
  getNickName = () => {
    this.nickname = localStorage.getItem('dodo_name') || ''
  }
}