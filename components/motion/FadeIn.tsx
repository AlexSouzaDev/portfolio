'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn, easeOutExpo } from '@/lib/utils'
import type { RevealProps } from '@/types/site'

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 80,
}: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(12px)' }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  )
}
