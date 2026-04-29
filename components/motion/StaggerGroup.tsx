'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn, easeOutExpo } from '@/lib/utils'

export function StaggerGroup({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{
        hidden: {},
        show: reduceMotion
          ? { transition: { delayChildren: 0 } }
          : {
              transition: {
                delayChildren: 0.08,
                staggerChildren: 0.06,
                ease: easeOutExpo,
              },
            },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 80, filter: 'blur(12px)' },
        show: reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.9, ease: easeOutExpo },
            },
      }}
    >
      {children}
    </motion.div>
  )
}
