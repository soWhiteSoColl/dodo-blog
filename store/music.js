import { observable, action, toJS } from 'mobx'
import axios from '../config/axios'
import Base from './base'
import { formatLyric } from '../util/tool'

export default class Store extends Base {
    audio = null

    @observable musics = {}
    @observable current = null
    @observable audioInfo = {}
    @observable bufferArray = null

    @action
    list = () => {
        return axios.get('/musics')
            .then(musics => {
                this.musics = musics
                return this.musics
            })
    }

    @action
    play = current => {
        const isCurrent = this.current && current.id === this.current.id

        if (isCurrent) {
            if (this.audioInfo.play) {
                return this.pause()
            } else {
                this.audioInfo = { play: 1 }
                return this.audio.play(this.audioInfo.currentTime)
            }
        }

        this.current = current
        this.audio.src = current.url
        this.audioInfo = { play: 1 }
        this.audio.play()

        this.timer = setInterval(() => {
            this.audioInfo.currentTime = this.audio.currentTime
            this.audioInfo.duration = this.audio.duration
        }, 100)
    }

    @action
    pause = () => {
        this.audioInfo = { play: 0 }
        this.audio.pause()
    }

    @action
    getLyrics = id => {
        id = id || this.current.id
        axios.get(`/musics/${id}/lyric`)
            .then(data => {
                this.current.lyric = formatLyric(data.lyric)
            })
    }
}