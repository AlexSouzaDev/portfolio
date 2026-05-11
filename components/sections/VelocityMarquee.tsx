'use client'

import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useState } from 'react'

const items = [
  'Founder energy',
  'Product strategy',
  'AI systems',
  'Next.js frontend',
  'Operational leverage',
  'Premium execution',
  'Founder-led SaaS',
  'Engineering depth',
]

export function VelocityMarquee() {
  const { scrollYProgress } = useScroll()
  const velocity = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [duration, setDuration] = useState(40)

  useMotionValueEvent(velocity, 'change', (latest) => {
    const next = Math.max(22, 40 - latest * 22)
    setDuration(next)
  })

  return (
    <section className="overflow-hidden border-y border-[var(--line)] py-4">
      <motion.div
        className="flex min-w-max gap-8 whitespace-nowrap text-[11px] uppercase tracking-[0.34em] text-[var(--muted)]"
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        <div className="marquee-track flex gap-8">
          {[...items, ...items, ...items].map((item, index) => (
            <span key={`${item}-${index}`} className="inline-flex items-center gap-8">
              {item}
              <span className="h-px w-4 bg-[var(--line)]" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
