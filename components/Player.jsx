import { observer, inject } from 'mobx-react'
import MusicPlayer from '../components/widgets/MusicPlayer'
import configConst from '../config'


@inject('musicStore')
@observer
export default class Player extends React.Component {
  componentDidMount() {
    const id = localStorage.getItem('current-list-id') || configConst.defaultMusicListId
    !this.props.musicStore.currentList || !this.props.musicStore.currentList.songs
      && this.props.musicStore.getListById(id)
  }

  render() {
    const { audio, currentList } = this.props.musicStore
    const { audioConfig } = this.props

    if (!currentList || !currentList.songs) {
      return null
    }

    if ((audioConfig && audioConfig.position !== 'bottom') && (!audio || audio.paused)) {
      return null
    }

    const { songs, songListId } = currentList
    return (
      <MusicPlayer
        audioConfig={this.props.audioConfig}
        songsKey={songListId}
        getAudio={audio => this.props.musicStore.setValue('audio', audio)}
        musics={songs}
        onChange={this.props.musicStore.toggle}
      />
    )
  }
}