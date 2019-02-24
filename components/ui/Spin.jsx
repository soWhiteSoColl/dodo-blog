import React from 'react'

export const Loading = () => {
  return (
    <div className="do-loading">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}
export default class Spin extends React.PureComponent {
  render() {
    const { spinning = true, children } = this.props
    return spinning ? (
      <div className="do-spin">
        <Loading />
        {children}
      </div>
    ) : (
      children
    )
  }
}
