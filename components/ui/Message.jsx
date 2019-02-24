import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames'
import { getDOMById } from 'tools/main'

const messageRootId = 'do-message-root'
const defaulAnimationDuration = 300

class Message extends React.Component {
  render() {
    const { children, visible, type } = this.props

    return (
      <div className={classnames('do-message', visible ? 'do-message-animate-in' : 'do-message-animate-out', type)}>
        {children}
      </div>
    )
  }
}

const show = (message, type) => {
  ReactDOM.render(
    <Message visible={true} type={type}>
      {message}
    </Message>,
    getDOMById(messageRootId)
  )

  setTimeout(() => {
    ReactDOM.render(
      <Message visible={false} type={type}>
        {message}
      </Message>,
      getDOMById(messageRootId)
    )
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(getDOMById(messageRootId))
    }, defaulAnimationDuration + 50)
  }, 2000)
}

export default {
  success: message => show(message, 'success'),
  error: message => show(message, 'error'),
  info: message => show(message, 'info'),
  warning: message => show(message, 'warning')
}
