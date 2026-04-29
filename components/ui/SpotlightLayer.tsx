'use client'

import { useEffect, useRef } from 'react'
import { supportsHover } from '@/lib/utils'

export function SpotlightLayer() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!supportsHover()) return
    const element = ref.current
    if (!element) return

    const onMove = (event: MouseEvent) => {
      element.style.setProperty('--spotlight-x', `${event.clientX}px`)
      element.style.setProperty('--spotlight-y', `${event.clientY}px`)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return <div ref={ref} aria-hidden className="spotlight-layer" />
}
