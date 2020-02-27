import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ChatPanel from './components/ChatPanel'
import ChatInput from './components/ChatInput'
import ChatHead from './components/ChatHead'
import Router from 'next/router'
import './index.scss'

function Robot(props){
  const { chats, initChat, clearChats, robotReply, robotContinueReply, setSelectsWithIds } = props

  useEffect(() => {
    initChat()

    return () => clearChats()
  }, [])

  useEffect(() => {
    const lastChat = chats[chats.length - 1]
    
    if(lastChat) {
      if(lastChat.role === 'user'){
        robotReply(lastChat.id)
      }

      if(lastChat.role === 'robot' && lastChat.type === 'selects') {
        setSelectsWithIds(lastChat.selects)
      }

      if(lastChat.role === 'robot' && lastChat.type === 'next') {
        robotContinueReply(lastChat.next)
      }

      if(lastChat.role === 'robot' && lastChat.type === 'link') {
        Router.push(lastChat.link)
      }
    }
    
  }, [chats])

  return (
    <div className="robot-page">
      <div className="robot-panel">
        <ChatHead/>
        <ChatPanel/>
        <ChatInput/>
      </div>
    </div>
  )
}

const mapState = state => ({ ...state.robotModel })

const mapDispatch = state => ({ ...state.robotModel })

export default connect(mapState, mapDispatch)(Robot)