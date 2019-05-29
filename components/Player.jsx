import React from 'react'
import { observer, inject } from 'mobx-react'
import MusicPlayer from 'ui/MusicPlayer'
import configConst from '../config'

/**
 * 负责控制歌曲的数据
 * 而播放器的职责是接受歌曲的信息进行播放
 */
@inject('musicStore')
@observer
export default class Player extends React.Component {
  alreadyUse = false

  componentDidMount() {
    const localId = localStorage.getItem('current-list-id')
    const listId = (localId !== 'undefined' && localId) || configConst.defaultMusicListId
    const musicId = localStorage.getItem('current-music-id')

    listId &&
      this.props.musicStore.getListById(listId).then(list => {
        if (list.songs) {
          const currentMusic = musicId ? list.songs.find(item => item.id === musicId) : list.songs[0]
          currentMusic && this.props.musicStore.setValues({ currentMusic })
        }
      })
  }

  handleChange = currentMusic => {
    !this.alreadyUse && (this.alreadyUse = true)
    localStorage.setItem('current-music-id', currentMusic.id)
    this.props.musicStore.setValues({ currentMusic })
  }

  handlePlay = () => {
    !this.alreadyUse && (this.alreadyUse = true)
    this.props.musicStore.setValue('paused', false)
  }

  handlePause = () => {
    this.props.musicStore.setValue('paused', true)
  }

  render() {
    const { currentList, paused, currentMusic } = this.props.musicStore
    const { audioConfig } = this.props
    const { songs, id } = currentList
    if (!currentList || !currentList.songs) return null
    if (!this.alreadyUse && paused && audioConfig.position !== 'bottom') return null

    return (
      <MusicPlayer
        audioConfig={audioConfig}
        listId={id}
        musicId={currentMusic && currentMusic.id}
        musics={songs}
        paused={paused}
        onPlay={this.handlePlay}
        onPause={this.handlePause}
        onChange={this.handleChange}
        getAudio={audio => this.props.musicStore.setValue('audio', audio)}
      />
    )
  }
}
