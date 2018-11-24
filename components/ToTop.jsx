import React from 'react'
import { pageScrollTo } from '../util/tool'
import classnames from 'classnames'


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
        Top
      </div>
    )
  }
}