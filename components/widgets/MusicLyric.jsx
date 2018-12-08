import React from 'react'
import { formatLyric } from 'tools'
import classnames from 'classnames'


export default class Lyric extends React.Component {
  activeIndex = 6
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
    
    if(!this.lyricsInfo) return null

    return (
      <div className="music-lyric">
        <div
          className="music-lyric-wrapper"
          style={{ top: -1 * (lyricIndex - this.activeIndex) * 35 }}>
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
