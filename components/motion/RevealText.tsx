'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn, easeOutExpo } from '@/lib/utils'

export function RevealText({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  const words = children.split(' ')

  if (reduceMotion) {
    return <span className={className}>{children}</span>
  }

  return (
    <span className={cn('block', className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.3em] inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.035, ease: easeOutExpo }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
