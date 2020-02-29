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
  { text: '和小寒聊天', href: '/robot' },
]

export default function Navigator() {
  const [collapsed, setCollapsed] = useState(true)
  const [exist, setExist] = useState(false)
  const $toggle = useRef<HTMLDivElement>(null)
  const $panel = useRef<HTMLDivElement>(null)
  const $panelInfo = useRef({
    originTop: 0,
    originLeft: 0,
    originWidth: 0,
    originHeight: 0,
    maxRadius: 0,
  })

  const handleCollapse = () => {
    track('toggle-navigator', 'user-action', { collapsed: !collapsed })
    setCollapsed(!collapsed)
  }

  const caculatePostion = () => {
    if ($toggle.current) {
      const toggle = $toggle.current
      const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = toggle
      const { availWidth: w, availHeight: h } = window.screen
      
      $panelInfo.current = {
        originTop: offsetTop - 8,
        originLeft: offsetLeft - 8,
        originWidth: offsetWidth + 16,
        originHeight: offsetHeight + 16,
        maxRadius: parseInt(Math.sqrt(w * w + h * h).toString(), 10) + 10,
      }
    }
  }

  useEffect(() => {
    caculatePostion()

    window.addEventListener('resize', caculatePostion)

    Router.events.on('routeChangeComplete', () => setCollapsed(true))

    return () => {
      window.removeEventListener('resize', caculatePostion)
    } 
  }, [])

  useEffect(() => {
    if ($panel.current) {
      const panel = $panel.current
      const {
        originTop,
        originHeight,
        originLeft,
        originWidth,
        maxRadius,
      } = $panelInfo.current
      const { availWidth, availHeight } = window.screen

      if (collapsed) {
        panel.style.width = originWidth + 'px'
        panel.style.height = originHeight + 'px'
        panel.style.left = originLeft + 'px'
        panel.style.top = originTop + 'px'
      } else {
        panel.style.width = maxRadius + 'px'
        panel.style.height = maxRadius + 'px'
        panel.style.left = (-1 * (maxRadius - availWidth)) / 2 + 'px'
        panel.style.top = (-1 * (maxRadius - availHeight)) / 2 + 'px'
      }
    }

    !collapsed && setExist(true)
    collapsed && setTimeout(() => setExist(false), 300)
  }, [collapsed])

  return (
    <div className="navigator">
      <div
        ref={$toggle}
        className="navigator-collapsed-menu"
        onClick={handleCollapse}
      >
        <Icon type={collapsed ? 'menu' : 'close'} />
      </div>
      <div
        ref={$panel}
        className={classnames('navigator-panel', collapsed ? 'hidden' : 'show')}
      />
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
