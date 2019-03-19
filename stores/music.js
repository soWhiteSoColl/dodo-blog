import { observable, action } from 'mobx'
import axios from '../config/axios'
import Base from './base'

export default class MusicStore extends Base {
  audio = null
  timestamp = 1

  @observable hotMusicInfo = {
    limit: 200,
    offset: 0,
    cat: '',
    list: [],
    loading: true
  }

  @observable categoryInfo = {
    sub: [],
    categories: {}
  }

  @observable currentCategory = {
    main: 'all',
    sub: ''
  }

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

  hostMusicrRequestCancel = null

  @action
  getHotMusicInfo = () => {
    this.hotMusicInfo.cat = this.currentCategory.sub || '全部'
    this.hotMusicInfo.loading = true
    this.hotMusicInfo.list = []
    const { offset, limit, cat } = this.hotMusicInfo
    if (this.hostMusicrRequestCancel) {
      this.hostMusicrRequestCancel()
      this.hostMusicrRequestCancel = null
    }
    return (this.request = axios
      .get('/musics/hotSongList', {
        params: { limit, offset, cat },
        customCancelToken: 'get-hot-song-list'
      })
      .then(list => {
        this.hotMusicInfo.list = list
        this.hotMusicInfo.offset = list.length
        this.hotMusicInfo.loading = false
        return this.hotMusicInfo
      }))
  }

  @action
  getListById = id => {
    return axios.get('/musics/songList', { params: { limit: 20, id } }).then(list => {
      if (!list || !list.songs) return false
      list.songs.forEach(song => {
        song.url += '&br=999000'
      })

      return (this.currentList = list)
    })
  }

  @action
  getLyric = id => {
    id = id || this.currentMusic.id
    return axios.get('/musics/lrc', { params: { id } }).then(data => (this.currentMusic.lyric = data))
  }

  @action
  getLeaderboard = () => {
    return axios
      .get('/musics/songList', { params: { id: 3778678, offset: 0, timestamp: this.timestamp } })
      .then(list => (this.leaderboard = list))
  }

  @action
  getCategoryInfo = () => {
    return axios.get('/musics/songListCategory').then(categoryInfo => (this.categoryInfo = categoryInfo))
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
    return axios
      .get('/musics/search', { params: { s, limit: 100, offset: 0 } })
      .then(list => (this.searchedList = list))
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
