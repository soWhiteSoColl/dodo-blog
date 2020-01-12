import { useState, useEffect } from 'react'

export default function LoadingText() {
  const [dotNumber, setDotNumber] = useState(0)

  const dots = Array.from({ length: dotNumber })
    .map(() => '.')
    .join('')

  useEffect(() => {
    let dotNumber = 0

    const timer = setInterval(() => {
      dotNumber = dotNumber + 1 <= 6 ? dotNumber + 1 : 1
      setDotNumber(dotNumber)
    }, 200)

    return () => clearInterval(timer)
  }, [])

  return `加载中${dots}`
}
