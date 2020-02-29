import React, { useState } from 'react'
import { connect } from 'react-redux'
import SelectsPanel from '../SelectsPanel'
import './index.scss'

function mapStatusToZh(status) {
  return {
    offline: '小寒已离线...',
    action: '小寒操作中...',
    inputing: '小寒正在输入中...'
  }[status]
}
function ChatInput(props){
  const { status, selects, userReply } = props
  const [ selectsVisible, setSelectsVisible ] = useState(false)

  const handleSelectsChange = id => {
    userReply(id)
    setSelectsVisible(false)
  }

  const handleSelectCancel = () => {
    setSelectsVisible(false)
  }

  const handleShowSelect = () => {
    setSelectsVisible(true)
  }

  return (
    <>
      {status === 'waiting' && 
        <div className="robot-input-area" onClick={handleShowSelect}>
          请输入...
        </div>
      }

      {status !== 'waiting' &&
        <div className="robot-info-area">
          {mapStatusToZh(status)}
        </div>
      }

      <SelectsPanel
        choose={selects}
        visible={selectsVisible}
        onChange={handleSelectsChange}
        onCancel={handleSelectCancel}
      />
    </>
  )
}

const mapState = state => ({ ...state.robotModel })

const mapDispatch = state => ({ ...state.robotModel })

export default connect(mapState, mapDispatch)(ChatInput)
