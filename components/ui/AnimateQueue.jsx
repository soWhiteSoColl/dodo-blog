/* eslint-disable no-unused-vars*/
import * as React from 'react'

const defaultSpeed = 600
const defaultInterval = 200
export class Animate extends React.Component {
  state = {
    animate: false
  }

  componentDidMount() {
    if (this.props.animate) {
      setTimeout(() => this.setState({ animate: true }))
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.animate !== this.props.animate) {
      setTimeout(() => this.setState({ animate: this.props.animate }))
    }
  }

  render() {
    const { children, speed = defaultSpeed, from, to } = this.props
    const { animate } = this.state
    const additionAnimate = (animate ? to : from) || {}

    return React.Children.map(children, item =>
      React.cloneElement(item, {
        style: {
          ...{
            transform: `translateY(${animate ? 0 : 40}px)`,
            transition: `all ease ${speed / 1000}s`,
            opacity: animate ? 1 : 0
          },
          ...additionAnimate
        }
      })
    )
  }
}

export default class AnimateQueue extends React.Component {
  timer = null

  state = {
    current: 0
  }

  componentDidMount() {
    this.handleAnimate(this.props.animate)
  }

  componentDidUpdate(prevProps) {
    if (!this.props.children || !prevProps.children) {
      return null
    }
    if (prevProps.exit !== this.props.exit) {
      return this.handleAnimate(this.props.animate)
    }
    if (prevProps.animate !== this.props.animate) {
      return this.handleAnimate(this.props.animate)
    }
    if (prevProps.children.length !== this.props.children.length) {
      return this.handleAnimate(this.props.animate)
    }
  }

  handleAnimate = animate => {
    const { interval = defaultInterval, children, exit } = this.props
    if (!children || !children.length) return false

    clearTimeout(this.timer)
    if (exit) {
      return this.setState({ current: 0 })
    }

    const loop = () => {
      let current = this.state.current
      const max = children ? children.length : 0
      if (!animate && current <= 0) {
        this.setState({ current: 0 })
        this.props.onAnimateEnd && this.props.onAnimateEnd()
        return false
      }

      if (animate && current >= max) {
        this.setState({ current: max })
        this.props.onAnimateEnd && this.props.onAnimateEnd()
        return false
      }

      current = current + (animate ? 1 : -1)

      this.setState({ current })
      this.timer = setTimeout(loop, interval)
    }

    this.timer = setTimeout(loop, interval)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const { children, speed = 400, animate, ...rest } = this.props
    const { current } = this.state

    if (!children) return null

    return React.Children.map(children, (item, index) => {
      return (
        <Animate animate={index < current} speed={speed} {...rest}>
          {item}
        </Animate>
      )
    })
  }
}

export class AnimateQueueGroup extends React.Component {
  state = {
    current: 0
  }

  animate = this.props.animate

  componentDidMount() {
    this.handleNextAnimate()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.animate !== this.props.animate) {
      this.animate = nextProps.animate
      this.handleNextAnimate()
    }
  }

  handleNextAnimate = () => {
    let { current } = this.state
    const { children } = this.props
    const max = children ? children.length : 0

    if (this.animate && current >= max) {
      current = max
    } else if (!this.animate && current <= 0) {
      current = 0
    } else {
      this.animate ? (current = current + 1) : (current = current - 1)
    }
    this.setState({ current })
  }

  render() {
    const { children, speed = 400, animate, ...rest } = this.props
    const { current } = this.state

    return React.Children.map(children, (item, index) => {
      return (
        <div className="ze-animate-group-wrapper">
          {React.cloneElement(item, {
            animate: index < current,
            ...rest,
            onAnimateEnd: this.handleNextAnimate
          })}
        </div>
      )
    })
  }
}
