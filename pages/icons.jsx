import React from 'react'
import Icon from '../components/widgets/Icons'


export default class Icons extends React.Component {
  render() {
    return (
      <div className="icon-demos">
        <Icon type="play" />

        <Icon type="pause" />

        <Icon type="left-arrow" />

        <Icon type="right-arrow" />

        <Icon type="top-arrow"/>

        <Icon type="menu"/>

        <Icon type="loop" antd={true} />

        <Icon type="music" antd={true} />

        <Icon type="bars" />
      </div>
    )
  }
}