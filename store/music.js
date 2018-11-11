import { observable, action, toJS } from 'mobx'
import axios from '../config/axios'
import Base from './base'


export default class Store extends Base {
  audio = null

  @observable hotMusicLists = []
  @observable currentList = []
  @observable currentMusic = {}
  @observable audioInfo = {}
  @observable bufferArray = null
  @observable currentMusicLyric = ''
  @observable audio = null

  @action
  getHostLists = () => {
    return axios.get('/musics/hotSongList', { params: { limit: 20 } })
      .then(musicLists => {
        this.hotMusicLists = musicLists
        return this.hotMusicLists
      })
  }

  @action
  getListById = id => {
    return axios.get('/musics/songList', { params: { limit: 20, id } })
      .then(list => {
        if(!list) return false
        this.currentList = list
        return this.currentList
      })
  }

  @action
  toggle = current => {
    this.currentMusic = current
  }

  @action
  getLyric = id => {
    id = id || this.currentMusic.id
    return axios.get('/musics/lrc', { params: { id } })
    .then(data => {
      this.currentMusicLyric = data
      return this.currentList
    })
  }
}