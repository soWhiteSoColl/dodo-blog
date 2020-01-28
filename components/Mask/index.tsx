import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames'
import { getDOMById } from '../../utils/common'

let closeTimer = null
const maskId = 'do-mask-root'
const transitionDuration = 600

const show = () => {
  ReactDOM.render(<Mask visible={true} />, getDOMById(maskId))
  clearTimeout(closeTimer)
}

const hidden = () => {
  ReactDOM.render(<Mask visible={false} />, getDOMById(maskId))

  closeTimer = setTimeout(
    () => ReactDOM.unmountComponentAtNode(getDOMById(maskId)),
    transitionDuration + 50
  )
}

interface Props {
  visible: boolean
}

class Mask extends React.Component<Props> {
  static show = show

  static hidden = hidden

  render() {
    const { visible = true } = this.props
    return (
      <div
        className={classnames(
          'do-mask',
          visible ? 'animate-fade-in' : 'animate-fade-out'
        )}
      />
    )
  }
}

export default Mask
