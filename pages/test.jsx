import React from 'react'

class Text extends React.Component {
  shouldComponentUpdate() {
    return true
  }

  render() {
    return <div>{this.props.name}</div>
  }
}
export default class Test extends React.Component {
  state = {
    name: 'hello'
  }

  render() {
    const { name } = this.state

    return <Text name={name} />
  }
}
