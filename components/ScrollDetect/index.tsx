import React from 'react'

interface Props {
  detect?: boolean
  protectTime?: number
  loadingTime?: number
  onScrollOut?: Function
}

export default class ScrollDetect extends React.Component<Props> {
  el = React.createRef<HTMLDivElement>()
  detectElement: HTMLElement
  taskTimer = 0
  protectTimer = 0
  loading = false
  protecting = false

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
        ? this.detectElement.addEventListener('scroll', this.handleDetect)
        : this.detectElement.removeEventListener('scroll', this.handleDetect)
    }
  }

  handleDetect = () => {
    if (this.loading || this.protecting) return false

    const { protectTime = 0, loadingTime = 0, onScrollOut } = this.props
    const { bottom } =
      this.el.current && this.el.current.getBoundingClientRect()

    if (bottom < window.innerHeight + 100) {
      this.loading = true
      this.protecting = true

      this.taskTimer = window.setTimeout(() => {
        this.loading = false
        onScrollOut()
        this.handleDetect()
      }, loadingTime)

      this.protectTimer = window.setTimeout(() => {
        this.protecting = false
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
