import { useState, useEffect } from 'react'

interface Props{
  text?: string
}

export default function LoadingText(props: Props) {
  const [dotNumber, setDotNumber] = useState(0)
  const { text = '加载中' } = props

  const dots = Array.from({ length: dotNumber })
    .map(() => '.')
    .join('')

  useEffect(() => {
    let dotNumber = 0

    const timer = setInterval(() => {
      dotNumber = dotNumber + 1 <= 3 ? dotNumber + 1 : 1
      setDotNumber(dotNumber)
    }, 200)

    return () => clearInterval(timer)
  }, [])

  return <>{`${text}${dots}`}</>
}
