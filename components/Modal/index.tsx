import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames'
import { getDOMById } from '../../utils/common'

const modalRootId = 'modal-root'
const transitionDuration = 450
let closeTimer = 0

const distroy = () => {
  ReactDOM.render(<Modal visible={false} />, getDOMById(modalRootId))

  closeTimer = window.setTimeout(
    () => ReactDOM.unmountComponentAtNode(getDOMById(modalRootId)),
    transitionDuration + 50
  )
}

const open = options => {
  const handleOk = options.onOk || distroy

  const handleCancel = options.onCancel || distroy

  ReactDOM.render(
    <Modal visible={true} onOk={handleOk} onCancel={handleCancel} />,
    getDOMById(modalRootId)
  )
  clearTimeout(closeTimer)
}

interface Props {
  title?: string
  visible?: boolean
  onCancel?: Function
  onOk?: Function
  className?: string
  children?: React.ReactNode
}

export default class Modal extends React.Component<Props> {
  static open = open

  render() {
    const { children, title, visible, onCancel, className } = this.props

    return ReactDOM.createPortal(
      <div
        className={classnames(
          'do-dialog',
          visible ? 'do-dialog-animate-in' : 'do-dialog-animate-out',
          className
        )}
      >
        <div className="do-dialog-head">
          <div className="do-dialog-title">{title}</div>
          <div className="do-dialog-cancel-btn" onClick={() => onCancel()}>
            +
          </div>
        </div>
        <div className="do-dialog-content">{children}</div>
        <div className="do-dialog-footer">
          <button onClick={() => onCancel()}>{'取消'}</button>>
          <button onClick={() => onCancel()}>{'确定'}</button>
        </div>
      </div>,
      getDOMById(modalRootId)
    )
  }
}
