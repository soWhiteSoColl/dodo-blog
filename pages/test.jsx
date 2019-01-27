import React from 'react'
import { RippleBlock } from 'dodo-ripple'


export default class Text extends React.Component {
  componentDidMount() {
    console.log(RippleBlock)
  }

  render() {
    return (
      <RippleBlock rippleColor="#39f" style={{width: 100, height: 200}}>
        123
      </RippleBlock>
    )
  }
}
