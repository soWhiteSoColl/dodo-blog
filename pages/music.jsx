import React from 'react'
import Head from 'next/head'
import MusicCanvas from '../components/widgets/MusicCavas'
import MusicBg from '../components/widgets/MusicBg'
import MusicLyric from '../components/widgets/MusicLyric'
import { autorun } from 'mobx'
import Icon from '../components/widgets/Icons'
import classnames from 'classnames'


export default class Music extends React.Component {
  static getInitialProps() {
    return { audioConfig: { size: 'large', position: 'bottom' }, header: false, footer: false }
  }

  state = {
    showAnalyzer: false
  }

  componentDidUpdate(prevProps) {
    const currentMusic = this.props.musicStore.currentMusic
    if (prevProps.currentMusic != currentMusic) {
      this.props.musicStore.getLyric()
    }
  }

  componentDidMount() {
    this.props.musicStore.getLyric()

    autorun(() => {
      // 标题动画效果
      const music = this.props.musicStore.currentMusic
      if (!music.name) return false
      const title = ' - 正在播放 ' + music.name + '-' + music.singer
      const titleLen = title.length
      let timerCount = titleLen
      clearInterval(this.titleChangeTimer)
      this.titleChangeTimer = setInterval(() => {
        timerCount--
        document.title = title.substr(-1 * timerCount, timerCount) + title.substr(0, titleLen - timerCount)
        if (timerCount === 0) timerCount = titleLen
      }, 1000)
    })
  }

  componentWillUnmount() {
    clearInterval(this.titleChangeTimer)
  }

  handleToggle = () => this.setState({ showAnalyzer: !this.state.showAnalyzer })

  render() {
    const music = this.props.musicStore.currentMusic
    const { showAnalyzer } = this.state

    return (
      <React.Fragment>
        <Head>
          <title>小寒的音乐播放器</title>
        </Head>
        <MusicBg src={music.pic} />
        <div className="do-content-container music-detail-page">
          <div className={classnames('music-analyzer-toggle', showAnalyzer && 'active')}>
            <Icon type="bars" onClick={this.handleToggle} />
          </div>
          {
            showAnalyzer
              ? <MusicCanvas
                url={this.props.musicStore.currentMusic.url}
                audio={this.props.musicStore.audio}
              />
              : <MusicLyric
                lyricStr={this.props.musicStore.currentMusicLyric}
                audio={this.props.musicStore.audio}
              />
          }
        </div>
      </React.Fragment>
    )
  }
}
