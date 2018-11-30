import React from 'react'


export default class MusicBg extends React.Component {
  $bg2 = React.createRef()
  $bg1 = React.createRef()
  originSrc = this.props.src
  current = 1

  componentDidMount() {
    console.log('did mount')
    this.handleToggleBg()
  }

  componentDidUpdate() {
    console.log('did update')
    this.handleToggleBg()
  }

  handleToggleBg = () => {
    if (this.current === 1) {
      this.$bg1.current.style.backgroundImage = `url(${this.originSrc})`
      this.$bg1.current.style.opacity = 0

      this.$bg2.current.style.backgroundImage = `url(${this.props.src})`
      this.$bg2.current.style.opacity = 0.4

      this.current = 2
      this.originSrc = this.props.src
    } else {
      this.$bg1.current.style.backgroundImage = `url(${this.props.src})`
      this.$bg1.current.style.opacity = 0.4

      this.$bg2.current.style.backgroundImage = `url(${this.originSrc})`
      this.$bg2.current.style.opacity = 0

      this.current = 1
      this.originSrc = this.props.src
    }
  }

  render() {
    return (
      <div className="music-player-bg-wrapper">
        <div className="music-player-bg" />
        <div className="music-player-bg" ref={this.$bg1} />
        <div className="music-player-bg" ref={this.$bg2} />
      </div>
    )
  }
}