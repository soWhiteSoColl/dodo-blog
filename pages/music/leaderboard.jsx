import React from 'react'
import Icon from 'widgets/Icons'
import AnimateQueue from 'widgets/AnimateQueue'
import { inject, observer } from 'mobx-react'
import classnames from 'classnames'

@inject('musicStore')
@observer
class MusicItem extends React.Component {
  handlePlay = () => {
    const music = this.props
    const { currentMusic, leaderboard: musics, paused } = this.props.musicStore
    if (music.id === currentMusic.id && !paused) {
      return this.props.musicStore.setValues({ paused: true })
    }

    this.props.musicStore.setValues({
      paused: false,
      currentList: musics,
      currentMusic: music
    })

    localStorage.setItem('current-list-id', musics.songListId)
    localStorage.setItem('current-music-id', music.id)
  }

  render() {
    const { id, name, singer, pic } = this.props
    const { currentMusic, paused } = this.props.musicStore
    const active = id === currentMusic.id

    return (
      <li className="music-info-item">
        <div className="music-info-pic">
          <img className="music-info-cover" src={pic} alt={name} />
        </div>
        <span className="music-info-name">{name}</span>
        <span className="music-info-singer">{singer}</span>
        <span className="music-info-toggle" onClick={() => this.handlePlay()}>
          <div className={classnames('music-info-play-btn', active && 'active')}>
            <Icon type={active && !paused ? 'play' : 'pause'} />
          </div>
        </span>
      </li>
    )
  }
}

export default class Search extends React.Component {
  static async getInitialProps() {
    return {
      audioConfig: { size: 'large', position: 'bottom' },
      footer: false
    }
  }

  componentDidMount() {
    this.props.musicStore.getLeaderboard()
  }

  render() {
    const { songs = [] } = this.props.musicStore.leaderboard

    return (
      <div className="music-leader-page">
        <div className="do-content-container">
          <ul className="music-info-list">
            <AnimateQueue
              animate={true}
              interval={50}
              speed={600}
              from={{ transform: 'translateY(80px)' }}
              to={{ transform: 'translateX(0px)' }}
            >
              {songs.slice(0, 15).map(music => <MusicItem key={music.id} {...music} />)}
            </AnimateQueue>
          </ul>
        </div>
      </div>
    )
  }
}