import { observable, action } from 'mobx'
import axios from '../config/axios'
import Base from './base'

export default class MusicStore extends Base {
  audio = null
  timestamp = 1
  leaderboardId = 3778678

  @observable hotMusicInfo = {
    page: 1,
    pageSize: 200,
    categoryType: '',
    list: [],
    loading: true
  }

  @observable categoryInfo = {
    sub: [],
    categories: {}
  }

  @observable currentCategory = {
    main: 'all',
    sub: '全部'
  }

  @observable currentList = {}
  @observable currentMusic = {}
  @observable audioInfo = {}
  @observable bufferArray = null
  @observable audio = null
  @observable leaderboard = {}
  @observable paused = true
  @observable searchedList = []
  @observable searchValue = ''

  hostMusicrRequestCancel = null

  @action
  getHotMusicInfo = () => {
    if (this.hotMusicInfo.categoryType === this.currentCategory.sub) {
      return Promise.resolve(this.hotMusicInfo)
    }
    this.hotMusicInfo.categoryType = this.currentCategory.sub || '全部'
    this.hotMusicInfo.loading = true
    this.hotMusicInfo.list = []
    const { categoryType, page, pageSize } = this.hotMusicInfo
    if (this.hostMusicrRequestCancel) {
      this.hostMusicrRequestCancel()
      this.hostMusicrRequestCancel = null
    }
    return (this.request = axios
      .get('/musics/songList/hot', {
        params: { page, pageSize, categoryType },
        customCancelToken: 'get-hot-song-list'
      })
      .then(list => {
        this.hotMusicInfo.list = list
        this.hotMusicInfo.loading = false
        return this.hotMusicInfo
      }))
  }

  @action
  getListById = id => {
    return axios.get('/musics/songList', { params: { pageSize: 20, id } }).then(list => {
      if (!list || !list.tracks) return false
      list.songs = list.tracks.map(item => {
        const song = {}
        song.id = item.id
        song.name = item.name
        song.pic = item.album.picUrl
        song.singer = item.artists[0].name
        song.url = `http://23333333.itooi.cn/netease/url?id=${item.id}&quality=flac`
        return song
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
    if (this.leaderboard.songs) return Promise.resolve(this.leaderboard)

    return axios
      .get('/musics/songList', { params: { id: this.leaderboardId, offset: 0, timestamp: this.timestamp } })
      .then(list => {
        list.songs = list.tracks.map(item => {
          const song = {}
          song.id = item.id
          song.name = item.name
          song.pic = item.album.picUrl
          song.singer = item.artists[0].name
          song.url = `http://23333333.itooi.cn/netease/url?id=${item.id}&quality=flac`
          return song
        })
        this.leaderboard = list
      })
  }

  @action
  getCategoryInfo = () => {
    if (this.categoryInfo.sub.length) return Promise.resolve(this.categoryInfo)
    return axios.get('/musics/songList/category').then(categoryInfo => (this.categoryInfo = categoryInfo))
  }

  @action
  search = keyword => {
    if (!keyword) {
      this.searchValue = ''
      this.searchedList = []
    }

    if (keyword === this.searchValue) {
      return
    }

    this.searchValue = keyword
    return axios.get('/musics/search', { params: { keyword, type: 'song', pageSize: 100, page: 0 } }).then(data => {
      this.searchedList = data.songs.map(item => {
        const song = {}
        song.name = item.name
        song.singer = item.ar[0].name
        song.time = item.dt / 1000
        song.url = `http://23333333.itooi.cn/netease/url?id=${item.id}&quality=flac`
        song.pic = item.al.picUrl
        song.id = item.id
        return song
      })
    })
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
