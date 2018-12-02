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

    const { songs, songListId } = this.props.musicStore.currentList

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