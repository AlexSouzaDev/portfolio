'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type PressProps = {
  children: React.ReactNode
  className?: string
  /** Stagger, in milliseconds. */
  delay?: number
  /** `impression` settles a block in; `rule` draws a hairline from its left origin. */
  variant?: 'impression' | 'rule'
  as?: 'div' | 'section' | 'article' | 'header' | 'li' | 'p' | 'span'
}

/**
 * The impression.
 *
 * Content is rendered visible in the HTML. This applies the animatable
 * pre-state on the client, and only to elements that start below the
 * fold — so nothing flashes, nothing that has been scrolled past can be
 * stranded invisible, and a page without JS is a page that reads.
 */
export function Press({
  children,
  className,
  delay = 0,
  variant = 'impression',
  as: Tag = 'div',
}: PressProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return

    let observer: IntersectionObserver | null = null
    let failsafe = 0

    const release = () => {
      el.removeAttribute('data-press')
      observer?.disconnect()
      window.clearTimeout(failsafe)
    }

    el.setAttribute('data-press', '')

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) release()
      },
      { rootMargin: '0px 0px -6% 0px' }
    )
    observer.observe(el)

    // Whatever else happens, nothing stays hidden past four seconds.
    failsafe = window.setTimeout(release, 4000)

    return () => {
      observer?.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={cn(variant === 'rule' ? 'rule-draw' : 'press', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
