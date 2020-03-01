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
    const wordDelayMap = { h1: 300, h2: 140, h3: 200, h4: 100, p: 60 }
  
    let currentLine: HTMLElement | null = null
    let currentHref: HTMLAnchorElement | null = null
    let currentCursor: HTMLElement | null = null
    let currentSpan: HTMLElement | null = null

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

      const wordDelay = wordDelayMap[type]
      
      if (isStart) {
        currentLine = document.createElement(type)

        currentCursor = document.createElement('i')
        currentCursor.classList.add('cursor')

        currentSpan = document.createElement('span')

        currentLine.appendChild(currentSpan)
        currentLine.appendChild(currentCursor)
        container.appendChild(currentLine)
      }

      if (!rendered) {
        await new Promise(resolve => (timer = window.setTimeout(resolve, wordDelay)))
      }

      if(!currentLine) return

      if (isHrefStart) {
        currentHref = document.createElement('a')
        if (isNewTarget) {
          currentHref.setAttribute('href', href)
          currentHref.setAttribute('target', '_new')
        } else {
          currentHref.setAttribute('data-href', href)
        }

        currentSpan.appendChild(currentHref)
      }

      if (currentHref) {
        currentHref.innerHTML += content
      } else {
        currentSpan.innerHTML += content
      }

      if (isHrefEnd) {
        currentHref = null
      }

      if(isEnd) {
        currentLine.classList.add('wait')
        const lineDelay = parseInt((Math.random() * 600 + 400).toString())
        !rendered && await new Promise(resolve => (timer = window.setTimeout(resolve, lineDelay)))

        currentLine.classList.remove('wait')
        currentLine.removeChild(currentCursor)
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
