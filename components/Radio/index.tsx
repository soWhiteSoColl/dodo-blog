import React from 'react'
import classnames from 'classnames'
import './index.scss'

interface RadioGroupProps {
  value: string | number | boolean
  children: React.ReactElement | React.ReactElement[]
  onChange?: Function
}

export function RadioGroup(props: RadioGroupProps) {
  const { children, value, onChange } = props
  return (
    <div className="radio-group">
      {React.Children.map(children, item => {
        const itemValue = item.props.value

        return React.cloneElement(item, {
          active: value === itemValue,
          onChange: () => onChange(itemValue),
        })
      })}
    </div>
  )
}

interface RadioProps {
  value?: string | number | boolean
  children?: React.ReactNode
  active?: boolean
  onChange?: Function
}

export default function Radio(props: RadioProps) {
  const { children, active, onChange } = props

  return (
    <div
      className={classnames('radio', active && 'active')}
      onClick={() => onChange(!active)}
    >
      <span className="radio-checked"></span>
      <div>{children}</div>
    </div>
  )
}
