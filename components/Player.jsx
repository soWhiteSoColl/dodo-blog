import { observer, inject } from 'mobx-react'
import MusicPlayer from 'widgets/MusicPlayer'
import configConst from '../config'

/**
 * 负责控制歌曲的数据
 * 而播放器的职责是接受歌曲的信息进行播放
 */
@inject('musicStore')
@observer
export default class Player extends React.Component {
  componentDidMount() {
    const listId = localStorage.getItem('current-list-id') || configConst.defaultMusicListId
    const musicId = localStorage.getItem('current-music-id')

    listId && this.props.musicStore.getListById(listId)
      .then(list => {
        if (musicId && list.songs) {
          const currentMusic = list.songs.find(item => item.id === musicId)
          if(!currentMusic) return false
          
          this.props.musicStore.setValues({ currentMusic })
        }
      })
  }

  handleChange = music => {
    localStorage.setItem('current-music-id', music.id)
  }
  handlePlay = () => {
    this.props.musicStore.setValue('paused', false)
  }

  handlePause = () => {
    this.props.musicStore.setValue('paused', true)
  }

  render() {
    const { currentList, paused, currentMusic } = this.props.musicStore
    const { audioConfig } = this.props

    if (!currentList) return false

    const { songs, songListId } = currentList
    if (paused && audioConfig.position !== 'bottom') return null

    return (
      <MusicPlayer
        audioConfig={audioConfig}
        listId={songListId}
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