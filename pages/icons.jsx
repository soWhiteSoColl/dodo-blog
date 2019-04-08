import React from 'react'
import Icon from 'ui/Icons'

export default class Icons extends React.Component {
  render() {
    return (
      <div className="icon-demos">
        {/* custom */}
        <Icon type="play" />
        <Icon type="pause" />
        <Icon type="left-arrow" />
        <Icon type="right-arrow" />
        <Icon type="top-arrow" />
        <Icon type="menu" />
        <Icon type="close" />
        <Icon type="bars" />

        {/* antd */}
        <Icon type="loop" antd={true} />
        <Icon type="music" antd={true} />
        <Icon type="random" antd={true} />
        <Icon type="download" antd={true} />
        <Icon type="search" antd={true} />
      </div>
    )
  }
}
