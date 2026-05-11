'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type MagneticButtonProps = {
  children: React.ReactNode
  href?: string
  className?: string
  cursorLabel?: string
  size?: 'sm' | 'md'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function MagneticButton({
  children,
  href,
  className,
  cursorLabel = 'GO',
  size = 'md',
  ...props
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const baseClassName = cn(
    'group inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-transparent text-[var(--text)] transition-all duration-300 hover:border-[var(--text)]/30 hover:bg-[var(--text)]/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
    size === 'sm' ? 'px-4 py-2 text-xs tracking-[0.12em]' : 'px-5 py-3 text-sm',
    className
  )

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion || !ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    const x = event.clientX - bounds.left - bounds.width / 2
    const y = event.clientY - bounds.top - bounds.height / 2
    ref.current.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate3d(0,0,0)'
  }

  const content = (
    <>
      <span>{children}</span>
      <span className="text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
    </>
  )

  if (href) {
    return (
      <Link
        ref={ref}
        href={href}
        data-cursor-label={cursorLabel}
        className={baseClassName}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      ref={ref}
      data-cursor-label={cursorLabel}
      className={baseClassName}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {content}
    </button>
  )
}
