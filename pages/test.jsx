import React from 'react'
import { a } from 'tools/test'

export default class Text extends React.Component {
  componentDidMount() {
    console.log(a)

    setTimeout(() => {
      console.log(a)
    }, 2000)
  }

  render() {
    return (
      <div>Test</div>
    )
  }
}
