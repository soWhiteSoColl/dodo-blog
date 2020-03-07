import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ChatPanel from './components/ChatPanel'
import ChatInput from './components/ChatInput'
import ChatHead from './components/ChatHead'
import Head from 'next/head'
import Router from 'next/router'
import { track } from '../../utils/common'
import './index.scss'

function Robot(props){
  const { currentChat, initChat, clearChats, robotReply, getSelects } = props

  useEffect(() => {
    track('enter-chat', 'route-change')

    const key = Router.query.key || 'default'
    initChat(key)
    return () => clearChats()
  }, [])

  useEffect(() => {
    if(!currentChat) return

    if(currentChat.role === 'user') {
      robotReply(currentChat.chatId)
    }

    if(currentChat.role === 'robot') {
      getSelects(currentChat.chatId)
    }
    
  }, [currentChat])

  return (
    <>
      <Head>
        <title>和小寒聊天</title>
      </Head>
      <div className="robot-page">
        <div className="robot-panel">
          <ChatHead/>
          <ChatPanel/>
          <ChatInput/>
        </div>
      </div>
    </>
  )
}

Robot.getInitialProps = () => {
  return { navigator: false }
}

const mapState = state => ({ ...state.robotModel })

const mapDispatch = state => ({ ...state.robotModel })

export default connect(mapState, mapDispatch)(Robot)