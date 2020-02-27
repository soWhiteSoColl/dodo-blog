import React, { useState } from 'react'
import { connect } from 'react-redux'
import SelectsPanel from '../SelectsPanel'
import './index.scss'

function ChatInput(props){
  const { status, selects, userReply } = props
  const [ selectsVisible, setSelectsVisible ] = useState(false)

  const handleSelectsChange = select => {
    userReply({ content: select.label, id: select.value })
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

      {status === 'inputing' &&
        <div className="robot-info-area">
          小寒正在输入中...
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
