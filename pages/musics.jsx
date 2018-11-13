import React from 'react';
import Head from 'next/head'
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'
import Link from 'next/link'
import { pageScrollTo } from '../util/tool'

const ToTop = () => {
  return (
    <div className="to-top" onClick={() => pageScrollTo(0)}>Top</div>
  )
}
@inject('musicStore')
@observer
class MusicList extends React.Component {
  handlePlay = () => {
    const { id } = this.props
    this.props.musicStore.getListById(id)
    localStorage.setItem('current-list-id', id)
  }

  render() {
    const { coverImgUrl, title, description } = this.props
    const { id } = this.props
    const { currentList } = this.props.musicStore

    return (
      <div className={classnames("music-album", id === currentList.songListId && 'active', 'play')}>
        <div className="music-album-cover">
          <img src={coverImgUrl} alt="" />
          <div
            className={classnames("music-player-play-btn")}
            onClick={this.handlePlay}
          >
            <svg width={30} height={30}>
              <path className="svg-play-btn" stroke="#fff" strokeWidth={3} strokeLinecap="butt" fill="none"></path>
            </svg>
          </div>
        </div>
        <div className="music-album-info">
          <span className="music-album-title">{title}</span>
        </div>
      </div>
    )
  }
}
export default class Musics extends React.Component {
  static getInitialProps() {
    return { audioConfig: { size: 'large', position: 'bottom' } }
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
          <title>dodo 音乐播放器</title>
        </Head>
        <div className="do-common-container">
          <div className="music-album-list" ref={this.$musicList}>
            {hotMusicLists &&
              hotMusicLists.map(item => <MusicList key={item.id} {...item} />)
            }
          </div>
          <Link href="/music">
            <a><div className="music-detail-ball">🎵</div></a>
          </Link>

          <ToTop />
        </div>
      </React.Fragment>
    )
  }
}
