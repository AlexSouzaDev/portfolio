'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Figure set.
 *
 * The count runs in oldstyle figures, so the varying ascenders and
 * descenders make it read as typeset rather than as a dashboard.
 * The final value is what renders server-side; the roll is added on
 * the client, and only for figures that start below the fold.
 */
export function Figure({
  value,
  suffix = '',
  className,
}: {
  value: number
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return

    let raf = 0
    let started = 0

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer.disconnect()

        const tick = (now: number) => {
          if (!started) started = now
          const p = Math.min((now - started) / 1400, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = `${Math.round(eased * value)}${p === 1 ? suffix : ''}`
          if (p < 1) raf = window.requestAnimationFrame(tick)
        }

        el.textContent = `0`
        raf = window.requestAnimationFrame(tick)
      },
      { rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(raf)
    }
  }, [value, suffix])

  return (
    <span
      ref={ref}
      className={cn(
        'figures-old block text-[clamp(3.4rem,7vw,6rem)] font-medium leading-none',
        className
      )}
    >
      {value}
      {suffix}
    </span>
  )
}
