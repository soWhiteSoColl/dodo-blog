import React from 'react'

interface Props {
  detect?: boolean
  protectTime?: number
  onScrollOut?: Function
}

export default class ScrollDetect extends React.Component<Props> {
  el = React.createRef<HTMLDivElement>()

  taskTimer = 0
  sleeping = false

  componentDidMount() {
    this.handleDetect()
    window.addEventListener('scroll', this.handleDetect)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleDetect)
    clearTimeout(this.taskTimer)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.detect !== this.props.detect) {
      this.props.detect
        ? window.addEventListener('scroll', this.handleDetect)
        : window.removeEventListener('scroll', this.handleDetect)
    }
  }

  handleDetect = () => {
    if (this.sleeping) return false
    const { protectTime = 1000, onScrollOut } = this.props
    const { bottom } =
      this.el.current && this.el.current.getBoundingClientRect()

    if (bottom < window.innerHeight + 100) {
      this.sleeping = true
      this.taskTimer = window.setTimeout(() => {
        this.sleeping = false
        onScrollOut()
        this.handleDetect()
      }, protectTime)
    }
  }

  render() {
    return (
      <div className="ze-scroll-detect" ref={this.el}>
        {this.props.children}
      </div>
    )
  }
}
