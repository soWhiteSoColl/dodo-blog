import React from 'react'
import { loadSound } from '../../util/tool'

export default class MusicCanvas extends React.Component {
  state = {
    loading: false,
    paused: true
  }

  $canvas = React.createRef()
  hash = 0
  audioBufferSouceNode = null
  bufferArray = null
  audioContext = null

  componentDidMount() {
    // 创建音频上下文
    window.AudioContext = window.AudioContext
      || window.webkitAudioContext
      || window.mozAudioContext
      || window.msAudioContext

    this.handleInit()
  }

  componentDidUpdate(prevProps) {
    if (this.props.audio !== prevProps.audio) {
      this.handleInit()
    }
  }

  handleInit = async () => {
    const audio = this.props.audio
    if (!audio) return false
    if (!audio.paused) this.handleStart()

    audio.addEventListener('play', this.handleResume)
    audio.addEventListener('pause', this.handleSuspend)
    audio.addEventListener('seeked', this.handleStart)
    audio.addEventListener('seeking', this.handleSuspend)
    audio.addEventListener('loadstart', this.handleStart)
  }

  handleStart = () => {
    console.log('重新加载')
    // 创建audioNode和audioCtx
    this.handlePause()
    this.hash = this.hash + 1
    this.setState({ loading: true })
    const audio = this.props.audio
    const audioCtx = new window.AudioContext()
    const audioNode = audioCtx.createBufferSource()
    this.audioNode = audioNode
    this.audioCtx = audioCtx


    this.setState({ paused: false })
    // 加载声音
    audio.volume = 1
    const currentHash = this.hash

    loadSound(audio.src)
      .then(bufferArray => this.handleDecode(bufferArray, currentHash))
      .then(({ analyser, hash }) => {
        if (hash !== this.hash || !this.audioNode) return false
        this.setState({ loading: false })
        audio.volume = 0
        this.audioNode.start(0, audio.currentTime)
        if(audio.paused) {
          this.handleSuspend()
        }else{
          this.handleResume()
        }
        this.audioStart = true
        this.handleDraw(analyser)
      })
      .catch(error => console.log(error))
  }

  handleResume = () => {
    this.setState({ paused: false })
    if (this.audioCtx && this.audioCtx.state === 'suspended' && !this.state.loading) {
      console.log('播放')
      this.audioCtx.resume()
    }
  }

  handleSuspend = () => {
    console.log('暂停')
    this.setState({ paused: true })
    if (this.audioCtx && this.audioCtx.state === 'running' && !this.state.loading) {
      this.audioCtx.suspend()
    }
  }

  handlePause = () => {
    this.audioStart && this.audioNode.stop()
    this.audioStart = false
    this.audioCtx = null
    this.audioNode = null
  }

  handleDecode = (bufferArray, hash) => {
    if (hash !== this.hash) return false

    return new Promise(resolve =>
      this.audioCtx.decodeAudioData(bufferArray, buffer => {
        const audioCtx = new window.AudioContext()
        const audioNode = audioCtx.createBufferSource()
        this.audioNode = audioNode
        this.audioCtx = audioCtx

        this.audioNode.buffer = buffer
        if (!this.audioNode) return false

        this.audioNode.connect(this.audioCtx.destination)
        const analyser = this.audioCtx.createAnalyser();
        this.audioNode.connect(analyser)
        analyser.connect(this.audioCtx.destination)

        resolve({ analyser, hash })
      })
    )
  }

  handleDraw = analyser => {
    const canvas = this.$canvas.current

    const cwidth = canvas.width,
      cheight = canvas.height - 2,
      meterWidth = 10,
      gap = 2,
      capHeight = 2,
      capStyle = '#39f',
      meterNum = 800 / (10 + 2),
      capYPositionArray = [],
      ctx = canvas.getContext('2d'),
      gradient = ctx.createLinearGradient(0, 0, 0, 280)

    gradient.addColorStop(1, '#39f')
    gradient.addColorStop(0.9, '#0cf')
    gradient.addColorStop(0.76, '#08f')
    gradient.addColorStop(0.3, '#14f')

    var drawMeter = function () {
      var array = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(array)

      var step = Math.round(array.length / meterNum)

      ctx.clearRect(0, 0, cwidth, cheight);
      for (var i = 0; i < meterNum; i++) {
        var value = array[i * step];
        if (capYPositionArray.length < Math.round(meterNum)) {
          capYPositionArray.push(value)
        }

        ctx.fillStyle = capStyle
        if (value < capYPositionArray[i]) {
          ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
        } else {
          ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight)
          capYPositionArray[i] = value;
        }

        ctx.fillStyle = gradient
        ctx.fillRect(i * 12, cheight - value + capHeight, meterWidth, cheight)
      }
      requestAnimationFrame(drawMeter);
    }

    requestAnimationFrame(drawMeter);
  }

  componentWillUnmount() {
    this.handlePause()
    const audio = this.props.audio
    audio && (audio.volume = 1)
    audio.removeEventListener('play', this.handleStart)
    audio.removeEventListener('pause', this.handlePause)
  }

  render() {
    const { loading, paused } = this.state

    if (loading) return <div className="music-canvas-loading">{!paused ? '加载中...' : ''}</div>
    return (
      <canvas width={720} height={280} ref={this.$canvas} />
    )
  }
}