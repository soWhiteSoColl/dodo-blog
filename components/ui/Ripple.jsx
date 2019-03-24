import * as React from 'react'

const dur = 400
const ns = 'http://www.w3.org/2000/svg'

const createSvgEl = (name, attr) => {
  const el = document.createElementNS(ns, name)
  attr = attr || {}
  for (var key in attr) {
    el.setAttribute(key, attr[key])
  }
  return el
}

const createRipple = (x, y, r) => {
  const svg = createSvgEl('svg')
  const circle = createSvgEl('circle', {
    cx: x,
    cy: y,
    r: 0,
    fill: 'rgba(255, 255, 255, 0.4)'
  })
  const beignAnimate = createSvgEl('animate', {
    attributeName: 'r',
    to: r,
    dur: dur / 1000 + 's',
    fill: 'freeze',
    begin: 'indefinite'
  })
  const endAnimate = createSvgEl('animate', {
    attributeName: 'fill',
    to: 'rgba(255, 255, 255, 0)',
    dur: dur / 1000 + 's',
    fill: 'freeze',
    begin: 'indefinite'
  })
  circle.appendChild(beignAnimate)
  circle.appendChild(endAnimate)
  svg.appendChild(circle)
  return { el: svg, beginEl: beignAnimate, endEl: endAnimate }
}

export default class Ripple extends React.Component {
  ripples = React.createRef()

  createRipple = e => {
    const target = e.currentTarget
    const wrapper = this.ripples.current

    const { top, left, width: w, height: h } = target.getBoundingClientRect()

    const x = e.clientX - left
    const y = e.clientY - top

    const r =
      Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2)) + Math.sqrt(Math.pow(w / 2 - x, 2) + Math.pow(h / 2 - y, 2))

    const ripple = createRipple(x, y, r)
    const rippleSvg = ripple.el
    wrapper.appendChild(rippleSvg)
    ripple.beginEl.beginElement()

    const remove = () => {
      target.removeEventListener('mouseup', remove)
      ripple.endEl.beginElement()
      setTimeout(() => {
        wrapper.removeChild(rippleSvg)
      }, dur)
    }
    target.addEventListener('mouseup', remove)
  }
  render() {
    return <div className="ze-ripples-group" ref={this.ripples} />
  }
}
