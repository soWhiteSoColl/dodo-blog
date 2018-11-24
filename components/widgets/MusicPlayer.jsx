import React from 'react'
import classnames from 'classnames'
import { secondToMunite, formatLyric } from '../../util/tool'
import Icon from './Icons'
import Link from 'next/link'
import Router from 'next/router'


const MusicList = props => {
  const { musics, onToggle } = props
  return (
    <div className="main-music-player-list">
      <h3>播放列表 <span className="sub">共{musics.length}首</span></h3>
      <div className="main-music-player-list-wrapper">
        {
          musics.map((music, index) => (
            <div key={music.id} className="main-music-player-list-item" onClick={() => onToggle(index)}>
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

  state = {
    currentIndex: 0,
    paused: true,
    loop: false,
    currentTime: null,
    duration: null,

    open: false,
    showList: false,
    showLyric: false
  }

  componentDidMount() {
    const musics = this.props.musics
    const audio = this.$audio.current

    const currentIndex = musics.findIndex(item => item.id === window.localStorage.getItem('current-music-id'))
    this.setState({
      open: window.localStorage.getItem('open-music-player') === '1',
      currentIndex: currentIndex !== -1 ? currentIndex : 0,
    })

    audio.addEventListener('ended', this.handleNext)
    audio.addEventListener('play', this.handlePlay)
    audio.addEventListener('pause', this.handlePause)
    this.props.getAudio && this.props.getAudio(audio)
  }

  componentDidUpdate(nextProps) {
    // 切换歌单
    if (nextProps.musics !== this.props.musics) {
      this.setState({ currentIndex: 0 }, this.handlePlay)
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
    this.props.onPlay && this.props.onPlay(music)
    this.setState({ paused: false })

    window.localStorage.setItem('current-music-id', music.id)
    if (this.palyPromise) {
      this.palyPromise
        .then(() => this.palyPromise = audio.play(audio.currentTime))
        .catch(() => {
          clearTimeout(this.palyTimer)
          this.palyTimer = setTimeout(() => {
            this.palyPromise = audio.play(audio.currentTime)
          }, 2000)
        })
    } else {
      this.palyPromise = audio.play(audio.currentTime)
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
    let currentIndex = this.state.currentIndex + 1
    if (currentIndex >= this.props.musics.length) {
      currentIndex = 0
    }

    this.setState({ currentIndex }, this.handlePlay)
  }

  handlePrev = () => {
    let currentIndex = this.state.currentIndex - 1
    if (currentIndex < 0) {
      currentIndex = this.props.musics.length - 1
    }

    this.setState({ currentIndex }, this.handlePlay)
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
    const { open, duration, currentTime, loop, showList, paused, currentIndex, showLyric } = this.state
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
            <img src={pic} alt=""/>
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
              <Icon type={'loop'} antd={true} active={loop} onClick={this.handleToggleLoop} />
              <Icon type={'menu'} active={showList} onClick={this.handleToggleList} />
              <Icon type={'left-arrow'} onClick={this.handlePrev} />
              <Icon type={'right-arrow'} onClick={this.handleNext} />
            </div>
          </div>

          <div className={classnames("main-music-player-toggle", open ? 'open' : 'close')} onClick={this.handleToggleOpen}>
            <svg width={10} height={30}>
              <path className="svg-btn" stroke="#fff" strokeWidth={2} strokeLinecap="butt" fill="none"></path>
            </svg>
          </div>
        </div>
        <MusicList onToggle={this.handleToggle} musics={musics} />
      </div >
    )
  }
}
