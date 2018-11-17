import React from 'react'
import classnames from 'classnames'


export default class Drawer extends React.Component {
  state = {
    open: false
  }

  componentDidMount() {

  }

  handleToggle = () => {
    const open = !this.state.open
    this.setState({ open })
  }

  render() {
    const { open } = this.state

    return (
      <div className={classnames('w-drawer', open ? 'open' : 'close')}>
        <div
          className={classnames('w-drawer-toggle', open ? 'close' : 'open')}
          onClick={this.handleToggle}
        >
          <span className="w-drawer-toggle-bar"></span>
          <span className="w-drawer-toggle-bar"></span>
          <span className="w-drawer-toggle-bar"></span>
        </div>
        <div className="w-drawer-container">
          <div
            className={classnames('w-drawer-inner-toggle', open ? 'close' : 'open')}
            onClick={this.handleToggle}
          >
            <span className="w-drawer-toggle-bar"></span>
            <span className="w-drawer-toggle-bar"></span>
            <span className="w-drawer-toggle-bar"></span>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}