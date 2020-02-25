import React, { useState } from 'react'
import ChatPanel from './components/ChatPanel'
import './index.scss'

const chats = [
  {
    id: '1',
    type: 'list',
    q: 'Hello, 我是机器人小寒，需要我帮你什么呢？',
    a: ['2', '3', '4'],
  },
  {
    id: '2',
    type: 'link',
    q: '我想看博客',
    a: '/', 
  },
  {
    id: '3',
    type: 'link',
    q: '帮我给你的主人捎点话',
    a: '/contact',
  },
  {
    id: '4',
    type: 'list',
    q: '我想了解点小寒的小秘密',
    a: ['5', '6']
  }
]

export default function Robot(){
  const [ chats, setChats ] = useState([])

  return (
    <div className="robot-page">
      <div className="robot-chat-panel">
        <ChatPanel/>
      </div>
    </div>
  )
}