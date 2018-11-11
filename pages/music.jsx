import React from 'react'
import Head from 'next/head'
import MusicCanvas from '../components/widgets/MusicCavas'
import { formatLyric } from '../util/tool'
import classnames from 'classnames'
import Link from 'next/link'


class Lyric extends React.Component {
  state = {
    lyricIndex: 0
  }

  get lyricsInfo() {
    return formatLyric(this.props.lyricStr)
  }

  get lyricIndex() {
    const audio = this.props.audio
    if (!audio || !this.lyricsInfo) return false

    let currentLyricIndex = 0

    const lyricsInfo = this.lyricsInfo
    lyricsInfo && lyricsInfo.forEach((item, index) => {
      const isLast = lyricsInfo.length === index + 1
      const musicTime = audio.currentTime

      if (isLast && musicTime > item.time - 0.02) {
        currentLyricIndex = index
      } else {
        if (musicTime > item.time - 0.02 && musicTime < lyricsInfo[index + 1].time - 0.02) {
          currentLyricIndex = index
        }
      }
    })

    return currentLyricIndex
  }

  componentDidMount() {
    this.handleInit()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handleInit = () => {
    this.timer = setInterval(() => {
      const audio = this.props.audio
      if (audio && audio.currentTime) {
        this.setState({ lyricIndex: this.lyricIndex })
      }
    }, 200)
  }

  render() {
    const { lyricIndex } = this.state

    return (
      <div className="music-lyric">
        <div
          className="music-lyric-wrapper"
          style={{ top: lyricIndex < 1 ? 0 : (-1 * (lyricIndex - 1) * 35) }}>
          {this.lyricsInfo.map((item, index) => {
            return (
              <div key={index} className={classnames("music-lyric-item", index === lyricIndex && 'active')}>
                {item.lyric}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
export default class Music extends React.Component {
  static getInitialProps() {
    return { audioConfig: { size: 'large', position: 'bottom' } }
  }

  state = {
    bufferArray: null,
  }

  componentDidUpdate(prevProps) {
    const currentMusic = this.props.musicStore.currentMusic
    if (prevProps.currentMusic != currentMusic) {
      this.props.musicStore.getLyric()
    }
  }

  componentDidMount(){
    this.props.musicStore.getLyric()
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>dodo 音乐播放器</title>
        </Head>
        <div className="do-content-container">
          <MusicCanvas
            url={this.props.musicStore.currentMusic.url}
            audio={this.props.musicStore.audio}
          />
          <Lyric
            lyricStr={this.props.musicStore.currentMusicLyric}
            audio={this.props.musicStore.audio}
          />
          <Link href="/musics">
            <a><div className="music-detail-ball active">🎵</div></a>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
