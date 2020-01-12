import React, { useRef, useEffect } from 'react'
import Router from 'next/router'
import { getLetters } from '../../utils/string-tools'
import './index.scss'

interface Props {
  content: string
  rendered?: boolean
}

export default function Typer(props: Props) {
  const { content, rendered } = props
  const containerRef = useRef<HTMLDivElement>(null)

  let timer = 0

  const handleType = async () => {
    const container = containerRef.current

    if (!container) return

    const letters = getLetters(content)
    const timeMap = { h1: 200, h2: 120, h3: 100, h4: 100, p: 60 }
    // const timeMap = { h1: 10, h2: 10, h3: 10, h4: 10, p: 10 }
    let currentLine: HTMLElement | null = null
    let currentHref: HTMLAnchorElement | null = null

    for (let i = 0; i < letters.length; i++) {
      const {
        type,
        content,
        isStart,
        isEnd,
        isHrefStart,
        isHrefEnd,
        href,
        isNewTarget,
      } = letters[i]
      const ms = timeMap[type]

      if (!rendered) {
        await new Promise(resolve => (timer = window.setTimeout(resolve, ms)))
      }

      if (isStart) {
        currentLine = document.createElement(type)
        container.appendChild(currentLine)
      }

      if (isHrefStart) {
        currentHref = document.createElement('a')
        if (isNewTarget) {
          currentHref.setAttribute('href', href)
          currentHref.setAttribute('target', '_new')
        } else {
          currentHref.setAttribute('data-href', href)
        }

        currentLine!.appendChild(currentHref)
      }

      if (currentHref) {
        currentHref.innerHTML += content
      } else {
        currentLine!.innerHTML += content
      }

      if (isHrefEnd) {
        currentHref = null
      }

      if (!rendered && isEnd) {
        await new Promise(resolve => (timer = window.setTimeout(resolve, ms)))
      }
    }
  }

  const handleArchorJump = e => {
    // @ts-ignore
    const dataHref = e.target && e.target.getAttribute('data-href')

    if (dataHref) {
      e.stopPropagation()
      Router.push(dataHref)
    }
  }

  useEffect(() => {
    handleType()
    document.addEventListener('click', handleArchorJump)

    return () => {
      clearInterval(timer)
      document.removeEventListener('click', handleArchorJump)
    }
  }, [])

  return <div className="c-typer" ref={containerRef}></div>
}
