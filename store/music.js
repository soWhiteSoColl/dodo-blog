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
  getHostLists = (opt = {}) => {
    let offset = 0
    if (opt.more) {
      offset = this.hotMusicLists.length
    }

    const limit = offset ? 20 : 19 // 第一次获取19个，其中一个是热搜榜
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
    const timestamp = Date.now()
    return axios.get('/musics/songList', { params: { limit: 20, id, timestamp } })
      .then(list => {
        if (!list) return false
        this.currentList = list
        this.currentList.songs = this.currentList.songs.map(song => {
          song.url += '&br=999000'
          return song
        })
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
      .then(data => this.currentMusic.lyric = data)
  }

  @action
  getLeaderboard = () => {
    return axios.get('/musics/songList', { params: { limit: 200, id: 3778678 } })
      .then(list => {
        if (this.hotMusicLists[0] && this.hotMusicLists[0].songListId === list.songListId) {
          return false
        }
        list.id = list.songListId
        list.coverImgUrl = list.songListPic
        list.title = list.songListName
        this.hotMusicLists.unshift(list)
      })
  }
}