import React from 'react'

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
  currentRequest = null

  componentDidMount() {
    // 创建音频上下文
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext
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
    // 创建audioNode和audioCtx
    this.handlePause()
    this.hash = this.hash + 1
    this.setState({ loading: true })
    const audio = this.props.audio
    const audioCtx = new window.AudioContext()
    const audioNode = audioCtx.createBufferSource()
    this.audioNode = audioNode
    this.audioCtx = audioCtx
    this.currentRequest && this.currentRequest.abort()

    this.setState({ paused: false })
    // 加载声音
    audio.volume = 1
    const currentHash = this.hash

    var request = new XMLHttpRequest()
    this.currentRequest = request

    let url = audio.src
    if (!url.match(/https:/)) url = url.replace('http', 'https')
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'
    // 一旦获取完成，对音频进行进一步操作，比如解码
    request.onload = () => {
      const bufferArray = request.response

      this.handleDecode(bufferArray, currentHash)
        .then(({ analyser, hash }) => {
          if (hash !== this.hash || !this.audioNode) return false
          this.setState({ loading: false })
          audio.volume = 0
          this.audioNode.start(0, audio.currentTime)
          if (audio.paused) {
            this.handleSuspend()
          } else {
            this.handleResume()
          }
          this.audioStart = true
          this.handleDraw(analyser)
        })
        .catch(error => console.log(error))
    }
    request.send()
  }

  handleResume = () => {
    this.setState({ paused: false })
    if (this.audioCtx && this.audioCtx.state === 'suspended' && !this.state.loading) {
      this.audioCtx.resume()
    }
  }

  handleSuspend = () => {
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
        const analyser = this.audioCtx.createAnalyser()
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
      capHeight = 2,
      capStyle = '#abc',
      meterNum = 800 / (10 + 2),
      capYPositionArray = [],
      ctx = canvas.getContext('2d'),
      gradient = ctx.createLinearGradient(0, 0, 0, 280)

    gradient.addColorStop(1, '#abc')
    gradient.addColorStop(0.9, '#fff')
    gradient.addColorStop(0.76, '#def')
    gradient.addColorStop(0.3, '#cde')

    var drawMeter = () => {
      var array = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(array)

      var step = Math.round(array.length / meterNum)

      ctx.clearRect(0, 0, cwidth, cheight)
      for (var i = 0; i < meterNum; i++) {
        var value = array[i * step]
        if (capYPositionArray.length < Math.round(meterNum)) {
          capYPositionArray.push(value)
        }

        ctx.fillStyle = capStyle
        if (value < capYPositionArray[i]) {
          ctx.fillRect(i * 12, cheight - --capYPositionArray[i], meterWidth, capHeight)
        } else {
          ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight)
          capYPositionArray[i] = value
        }

        ctx.fillStyle = gradient
        ctx.fillRect(i * 12, cheight - value + capHeight, meterWidth, cheight)
      }
      requestAnimationFrame(drawMeter)
    }

    requestAnimationFrame(drawMeter)
  }

  componentWillUnmount() {
    this.handlePause()
    const audio = this.props.audio
    audio && (audio.volume = 1)
    audio.removeEventListener('play', this.handleResume)
    audio.removeEventListener('pause', this.handleSuspend)
    audio.removeEventListener('seeked', this.handleStart)
    audio.removeEventListener('seeking', this.handleSuspend)
    audio.removeEventListener('loadstart', this.handleStart)
  }

  render() {
    const { loading, paused } = this.state

    if (loading) {
      return (
        <div className="music-analyzer-canvas">
          <div className="music-canvas-loading">{!paused ? '加载中...' : ''}</div>
        </div>
      )
    }

    return (
      <div className="music-analyzer-canvas">
        <canvas width={720} height={280} ref={this.$canvas} />
      </div>
    )
  }
}
