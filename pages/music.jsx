import React from 'react';
import withLayout from '../components/Layout'
import Head from 'next/head'
import MusicCanvas from '../components/MusicCavas'
import { loadSound, formatTimeNumber } from '../util/tool';
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'


function toTime(time) {
  if (!time) return '--:--'
  const seconds = parseInt(time)
  return formatTimeNumber(parseInt(seconds / 60)) + ':' + formatTimeNumber(seconds % 60)
}

@inject('musicStore')
@observer
class MusicItem extends React.Component {
  handlePaly = () => {
    this.props.musicStore.play(this.props)
    this.props.musicStore.getLyrics(this.props.id)
  }

  handlePlayFrom = e => {
    const { audioInfo } = this.props.musicStore
    const { left, width } = e.target.getBoundingClientRect()
    const clickPos = (e.clientX - left)/width
    const time = audioInfo.duration * clickPos
    if(!time) return false
    this.props.musicStore.audio.currentTime = time
  }

  render() {
    const { pic, name, singer, id } = this.props
    const { current, audioInfo } = this.props.musicStore
    const isCurrent = current && current.id === id
    let currentLyric = ''
    if (isCurrent) {
      current && current.lyric && current.lyric.forEach((item, index) => {
        const isLast = current.lyric.length === index + 1
        const musicTime = audioInfo.currentTime

        if (isLast && musicTime > item.time - 0.05) {
          currentLyric = item.lyric
        } else {
          if (musicTime > item.time - 0.05 && musicTime < current.lyric[index + 1].time - 0.05) {
            currentLyric = item.lyric
          }
        }
      })
    }

    return (
      <div className={classnames("music-item", isCurrent && 'active')}>
        <div className="music-item-pic">
          <img src={pic} />
          <div
            className={classnames("music-item-play-btn", audioInfo.play ? 'play' : 'pause')}
            onClick={this.handlePaly}
          >
            <svg width={30} height={30}>
              <path className="svg-paly-btn" stroke="#fff" strokeWidth={3} strokeLinecap="butt" fill="none"></path>
            </svg>
          </div>
        </div>

        <div className="music-item-info">
          <div className="music-item-name">{name}</div>
          <div className="music-item-author">{singer}</div>
          {
            isCurrent
              ? (
                <div className="music-item-progress-bar" onClick={this.handlePlayFrom}>
                  <div
                    className="music-item-progress-bar-inner"
                    style={{ width: `${audioInfo.currentTime / audioInfo.duration * 100}%` }}
                  ></div>
                  {
                    audioInfo.currentTime && audioInfo.duration
                      ? <span className="music-item-progress-bar-timer">{toTime(audioInfo.currentTime)} / {toTime(audioInfo.duration)}</span>
                      : null
                  }
                  {
                    currentLyric ? <span className="music-item-progress-bar-lyric">{currentLyric}</span> : null
                  }
                </div>
              )
              : null
          }
        </div>
      </div >
    )
  }
}
@withLayout
export default class Contact extends React.Component {
  $audio = React.createRef()

  componentDidMount() {
    this.props.musicStore.list()
    this.props.musicStore.setValue('audio', this.$audio.current)

  }

  render() {
    const { musics } = this.props.musicStore

    return (
      <React.Fragment>
        <Head>
          <title>dodo 音乐播放器</title>
        </Head>
        <div className="do-common-container">
          <audio ref={this.$audio}></audio>
          <div className="music-list">
            {musics && musics.songs &&
              musics.songs.map(item => <MusicItem key={item.id} {...item} />)
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}
