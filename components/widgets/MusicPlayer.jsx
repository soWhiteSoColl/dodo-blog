import React from 'react'
import classnames from 'classnames'
import { secondToMunite } from '../../util/tool'
import { formatLyric } from '../../util/tool'


export default class MusicPlayer extends React.Component {
  $audio = React.createRef()
  currentIndex = 0
  lyricStr = ''

  state = {
    open: false,
    isPlay: false,
    currentTime: null,
    duration: null,
    hiddenInBottom: false,
    showList: false,
  }

  componentDidMount() {
    this.setState({ open: window.localStorage.getItem('open-music-player') !== '0' })
  }

  componentDidUpdate(nextProps) {
    if (nextProps.musics !== this.props.musics) {
      this.currentIndex = 0
      this.handlePlay()
    }
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  handleLoadLrc = () => {
    const request = new XMLHttpRequest();
    const url = this.props.musics[this.currentIndex].lrc
    request.open('GET', url, true);
    request.onload = () => {
      this.lyricStr = request.response
    }
    request.send();
  }

  handlePlay = (index) => {
    if (typeof index === 'number') this.currentIndex = index
    const music = this.props.musics[this.currentIndex]
    const audio = this.$audio.current

    this.setState({ isPlay: true })
    this.handleLoadLrc()

    if (audio.src === music.url) {
      audio.play(audio.currentTime)
    } else {
      this.props.beforePlay && this.props.beforePlay()
      audio.src = music.url
      audio.play()
    }

    this.timer = setInterval(() => {
      const { currentTime, duration } = audio
      this.setState({ currentTime, duration })
    }, 100)
  }

  handlePuase = () => {
    this.setState({ isPlay: false })
    this.$audio.current.pause()
  }

  handlePlayFrom = e => {
    const audio = this.$audio.current
    const { left, width } = e.target.getBoundingClientRect()
    const clickPos = (e.clientX - left) / width
    const time = audio.duration * clickPos
    if (!time) return false
    audio.currentTime = time
  }

  handleToggle = () => {
    const open = !this.state.open
    this.setState({ open })
    localStorage.setItem('open-music-player', open ? '1' : '0')
  }

  handleNext = () => {
    this.currentIndex = this.currentIndex + 1
    if (this.currentIndex >= this.props.musics.length) {
      this.currentIndex = 0
    }
    this.handlePlay()
  }

  handlePrev = () => {
    this.currentIndex = this.currentIndex - 1
    if (this.currentIndex < 0) {
      this.currentIndex = this.props.musics.length - 1
    }
    this.handlePlay()
  }

  handleToggleList = () => {
    const showList = !this.state.showList
    this.setState({ showList })
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
    const { open, isPlay, duration, currentTime, hiddenInBottom, showList } = this.state
    const { audioConfig, musics } = this.props
    const { pic, name, singer } = musics[this.currentIndex]
    const audio = this.$audio.current || {}

    return (
      <div className={classnames(
        "main-music-player",
        open ? 'open' : 'close',
        audioConfig.position === 'bottom' && 'main-music-player-in-bottom',
        audioConfig.size === 'large' && 'main-music-player-large',
        hiddenInBottom ? 'hidden' : 'show',
        showList && 'main-music-player-show-list',
      )}>
        <audio ref={this.$audio} />
        <div className="main-music-player-wrapper">
          <div className="main-music-player-pic">
            <img src={pic} />
            <div
              className={classnames("music-player-play-btn", isPlay ? 'play' : 'pause')}
              onClick={isPlay ? this.handlePuase : this.handlePlay}
            >
              <svg width={30} height={30}>
                <path className="svg-play-btn" stroke="#fff" strokeWidth={3} strokeLinecap="butt" fill="none"></path>
              </svg>
            </div>
          </div>

          <div className="main-music-player-info">
            <div style={{ width: '100%' }}>
              <div className="main-music-player-name text-overflow-ellipsis" style={{ width: 'calc(100% - 200px)' }}>{name}</div>
              <div className="main-music-player-author">{singer}</div>
            </div>
            <div className="main-music-player-control">
              <svg width={25} height={30} onClick={this.handlePrev}>
                <path className="svg-play-btn"
                  stroke="#999"
                  strokeWidth={3}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 3 5 15 18 27"
                ></path>
              </svg>

              <svg width={25} height={30} onClick={this.handleNext}>
                <path className="svg-paly-btn"
                  stroke="#999"
                  strokeWidth={3}
                  strokeLinecap="round"
                  fill="none"
                  d="M3 3 18 15 3 27"
                ></path>
              </svg>
            </div>
            {
              currentTime
                ? <div className="main-music-player-progress-bar" onClick={this.handlePlayFrom}>
                  <div
                    className="main-music-player-progress-bar-inner"
                    style={{ width: `${currentTime / duration * 100}%` }}
                  ></div>
                  <span className="main-music-player-progress-bar-timer">{secondToMunite(audio.currentTime)} / {secondToMunite(audio.duration)}</span>

                  {
                    this.lyric
                      ? <span className="main-music-player-progress-bar-lyric">{this.lyric}</span>
                      : null
                  }
                </div>
                : null
            }
          </div>

          <div className={classnames("main-music-player-toggle", open ? 'open' : 'close')} onClick={this.handleToggle}>
            <svg width={10} height={30}>
              <path className="svg-btn" stroke="#fff" strokeWidth={2} strokeLinecap="butt" fill="none"></path>
            </svg>
          </div>

        </div>
        <div className="main-music-player-sider">
          <div className="main-music-player-sider-ball" onClick={this.handleToggleList}>列表</div>
          <div className="main-music-player-sider-ball" onClick={this.handleTogglePanel}>收起</div>
        </div>
        <div className="main-music-player-list">
          <h3>播放列表 <span className="sub">共{musics.length}首</span></h3>
          <div className="main-music-player-list-wrapper">
            {
              musics.map((music, index) => (
                <div key={music.id} className="main-music-player-list-item" onClick={() => this.handlePlay(index)}>
                  <span className="main-music-player-list-item-name">{music.name}</span>
                  <span className="main-music-player-list-item-singer">{music.singer}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div >
    )
  }
}
