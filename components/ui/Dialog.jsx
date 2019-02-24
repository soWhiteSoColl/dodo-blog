import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames'
import { Button } from 'dodoui'
import Mask from './Mask'
import { getDOMById } from 'tools/main'

const dialogRootId = 'do-dialog-root'
const defaulAnimationDuration = 300

class Dialog extends React.Component {
  render() {
    const {
      children,
      title,
      visible,
      onCancel,
      onOk,
      noCancelBtn,
      animationDuration = defaulAnimationDuration,
      className,
      cancelBtnText,
      okBtnText
    } = this.props

    return (
      <div
        style={{ animationDuration: animationDuration / 1000 + 's' }}
        className={classnames('do-dialog', visible ? 'do-dialog-animate-in' : 'do-dialog-animate-out', className)}
      >
        <div className="do-dialog-head">
          <div className="do-dialog-title">{title}</div>
          <div className="do-dialog-cancel-btn" onClick={onCancel}>
            +
          </div>
        </div>
        <div className="do-dialog-content">{children}</div>
        <div className="do-dialog-footer">
          {!noCancelBtn && <Button onClick={onCancel}>{cancelBtnText || '取消'}</Button>}
          <Button type="primary" onClick={onOk}>
            {okBtnText || '确定'}
          </Button>
        </div>
      </div>
    )
  }
}

const open = option => {
  const props = { ...option }
  props.children = option.content

  const close = () => {
    ReactDOM.render(<Dialog {...props} visible={false} />, getDOMById(dialogRootId))
    Mask.hidden()
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(getDOMById(dialogRootId))
    }, defaulAnimationDuration + 50)
  }

  Mask.show()
  ReactDOM.render(
    <Dialog
      {...props}
      visible={true}
      onCancel={() => (props.onCancel ? props.onCancel(close) : close())}
      onOk={() => (props.onOk ? props.onOk(close) : close())}
    />,
    getDOMById(dialogRootId)
  )
}

export default {
  open
}
