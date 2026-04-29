'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { easeOutExpo } from '@/lib/utils'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, filter: 'blur(10px)' }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18, filter: 'blur(10px)' }}
        transition={{ duration: 0.55, ease: easeOutExpo }}
        className="min-h-screen"
      >
        {!reduceMotion && (
          <motion.div
            initial={{ x: '-120%', rotate: -10 }}
            animate={{ x: '120%' }}
            transition={{ duration: 0.95, ease: easeOutExpo }}
            className="pointer-events-none fixed inset-y-0 left-[-20vw] z-[60] w-[48vw] bg-gradient-to-r from-cyan-300/8 via-white/10 to-transparent blur-2xl"
          />
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
