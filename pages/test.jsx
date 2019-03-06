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
    console.log(prevProps, prevState)
  }

  componentDidMount(prevProps, prevState) {
    console.log(prevProps, prevState)

    setTimeout(() => {
      this.setState({ name: 'world' })
    }, 2000)
  }

  render() {
    const { name } = this.state

    return <Text name={name} />
  }
}
