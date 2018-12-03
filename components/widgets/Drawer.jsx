import React from 'react'
import classnames from 'classnames'
import ReactDOM from 'react-dom'

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
      <div className={classnames('w-drawer', open ? 'open' : 'close')}>
        <div className="w-drawer-container">
          <div
            className={classnames('w-drawer-toggle', open ? 'close' : 'open')}
            onClick={this.handleToggle}
          >
            <span className="w-drawer-toggle-bar"></span>
            <span className="w-drawer-toggle-bar"></span>
            <span className="w-drawer-toggle-bar"></span>
          </div>
          <div
            className={classnames('w-drawer-inner-toggle', open ? 'close' : 'open')}
            onClick={this.handleToggle}
          >
            <span className="w-drawer-toggle-bar"></span>
            <span className="w-drawer-toggle-bar"></span>
            <span className="w-drawer-toggle-bar"></span>
          </div>
          {children}
        </div>
        <div className="w-drawer-mask"></div>
      </div>
    )
  }
}

const createDOM = () => {
  let el = document.getElementById('drawer-root')

  if (!el) {
    el = document.createElement('div')
    el.id = 'drawer-root'
    const container = document.createElement('div')
    container.id = 'drawer-container'

    el.appendChild(container)
    document.body.appendChild(el)
  }

  return el
}
export default class Drawer extends React.Component {
  componentDidMount() {
    createDOM()
    ReactDOM.render(<DrawerInner {...this.props} />, document.querySelector('#drawer-container'))
  }

  componentDidUpdate() {
    ReactDOM.render(<DrawerInner {...this.props} />, document.querySelector('#drawer-container'))
  }

  componentWillUnmount() {
    const app = document.getElementById('__next')
    app.style.width = '100%'
    ReactDOM.unmountComponentAtNode(document.querySelector('#drawer-container'))
  }

  render() {
    return null
  }
}