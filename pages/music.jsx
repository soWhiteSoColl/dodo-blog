import React from 'react';
import Head from 'next/head'
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'


@inject('musicStore')
@observer
class MusicList extends React.Component {
  handlePlay = () => {
    const { id } = this.props
    this.props.musicStore.getListById(id)

    localStorage.setItem('current-list-id', id)
  }

  render() {
    const { coverImgUrl, title } = this.props

    return (
      <div className="music-album">
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
        <h3 className="music-album-title">{title}</h3>
      </div>
    )
  }
}
export default class Contact extends React.Component {
  static getInitialProps() {
    return { audioConfig: { size: 'large', position: 'bottom' } }
  }

  componentDidMount() {
    this.props.musicStore.getHostLists()
  }

  render() {
    const { hotMusicLists } = this.props.musicStore

    return (
      <React.Fragment>
        <Head>
          <title>dodo 音乐播放器</title>
        </Head>
        <div className="do-common-container">
          <div className="music-album-list">
            {hotMusicLists &&
              hotMusicLists.map(item => <MusicList key={item.id} {...item} />)
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}
