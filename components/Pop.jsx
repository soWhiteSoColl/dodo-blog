import React from 'react'

export default class Pop extends React.Component {
  handleMouseOver = e => {
    console.log(e.target)
  }

  handleMouseOut = e => {

  }

  render() {
    return (
      <div>
        {
          React.cloneElement(this.props.children, {
            onMouseOver: this.handleMouseOver,
            onMouseOut: this.handleMouseOut
          })
        }
      </div>
    )
  }
}