import React from 'react'
import classnames from 'classnames'
import './index.scss'

const customIconMap = {
  pause: 'M26 15 8 4 8 26 26 15 26 15',
  play: 'M5 5 5 25 25 25 25 5 5 5',
  'left-arrow': 'M 20 5 10 15 20 25',
  'right-arrow': 'M 10 5 20 15 10 25',
  'top-arrow': 'M 5 20 15 10 25 20',
  menu: 'M5 7 25 7  M5 15 25 15 M5 23 25 23',
  close: 'M7 7 23 23 M15 15 15 15 M23 7 7 23',
  bars: 'M5 25 5 15 M15 25 15 10 M25 25 25 5',
  search: 'M24 22 A10 10 0 1 0 24 24 L26 26z',
}

interface Props {
  type: string
  active?: boolean
  className?: string
}
export default class SvgIcon extends React.Component<Props> {
  render() {
    const { type, className, active, ...rest } = this.props

    return (
      <span
        className={classnames(
          'svg-icon-wrapper',
          className,
          active && 'active'
        )}
      >
        <svg
          {...rest}
          className={classnames('svg-icon', type && 'svg-icon-' + type)}
        >
          <path d={customIconMap[type]} />
        </svg>
      </span>
    )
  }
}
