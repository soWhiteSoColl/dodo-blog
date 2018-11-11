import { observable, action, toJS } from 'mobx'
import axios from '../config/axios'
import Base from './base'


export default class Store extends Base {
  audio = null

  @observable hotMusicLists = []
  @observable currentList = []
  @observable currentMusic = null
  @observable audioInfo = {}
  @observable bufferArray = null
  @observable currentMusicLyric = ''

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
        this.currentList = list
        list.songs.forEach(item => {
          item.lrc = `/musics/lrc?id=${item.id}`
        })
        this.currentMusic = list && list.songs && list.songs[0]
        return this.currentList
      })
  }

  @action
  play = currentMusic => {
    currentMusic = currentMusic || this.currentMusic
    if (currentMusic.id === this.currentMusic.id && this.audioInfo.currentTime) {
      this.audioInfo.play = 1
      return this.audio.play(this.audioInfo.currentTime)
    }

    this.currentMusic = currentMusic
    this.audio.src = currentMusic.url
    this.audioInfo.play = 1
    this.audio.play()

    this.timer = setInterval(() => {
      this.audioInfo.currentTime = this.audio.currentTime
      this.audioInfo.duration = this.audio.duration
    }, 100)
  }

  @action
  pause = () => {
    this.audioInfo.play = 0
    this.audio.pause()
  }

  @action
  getLyric = id => {
    id = id || this.currentMusic.id
    axios.get(`/musics/lrc`, { params: { id } })
      .then(data => {
        this.currentMusicLyric = data
      })
  }
}