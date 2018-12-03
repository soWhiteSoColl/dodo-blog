import React from 'react'
import classnames from 'classnames'
import { secondToMunite, formatLyric } from '../../util/tool'
import Icon from './Icons'
import Link from 'next/link'
import Router from 'next/router'
import _ from 'lodash'

const MusicList = props => {
  const { musics, onToggle, current } = props
  return (
    <div className="main-music-player-list">
      <h3>播放列表 <span className="sub">共{musics.length}首</span></h3>
      <div className="main-music-player-list-wrapper">
        {
          musics.map((music, index) => (
            <div
              key={music.id}
              className={classnames("main-music-player-list-item", current === index && 'active')}
              onClick={() => onToggle(index)}
            >
              <span className="main-music-player-list-item-name">{music.name}</span>
              <span className="main-music-player-list-item-singer">{music.singer}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}


export default class MusicPlayer extends React.Component {
  $audio = React.createRef()
  currentIndex = 0
  lyricStr = ''
  randomList = _.shuffle(this.props.musics)
  state = {
    currentIndex: 0,
    paused: true,
    loop: false,
    currentTime: null,
    duration: null,
    random: false,

    open: false,
    showList: false,
    showLyric: false,
    loading: false,
  }

  componentDidMount() {
    const musics = this.props.musics
    const audio = this.$audio.current

    const currentIndex = musics.findIndex(item =>
      item.id === window.localStorage.getItem('current-music-id')
    )

    this.setState({
      open: window.localStorage.getItem('open-music-player') === '1',
      currentIndex: currentIndex !== -1 ? currentIndex : 0,
    })

    audio.addEventListener('ended', this.handleNext)
    audio.addEventListener('play', this.handlePlay)
    audio.addEventListener('pause', this.handlePause)

    this.props.getAudio && this.props.getAudio(audio)
    this.props.onChange && this.props.onChange(musics[currentIndex])
  }

  componentDidUpdate(nextProps) {
    // 切换歌单
    if (nextProps.musics !== this.props.musics && nextProps.songsKey !== this.props.songsKey) {
      this.setState({ currentIndex: 0 }, this.handlePlay)
    }

    if (nextProps.audioConfig.size !== this.props.audioConfig.size) {
      this.setState({ showList: false })
    }
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  handleLoadLrc = () => {
    const request = new XMLHttpRequest();
    const url = this.props.musics[this.state.currentIndex].lrc
    request.open('GET', url, true);
    request.onload = () => {
      this.lyricStr = request.response
    }
    request.send();
  }

  handlePlay = () => {
    const music = this.props.musics[this.state.currentIndex]
    const audio = this.$audio.current

    this.handleLoadLrc()
    this.props.onChange && this.props.onChange(music)
    this.setState({ paused: false })

    window.localStorage.setItem('current-music-id', music.id)
    if (this.palyPromise) {
      this.palyPromise
        .then(() => {
          this.palyPromise = audio.play(audio.currentTime)
        })
        .catch(() => {
          clearTimeout(this.palyTimer)
          this.palyTimer = setTimeout(() => {
            this.palyPromise = audio.play(audio.currentTime)
          }, 2000)
        })
    } else {
      this.palyPromise = audio.play(audio.currentTime)
      .catch(err => {
        console.log(err)
        setTimeout(() => {
          this.handlePlay()
        }, 300)
      })
    }

    clearInterval(this.timer)
    this.timer = setInterval(() => {
      const { currentTime, duration } = audio
      this.setState({ currentTime, duration })
    }, 100)
  }

  handlePause = () => {
    this.setState({ paused: true })
    this.$audio.current && this.$audio.current.pause()
    this.timer && clearInterval(this.timer)
  }

  handlePlayFrom = e => {
    const audio = this.$audio.current
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const clickPos = (e.clientX - left) / width
    const time = audio.duration * clickPos
    if (!time) return false
    audio.currentTime = time
  }

  handleNext = () => {
    const { random, currentIndex } = this.state
    const { musics } = this.props
    let nextIndex = ''
    if (random) {
      const currentId = musics[currentIndex].id
      const randomIndex = this.randomList.findIndex(item => item.id === currentId)
      const nextId = this.randomList[randomIndex + 1 > this.randomList.length ? 0 : randomIndex + 1].id
      nextIndex = this.props.musics.findIndex(item => item.id === nextId)
    } else {
      nextIndex = this.state.currentIndex + 1
      if (nextIndex >= this.props.musics.length) {
        nextIndex = 0
      }
    }

    this.setState({ currentIndex: nextIndex }, this.handlePlay)
  }

  handlePrev = () => {
    const { random, currentIndex } = this.state
    const { musics } = this.props
    let nextIndex = currentIndex
    if (random) {
      const currentId = musics[currentIndex].id
      const randomIndex = this.randomList.findIndex(item => item.id === currentId)
      const nextId = this.randomList[randomIndex - 1 < 0 ? this.randomList.length - 1 : randomIndex - 1].id
      nextIndex = this.props.musics.findIndex(item => item.id === nextId)
    } else {
      nextIndex = this.state.currentIndex - 1
      if (currentIndex < 0) {
        nextIndex = this.props.musics.length - 1
      }
    }

    this.setState({ currentIndex: nextIndex }, this.handlePlay)
  }

  handleToggle = currentIndex => {
    this.setState({ currentIndex }, this.handlePlay)
  }

  // ui 样式功能， 开关列表和播放器 open hiddenInBottom showList
  handleToggleOpen = () => {
    const open = !this.state.open
    this.setState({ open })
    localStorage.setItem('open-music-player', open ? '1' : '0')
  }

  handleToggleList = () => {
    const showList = !this.state.showList
    this.setState({ showList })
  }

  handleToggleLyric = () => {
    const showLyric = !this.state.showLyric
    this.setState({ showLyric })
  }

  handleToggleLoop = () => {
    const loop = !this.state.loop
    const audio = this.$audio.current
    if (loop) {
      audio.removeEventListener('ended', this.handleNext)
    } else {
      audio.addEventListener('ended', this.handleNext)
    }
    this.setState({ loop })
  }

  handleTogglePanel = () => {
    const hiddenInBottom = !this.state.hiddenInBottom
    this.setState({ hiddenInBottom })
  }

  handleRandom = () => {
    const random = !this.state.random
    this.setState({ random })
  }

  get lyric() {
    if (!this.lyricStr) return false

    const lyricsInfo = formatLyric(this.lyricStr)
    const audio = this.$audio.current || {}
    let currentLyric = ''

    lyricsInfo && lyricsInfo.forEach((item, index) => {
      const isLast = lyricsInfo.length === index + 1
      const musicTime = audio.currentTime

      if (isLast && musicTime > item.time - 0.02) {
        currentLyric = item.lyric
      } else {
        if (musicTime > item.time - 0.02 && musicTime < lyricsInfo[index + 1].time - 0.02) {
          currentLyric = item.lyric
        }
      }
    })

    return currentLyric
  }

  render() {
    const { open, duration, currentTime, loop, showList, paused, currentIndex, showLyric, random } = this.state
    const { audioConfig, musics } = this.props

    if (!musics || !musics.length) return false

    const { pic, name, singer, url } = musics[currentIndex] || {}
    const audio = this.$audio.current || {}

    return (
      <div className={classnames(
        "main-music-player",
        open ? 'open' : 'close',
        showList && 'main-music-player-show-list',
        audioConfig.position === 'bottom' && 'main-music-player-in-bottom',
        audioConfig.size === 'large' ? 'main-music-player-large' : 'main-music-player-small',
        paused ? 'pause' : 'play',
      )}>
        <audio src={url} ref={this.$audio} loop={loop} />
        <div className="main-music-player-wrapper">
          <div
            className="main-music-player-pic"
            onClick={paused ? this.handlePlay : this.handlePause}
          >
            <img src={pic} alt="" />
            <div className={classnames("music-player-play-btn")}>
              <Icon type={paused ? 'pause' : 'play'} />
            </div>
          </div>
          {showLyric && <div className="main-music-player-lyric">{this.lyric}</div>}

          <div className="main-music-player-info">
            {
              currentTime
                ? (
                  <div className="main-music-player-progress-bar" onClick={this.handlePlayFrom}>
                    <div
                      className="main-music-player-progress-bar-inner"
                      style={{ width: `${currentTime / duration * 100}%` }}
                    ></div>
                    <span className="main-music-player-progress-bar-timer">{secondToMunite(audio.currentTime)} / {secondToMunite(audio.duration)}</span>
                  </div>
                )
                : null
            }

            <div className="main-music-player-desc">
              <div className="main-music-player-name text-overflow-ellipsis">{name}</div>
              <div className="main-music-player-author">{singer}</div>
            </div>

            <div className="main-music-player-control">
              {/* <span className={classnames('main-music-player-control-lyric', showLyric && 'active')} onClick={this.handleToggleLyric}>词</span> */}
              <Link href={Router.route === '/music' ? '/musics' : '/music'}>
                <Icon type={'music'} antd={true} active={Router.route === '/music'} />
              </Link>
              <Icon type={'random'} antd={true} active={random} onClick={this.handleRandom} />
              <Icon type={'loop'} antd={true} active={loop} onClick={this.handleToggleLoop} />
              <Icon type={'menu'} active={showList} onClick={this.handleToggleList} />
              <Icon type={'left-arrow'} onClick={this.handlePrev} />
              <Icon type={'right-arrow'} onClick={this.handleNext} />
            </div>
          </div>

          <div className={classnames("main-music-player-toggle", open ? 'open' : 'close')} onClick={this.handleToggleOpen}>
            <Icon type={open ? 'left-arrow' : 'right-arrow'} />
          </div>
        </div>
        <MusicList onToggle={this.handleToggle} musics={musics} current={currentIndex} />
      </div >
    )
  }
}
