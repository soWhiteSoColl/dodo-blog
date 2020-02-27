import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import './index.scss'

interface Props {
  visible: boolean
  choose: { label: string, value: number }[]
  onChange: Function
  onCancel: Function
}

function SelectsPanel(props: Props){
  const { choose, onChange, visible, onCancel } = props
  const [ exist, setExist ] = useState(visible)

  useEffect(() => {
    let timer

    if(visible){
      setExist(true)
    } else {
      timer =  setTimeout(() => setExist(false), 250)
    }
    
    return () => clearTimeout(timer)
  }, [visible])

  return exist 
    ? (
      <div className={classnames('robot-selects-panel', visible ? 'show' : 'hidden')}>
        <div className="selects-list">
          {choose.map(item => {
            return (
              <div key={item.label} className="select-item" onClick={() => onChange(item)}>
                {item.label}
              </div>
            )
          })}
        </div>
        <div className="selects-panel-mask" onClick={() => onCancel()}></div>
      </div>
    )
    : null
}

export default React.memo(SelectsPanel)
