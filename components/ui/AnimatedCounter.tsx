'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function AnimatedCounter({
  value,
  suffix,
}: {
  value: number
  suffix?: string
  label: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!ref.current || !inView) return
    if (reduceMotion) {
      ref.current.textContent = `${value}${suffix ?? ''}`
      return
    }

    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${suffix ?? ''}`
        }
      },
    })

    return () => controls.stop()
  }, [inView, reduceMotion, suffix, value])

  return (
    <span
      ref={ref}
      className="block text-[clamp(4rem,8vw,7rem)] font-semibold leading-none tracking-[-0.07em] text-[var(--text)]"
    >
      0
    </span>
  )
}
