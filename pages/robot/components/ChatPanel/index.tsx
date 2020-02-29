import React, { useEffect, useRef } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import Loading from '../Loading'
import { ChatItem } from '../../../../utils/chats-parser'
import './index.scss'


interface Props {
  chats: ChatItem[]
  status: string
}

function renderContent(content, key = 0){
  if(content.type) {
    const { type, src = '', text = '', href = '' } = content
    if(type === 'img') {
      return <img src={src} key={key} />
    }

    if(type === 'link') {
      return <a href={href} key={key} target={'_new'}>{text}</a>
    }

    if(type === 'text') {
      return <span>{text}</span>
    }

    if(type === 'label') {
      return <span>{text}</span>
    }
  }

  if(content instanceof Array) {
    return content.map((item, index) => renderContent(item, index))
  }
}

function mapStatusToZh(status){
  return {
    offline: '对方已离线',
    online: '对方已上线',
  }[status]
}

function ChatPanel(props: Props){
  const { chats, status } = props
  const $chatPanelRef = useRef<HTMLDivElement>(null)
  const $chatListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let timer
    if($chatPanelRef && $chatListRef) {
      const height = $chatListRef.current.offsetHeight
      timer = setTimeout(() => $chatPanelRef.current.scrollTo(0, height), 0)
    }

    return () => clearTimeout(timer)
  }, [chats])

 
  return (
    <div className="chat-panel" ref={$chatPanelRef}>
      <div className="chat-list" ref={$chatListRef}>
        {chats.map(({ content, role, id }, index) => {
          const isStatus = typeof content !== 'string' 
            && !(content instanceof Array)
            && content.type === 'status'

          if(isStatus) {
            const status = (content as any).status
            return (
              <div key={`${id}-${index}`} className={classnames('chat-status', status)}>
                {mapStatusToZh(status)}
              </div>
            )
          }

          return (
            <div key={id} className={classnames('chat-item', role)}>
              <div className="chat-content-wrapper">
                <div className="chat-content">
                  {renderContent(content)}
                </div>
              </div>
            </div>
          )
        })}

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