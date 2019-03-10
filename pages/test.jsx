import React from 'react'

class Text extends React.Component {
  shouldComponentUpdate(nextProps) {
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

  componentDidUpdate(prevProps, prevState) {
    console.log('did update')
  }

  componentDidMount(prevProps, prevState) {
    console.log('did mount')

    if (!this.updated) {
      this.updated = true
      this.forceUpdate()
    }
  }

  render() {
    const { name } = this.state

    return <Text name={name} />
  }
}
