import React from 'react'
import { inject, observer } from 'mobx-react';

@inject('musicStore')
@observer
export default class MusicCanvas extends React.Component {
  $canvas = React.createRef()

  audioBufferSouceNode = null
  bufferArray = null
  audioContext = null

  componentDidMount() {
    // 创建音频上下文
    window.AudioContext = window.AudioContext
      || window.webkitAudioContext
      || window.mozAudioContext
      || window.msAudioContext
    this.audioContext = new window.AudioContext()

    const bufferArray = this.props.musicStore.bufferArray
    if (!bufferArray || !(bufferArray instanceof ArrayBuffer)) {
      return false
    }

    // 开始绘制
    this.handleDraw()
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.musicStore.bufferArray)
    this.bufferArray = this.props.musicStore.bufferArray
    this.audioBufferSouceNode && this.audioBufferSouceNode.stop()
    this.handleDraw()
  }

  handleDraw = () => {
    const canvas = this.$canvas.current
    const { bufferArray, audioContext } = this
    const currentTime = this.props.musicStore.audioInfo.currentTime
    this.audioContext.decodeAudioData(bufferArray, buffer => {
      var audioBufferSouceNode = audioContext.createBufferSource()
      this.audioBufferSouceNode = audioBufferSouceNode
      audioBufferSouceNode.buffer = buffer
      audioBufferSouceNode.connect(audioContext.destination)
      audioBufferSouceNode.start(0, currentTime)

      var analyser = audioContext.createAnalyser();
      audioBufferSouceNode.connect(analyser)
      analyser.connect(audioContext.destination)

      const cwidth = canvas.width,
        cheight = canvas.height - 2,
        meterWidth = 10,
        gap = 2,
        capHeight = 2,
        capStyle = '#39f',
        meterNum = 800 / (10 + 2),
        capYPositionArray = [];

      const ctx = canvas.getContext('2d'),
        gradient = ctx.createLinearGradient(0, 0, 0, 300);

      gradient.addColorStop(1, '#39f');
      gradient.addColorStop(0.9, '#0cf');
      gradient.addColorStop(0.76, '#08f');
      gradient.addColorStop(0.3, '#14f');

      var drawMeter = function () {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var step = Math.round(array.length / meterNum);
        ctx.clearRect(0, 0, cwidth, cheight);
        for (var i = 0; i < meterNum; i++) {
          var value = array[i * step];
          if (capYPositionArray.length < Math.round(meterNum)) {
            capYPositionArray.push(value);
          };
          ctx.fillStyle = capStyle;
          if (value < capYPositionArray[i]) {
            ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
          } else {
            ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
            capYPositionArray[i] = value;
          };
          ctx.fillStyle = gradient;
          ctx.fillRect(i * 12, cheight - value + capHeight, meterWidth, cheight);
        }
        requestAnimationFrame(drawMeter);
      }

      requestAnimationFrame(drawMeter);

    })
  }

  componentWillUnmount() {
    this.audioContext = null
    this.audioBufferSouceNode.stop()
    this.audioBufferSouceNode = null
  }

  render() {
    console.log(this.props.musicStore.bufferArray)
    return (
      <canvas width={720} height={320} ref={this.$canvas} />
    )
  }
}