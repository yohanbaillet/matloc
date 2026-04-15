'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type Props = {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

export default function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  duration = 1800,
}: Props) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true

    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}
