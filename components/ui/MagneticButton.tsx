'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
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
    'group inline-flex items-center gap-3 rounded-full border border-cyan-200/25 bg-white/[0.06] text-white shadow-[0_18px_50px_rgba(3,9,23,0.28)] backdrop-blur-xl transition-colors hover:border-cyan-200/50 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60',
    size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3 text-sm sm:text-base',
    className
  )

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion || !ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    const x = event.clientX - bounds.left - bounds.width / 2
    const y = event.clientY - bounds.top - bounds.height / 2
    ref.current.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate3d(0,0,0)'
  }

  const content = (
    <>
      <span>{children}</span>
      <span className="text-white/45 transition-transform duration-300 group-hover:translate-x-1">↗</span>
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
