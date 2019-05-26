import React from 'react'
import Head from 'next/head'
import Icon from 'ui/Icons'
import AnimateQueue from 'ui/AnimateQueue'
import ScrollDetect from 'ui/ScrollDetect'
import { inject, observer } from 'mobx-react'
import classnames from 'classnames'
import { downloadFile, secondToMunite } from 'tools/main'

@inject('musicStore')
@observer
class MusicItem extends React.Component {
  handlePlay = () => {
    const music = this.props
    const { currentMusic, leaderboard: musics, paused } = this.props.musicStore
    localStorage.setItem('current-list-id', this.props.musicStore.leaderboardId)

    if (music.id === currentMusic.id && !paused) {
      return this.props.musicStore.setValues({ paused: true })
    }

    this.props.musicStore.setValues({
      paused: false,
      currentList: musics,
      currentMusic: music
    })

    localStorage.setItem('current-music-id', music.id)
  }

  handleDownLoad = () => {
    downloadFile(this.props.url)
  }

  render() {
    const { id, name, singer, pic, style, NO, time } = this.props
    const { currentMusic, paused } = this.props.musicStore
    const active = id === currentMusic.id

    return (
      <li className="music-info-item" style={style}>
        <span className="music-info-no">{NO}</span>
        <div className="music-info-pic hidden-xs">
          <img className="music-info-cover" src={pic} alt={name} />
        </div>
        <span className="music-info-name">{name}</span>
        <span className="music-info-toggle">
          <div className={classnames('music-info-btn', active && 'active')} onClick={() => this.handlePlay()}>
            <Icon type={active && !paused ? 'play' : 'pause'} />
          </div>
          <div className={classnames('music-info-btn')} onClick={() => this.handleDownLoad()}>
            <Icon antd={true} type={'download'} />
          </div>
        </span>

        <span className="music-info-singer">{singer}</span>
        <span className="music-info-time">{secondToMunite(time)}</span>
      </li>
    )
  }
}

export default class Search extends React.Component {
  static async getInitialProps() {
    return { audioConfig: { size: 'large', position: 'bottom' }, footer: false }
  }

  state = { showNum: 12 }

  componentDidMount() {
    this.props.musicStore.getLeaderboard()
  }

  handleShowMore = () => {
    this.setState({ showNum: this.state.showNum + 12 })
  }

  render() {
    const { songs = [] } = this.props.musicStore.leaderboard
    const { showNum } = this.state
    const noMore = showNum >= songs.length

    return (
      <>
        <Head>
          <title>小寒的音乐-排行榜</title>
        </Head>
        <div className="music-leader-page">
          <div className="do-content-container">
            {!!songs.length && (
              <ScrollDetect onScrollOut={this.handleShowMore} detect={!noMore} protectTime={300}>
                <div className="music-info-list-wrapper">
                  <ul className="music-info-list">
                    <AnimateQueue
                      animate={true}
                      interval={50}
                      speed={600}
                      from={{ transform: 'translateY(80px)', opacity: 0 }}
                      to={{ transform: 'translateX(0px)', opacity: 1 }}
                    >
                      {songs.slice(0, showNum).map((music, index) => (
                        <MusicItem key={music.url} NO={index + 1} {...music} />
                      ))}
                    </AnimateQueue>
                  </ul>
                </div>
              </ScrollDetect>
            )}
            {(!songs.length || !noMore) && <div className="do-fetching-loading">加载中...</div>}
          </div>
        </div>
      </>
    )
  }
}
