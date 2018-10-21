import React from 'react'
import { pageScrollTo } from '../util/tool'


export default class ToTop extends React.Component{
  state = {
    showToTop: false,
  }

  componentDidMount = () => {
    this.handleShowToTop()
    window.addEventListener('scroll', this.handleShowToTop)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleShowToTop)
  }


  handleToTop = () => {
    pageScrollTo(this.props.top || 0)
  }

  handleShowToTop = () => {
    if (window.pageYOffset > 200){
      this.setState({ showToTop: true })
    } else {
      this.setState({ showToTop: false })
    }
  }

  render(){
    return this.state.showToTop
      ? <div className="widget-to-top" onClick={this.handleToTop}>
        <span className="widget-to-top-text">回到顶部</span>
      </div>
      : null
  }
}
