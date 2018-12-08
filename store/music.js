import { observable, action, toJS } from 'mobx'
import axios from '../config/axios'
import Base from './base'


export default class MusicStore extends Base {
  audio = null

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
    const limit = 20
    // 第一次获取19个，其中一个是热搜榜
    return axios.get('/musics/hotSongList', { params: { limit, offset } })
      .then(musicLists => {
        if (musicLists.length < limit) {
          this.hotMusicLists.noMore = true
        }
        this.hotMusicLists = this.hotMusicLists.concat(musicLists)
        return this.hotMusicLists
      })
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
    return axios.get('/musics/songList', { params: { limit: 20, id: 3778678, offset: 0 } })
      .then(list => this.leaderboard = list)
  }

  @action
  search = s => {
    if(s === this.searchValue) {
      return
    }

    this.searchValue = s
    return axios.get('/musics/search', { params: { s, limit: 30, offset: 0 } })
      .then(list => this.searchedList = list)
  }

  @action
  appendMusic = music => {
    if (this.currentList.songs) {
      this.currentList.songs.push(music)
    } else {
      this.currentList.songs = [music]
    }
  }
}