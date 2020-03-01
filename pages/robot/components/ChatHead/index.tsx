import React from 'react'
import { connect } from 'react-redux'
import Navigator from '../../../../components/Navigator'
import './index.scss'

export default function ChatHead(props){
  return (
    <div className="robot-chat-head">
      <span>小寒</span>
      <Navigator/>
    </div>
  )
}
