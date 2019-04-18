import React from 'react'
import classnames from 'classnames'
import ReactDOM from 'react-dom'
import { getDOMById } from 'tools/main'
import Icon from './Icons'
import _ from 'lodash'

class DrawerInner extends React.Component {
  state = {
    open: false
  }

  handleToggle = () => {
    const open = !this.state.open
    this.setState({ open })

    const app = document.getElementById('__next')

    if (window.innerWidth > 720) {
      app.style.width = open ? 'calc(100% - 340px)' : '100%'
    }

    if (open) {
      this.props.beforeOpen && this.props.beforeOpen()
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.props.afterOpen && this.props.afterOpen()
      }, 300)
    } else {
      this.props.beforeClose && this.props.beforeClose()
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.props.afterClose && this.props.afterClose()
      }, 600)
    }
  }

  componentWillUnmount() {
    const app = document.getElementById('__next')
    app.style.width = '100%'
    clearTimeout(this.timer)
  }

  componentDidMount() {
    const app = document.getElementById('__next')

    window.addEventListener(
      'resize',
      _.throttle(() => {
        if (window.innerWidth < 720) {
          app.style.width = '100%'
        } else {
          app.style.width = this.state.open ? 'calc(100% - 340px)' : '100%'
        }
      }, 60)
    )
  }

  render() {
    const { open } = this.state
    const { children } = this.props

    return (
      <div className={classnames('do-drawer', open ? 'open' : 'close')}>
        <div className="do-drawer-container">
          <Icon type={open ? 'close' : 'menu'} onClick={this.handleToggle} />
          {children}
        </div>
        <div className="do-drawer-mask" />
      </div>
    )
  }
}

export default class Drawer extends React.Component {
  componentDidMount() {
    ReactDOM.render(<DrawerInner {...this.props} />, getDOMById('drawer-root'))
  }

  componentDidUpdate() {
    ReactDOM.render(<DrawerInner {...this.props} />, getDOMById('drawer-root'))
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(getDOMById('drawer-root'))
    document.body.removeChild(getDOMById('drawer-root'))
  }

  render() {
    return null
  }
}
