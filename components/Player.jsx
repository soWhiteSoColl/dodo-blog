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
    if (!this.props.musicStore.currentList || !this.props.musicStore.currentList.songs) {
      return null
    }

    const songs = this.props.musicStore.currentList.songs

    return (
      <MusicPlayer
        getAudio={audio => {
          this.props.musicStore.setValue('audio', audio)
        }}
        audioConfig={this.props.audioConfig}
        musics={songs}
        onPlay={this.props.musicStore.toggle}
      />
    )
  }
}