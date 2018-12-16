import { observable, action, toJS } from 'mobx'
import axios from '../config/axios'
import Base from './base'


export default class MusicStore extends Base {
  audio = null
  timestamp = 1

  @observable hotMusicLists = []
  @observable currentList = {}
  @observable currentMusic = {}
  @observable audioInfo = {}
  @observable bufferArray = null
  @observable currentMusicLyric = ''
  @observable audio = null
  @observable leaderboard = {}
  @observable paused = true
  @observable searchedList = []
  @observable searchValue = ''

  @action
  getHostLists = () => {
    const offset = this.hotMusicLists.length
    return axios.get('/musics/hotSongList', { params: { limit: 200, offset, timestamp: this.timestamp } })
      .then(res => this.hotMusicLists = res.playlists)
  }

  @action
  getListById = id => {
    return axios.get('/musics/songList', { params: { limit: 20, id } })
      .then(list => {
        if (!list || !list.songs) return false
        this.currentList = list
        this.currentList.songs = this.currentList.songs.map(song => {
          song.url += '&br=999000'
          return song
        })

        return this.currentList
      })
  }

  @action
  getLyric = id => {
    id = id || this.currentMusic.id
    return axios.get('/musics/lrc', { params: { id } })
      .then(data => this.currentMusic.lyric = data)
  }

  @action
  getLeaderboard = () => {
    return axios.get('/musics/songList', { params: { id: 3778678, offset: 0, timestamp: this.timestamp } })
      .then(list => this.leaderboard = list)
  }

  @action
  search = s => {
    if (!s) {
      this.searchValue = ''
      this.searchedList = []
    }

    if (s === this.searchValue) {
      return
    }

    this.searchValue = s
    return axios.get('/musics/search', { params: { s, limit: 100, offset: 0 } })
      .then(list => this.searchedList = list)
  }

  @action
  appendMusic = music => {
    if (this.currentList.songs) {
      if (!this.currentList.songs.find(item => item.id === music.id)) {
        this.currentList.songs.push(music)
      }
    } else {
      this.currentList.songs = [music]
    }
  }
}