import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Loading from '../Loading'
import './index.scss'

interface ChatItem {
  content: string
  role: string
  id: number
}

interface Props {
  chats: ChatItem[]
  status: string
}

function ChatPanel(props: Props){
  const { chats, status } = props

  return (
    <div className="chat-panel">
      <div className="chat-list">
        {chats.map(item => (
          <div key={item.id} className={classnames('chat-item', item.role)}>
            <div className="chat-content-wrapper">
              <div className="chat-content">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      
        {status === 'inputing' && 
          <div className={classnames('chat-item robot', status === 'inputing' && 'expand')}>
            <div className="chat-content-wrapper">
              <div className="chat-content">
                <Loading/>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}


const mapState = state => ({ ...state.robotModel })

const mapDispatch = state => ({ ...state.robotModel })

export default connect(mapState, mapDispatch)(ChatPanel)