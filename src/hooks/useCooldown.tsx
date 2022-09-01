import { useEffect, useRef, useState } from 'react'

export const useCooldown = (ms = 1000) => {
  const [isCooldown, setIsCooldown] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const setCooldown = () => {
    setIsCooldown(true)
    timeoutRef.current = setTimeout(() => setIsCooldown(false), ms)
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return [isCooldown, setCooldown] as const
}
