import React from 'react';
import Head from 'next/head'
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'

import AnimateQueue from 'widgets/AnimateQueue'
import Icon from 'widgets/Icons'
import ScrollDetect from 'widgets/ScrollDetect'

@inject('musicStore')
@observer
class MusicList extends React.Component {
  handlePlay = () => {
    const { id } = this.props
    const { getListById, currentList, paused } = this.props.musicStore

    if (id === currentList.songListId) {
      this.props.musicStore.setValues({ paused: !paused })
    } else {
      localStorage.setItem('current-list-id', id)
      getListById(id)
        .then(() => this.props.musicStore.setValues({ paused: false }))
    }
  }

  render() {
    const { coverImgUrl: pic, title: name, style } = this.props
    const { id } = this.props
    const { currentList, paused } = this.props.musicStore
    const active = !paused && id === currentList.songListId

    return (
      <div className={classnames("music-album", active && 'active', 'play')} style={style}>
        <div className="music-album-cover">
          <img src={pic} alt="" />
          <div
            className={classnames("music-player-play-btn")}
            onClick={this.handlePlay}
          >
            <Icon type={active ? 'play' : 'pause'} />
          </div>
        </div>
        <div className="music-album-info">
          <span className="music-album-title">{name}</span>
        </div>
      </div>
    )
  }
}

export default class Musics extends React.Component {
  static getInitialProps() {
    return { audioConfig: { position: 'bottom' }, footer: false }
  }

  state = {
    showNum: 20
  }

  componentDidMount() {
    this.props.musicStore.getHostLists()
  }

  handleShowMore = () => {
    this.setState({ showNum: this.state.showNum + 20 })
  }

  render() {
    const { hotMusicLists } = this.props.musicStore
    const { showNum } = this.state
    const noMore = showNum >= hotMusicLists.length
    
    return (
      <React.Fragment>
        <Head>
          <title>小寒的博客 - 听歌, 音乐, 学习</title>
          <meta name="keywords" content={'听歌，学习，音乐'} />
          <meta name="description" content={'听听歌，这里有各种各样的好听的音乐，小寒的博客 - 听歌, 音乐, 学习'} />
        </Head>
        <div className="music-list-page">
          {hotMusicLists.length
            ? (
              <ScrollDetect
                onScrollOut={this.handleShowMore}
                detect={!noMore}
              >
                <div className="music-album-list">
                  <AnimateQueue
                    animate={true}
                    interval={50}
                    speed={600}
                    from={{ transform: 'translateY(80px)' }}
                    to={{ transform: 'translateX(0px)' }}
                  >
                    {hotMusicLists.slice(0, showNum).map((item, index) =>
                      <MusicList key={item.id + index} {...item} />
                    )}
                  </AnimateQueue>
                </div>
              </ScrollDetect>
            )
            : null
          }
          {(!hotMusicLists.length || !noMore)
            ? <div className="fetching-loading">加载中...</div>
            : null
          }
        </div>
      </React.Fragment>
    )
  }
}
