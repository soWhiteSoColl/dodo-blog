import { useRef, useEffect } from 'react'

export default function useWillMount(callback) {
  const isMountRef = useRef(false)

  if(!isMountRef.current) {
    callback()
  }

  useEffect(() => {
    isMountRef.current = true

    return () => {
      isMountRef.current = false
    }
  }, [])
}