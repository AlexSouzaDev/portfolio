'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    const rotateX = ((y / bounds.height) - 0.5) * -8
    const rotateY = ((x / bounds.width) - 0.5) * 10
    ref.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0,-6px,0)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)'
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        'transition-transform duration-300 will-change-transform',
        className
      )}
      data-cursor-label="VIEW"
    >
      {children}
    </motion.div>
  )
}
