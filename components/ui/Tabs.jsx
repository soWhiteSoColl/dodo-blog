import * as React from 'react'
import * as ReactIs from 'react-is'
import { findDOMNode } from 'react-dom'
import Ripple from './Ripple'
import classnames from 'classnames'

class Tab extends React.Component {
  tab = React.createRef()
  ripple = React.createRef()

  createRipple = e => {
    this.ripple.current.createRipple(e)
  }

  render() {
    const { active, onClick, style, width, type } = this.props

    return (
      <div
        className={classnames('ze-tab', type !== 'easy' && 'ze-clickable', active && 'ze-active')}
        onMouseDown={e => type !== 'easy' && this.createRipple(e)}
        onClick={onClick}
        style={Object.assign({}, style, { width })}
        ref={this.tab}
      >
        {this.props.children}
        {type !== 'easy' && <Ripple ref={this.ripple} />}
      </div>
    )
  }
}

/**
 * 1. 设置tab的label和value
 * 2. onChange 方法回调
 */
export default class Tabs extends React.Component {
  activeBar = React.createRef()
  activeTab = React.createRef()

  static Item = Tab

  componentDidUpdate() {
    this.handleChangeBar()
  }

  handleClickTab = (_, value, index) => {
    if (this.props.onChange) {
      this.props.onChange(value, index)
    }
  }

  componentDidMount() {
    this.handleChangeBar()
  }

  handleChangeBar = () => {
    if (this.activeTab.current) {
      const el = findDOMNode(this.activeTab.current)
      const { offsetWidth, offsetLeft } = el
      this.activeBar.current.style.width = offsetWidth + 'px'
      this.activeBar.current.style.left = offsetLeft + 'px'
    } else {
      this.activeBar.current.style.width = 0 + 'px'
    }
  }

  render() {
    const { value, type } = this.props
    let children = this.props.children
    if (ReactIs.isFragment(children)) {
      children = children.props.children
    }

    return (
      <div className={classnames('ze-tabs', type && 'ze-tabs-' + type)}>
        {children &&
          React.Children.map(children, (child, index) => {
            const valueIsValid = child.props.value || typeof child.props.value === 'number'
            const tabValue = valueIsValid ? child.props.value : index
            const active = tabValue === value

            return React.cloneElement(child, {
              onClick: e => {
                this.handleClickTab(e, tabValue, index)
                child.props.onClick && child.props.onClick(e)
              },
              active: active,
              ref: active ? this.activeTab : null,
              value: tabValue,
              type
            })
          })}
        <div className="ze-tab-bar" ref={this.activeBar} />
      </div>
    )
  }
}
