import React from 'react';
import Head from 'next/head'
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'

import AnimateQueue from 'components/widgets/AnimateQueue'
import Icon from 'components/widgets/Icons'


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
    loading: false
  }

  $musicList = React.createRef()

  componentDidMount() {
    setTimeout(this.handleScroll)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (!this.$musicList.current) return false

    const elBottom = this.$musicList.current.getBoundingClientRect().bottom
    const windowHeihgt = window.innerHeight
    if (elBottom <= windowHeihgt + 100 && !this.fetching) {
      this.handleFetchMore()
    }
  }

  handleFetchMore = () => {
    if (this.props.musicStore.hotMusicLists.noMore) {
      return false
    }

    this.fetching = true
    this.setState({ loading: true })

    this.props.musicStore.getHostLists({ more: true })
      .then(() => {
        this.fetching = false
        this.setState({ loading: false })
      })
  }


  render() {
    const { hotMusicLists } = this.props.musicStore

    return (
      <React.Fragment>
        <Head>
          <title>小寒的博客 - 听歌, 音乐, 学习</title>
          <meta name="keywords" content={'听歌，学习，音乐'} />
          <meta name="description" content={'听听歌，这里有各种各样的好听的音乐，小寒的博客 - 听歌, 音乐, 学习'} />
        </Head>
        <div className="music-list-page">
          <div className="music-album-list" ref={this.$musicList}>
            <AnimateQueue
              animate={true}
              interval={50}
              speed={600}
              from={{ transform: 'translateY(80px)' }}
              to={{ transform: 'translateX(0px)' }}
            >
              {hotMusicLists &&
                hotMusicLists.map((item, index) =>
                  <MusicList key={item.id + index} {...item} />
                )
              }
            </AnimateQueue>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
