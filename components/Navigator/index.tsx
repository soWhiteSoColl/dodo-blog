import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import classnames from 'classnames'
import Icon from '../Icon'
import { track } from '../../utils/common'
import './index.scss'

const links = [
  { text: '主页', href: '/home' },
  { text: '博客', href: '/' },
  { text: '留言板', href: '/contact' },
]

export default function Navigator() {
  const [collapsed, setCollapsed] = useState(true)
  const [exist, setExist] = useState(false)
  const $panel = useRef<HTMLDivElement>(null)
  const $panelInfo = useRef({
    originTop: 0,
    originRight: 0,
    originWidth: 0,
    originHeight: 0,
    maxRadius: 0,
  })

  const handleCollapse = () => {
    track('toggle-navigator', 'user-action', { collapsed: !collapsed })
    setCollapsed(!collapsed)
  }

  const caculatePostion = () => {
    if ($panel.current) {
      const panel = $panel.current
      const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = panel
      const { innerWidth } = window
      const { availWidth: w, availHeight: h } = window.screen

      $panelInfo.current = {
        originTop: offsetTop,
        originRight: innerWidth - offsetLeft - offsetWidth,
        originWidth: offsetWidth,
        originHeight: offsetHeight,
        maxRadius: parseInt(Math.sqrt(w * w + h * h).toString(), 10) + 10,
      }
    }
  }

  useEffect(() => {
    caculatePostion()

    Router.events.on('routeChangeComplete', () => {
      setCollapsed(true)
    })
  }, [])

  useEffect(() => {
    if ($panel.current) {
      const panel = $panel.current
      const {
        originTop,
        originHeight,
        originRight,
        originWidth,
        maxRadius,
      } = $panelInfo.current
      const { availWidth, availHeight } = window.screen

      if (collapsed) {
        panel.style.width = originWidth + 'px'
        panel.style.height = originHeight + 'px'
        panel.style.right = originRight + 'px'
        panel.style.top = originTop + 'px'
      } else {
        panel.style.width = maxRadius + 'px'
        panel.style.height = maxRadius + 'px'
        panel.style.right = (-1 * (maxRadius - availWidth)) / 2 + 'px'
        panel.style.top = (-1 * (maxRadius - availHeight)) / 2 + 'px'
      }
    }

    !collapsed && setExist(true)
    collapsed && setTimeout(() => setExist(false), 300)
  }, [collapsed])

  return (
    <div className="navigator">
      <div className="navigator-collapsed-menu" onClick={handleCollapse}>
        <Icon type={collapsed ? 'menu' : 'close'} />
      </div>
      <div
        ref={$panel}
        className={classnames('navigator-panel', collapsed ? 'hidden' : 'show')}
      ></div>
      {exist && (
        <div
          className={classnames(
            'navigator-links',
            collapsed ? 'hidden' : 'show'
          )}
        >
          {links.map(item => (
            <Link key={item.href} href={item.href}>
              <a>{item.text}</a>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
