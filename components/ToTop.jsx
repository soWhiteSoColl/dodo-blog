import React from 'react'
import { pageScrollTo } from 'tools/main'
import classnames from 'classnames'
import Icon from './widgets/Icons'

export default class ToTop extends React.Component {
  state = {
    show: false
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const { scrollY } = window
      if (scrollY > 800 && !this.state.show) {
        this.setState({ show: true })
      }

      if (scrollY < 800 && this.state.show) {
        this.setState({ show: false })
      }
    })
  }
  handleClick = () => {
    pageScrollTo(0)
  }

  render() {
    const { show } = this.state

    return (
      <div className={classnames('do-to-top', show && 'show')} onClick={this.handleClick}>
        <Icon type="top-arrow"/>
      </div>
    )
  }
}