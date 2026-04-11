'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Yellow overlay slice — enters from left, exits right */}
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none origin-left"
          style={{ background: '#FFE500' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 0.4,
            times: [0, 0.4, 0.6, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
