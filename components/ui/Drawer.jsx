import React from 'react'
import classnames from 'classnames'
import ReactDOM from 'react-dom'
import { getDOMById } from 'tools/main'

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
  }

  componentWillUnmount() {
    const app = document.getElementById('__next')
    app.style.width = '100%'
  }

  render() {
    const { open } = this.state
    const { children } = this.props

    return (
      <div className={classnames('do-drawer', open ? 'open' : 'close')}>
        <div className="do-drawer-container">
          <div
            className={classnames('do-drawer-toggle', open ? 'close' : 'open')}
            onClick={this.handleToggle}
          >
            <span className="do-drawer-toggle-bar" />
            <span className="do-drawer-toggle-bar" />
            <span className="do-drawer-toggle-bar" />
          </div>
          <div
            className={classnames(
              'do-drawer-inner-toggle',
              open ? 'close' : 'open'
            )}
            onClick={this.handleToggle}
          >
            <span className="do-drawer-toggle-bar" />
            <span className="do-drawer-toggle-bar" />
            <span className="do-drawer-toggle-bar" />
          </div>
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
