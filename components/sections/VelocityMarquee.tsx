'use client'

import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useState } from 'react'

const items = [
  'Founder energy',
  'Premium execution',
  'AI systems',
  'Product strategy',
  'Next.js frontend',
  'Operational leverage',
]

export function VelocityMarquee() {
  const { scrollYProgress } = useScroll()
  const velocity = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [duration, setDuration] = useState(36)

  useMotionValueEvent(velocity, 'change', (latest) => {
    const next = Math.max(18, 36 - latest * 18)
    setDuration(next)
  })

  return (
    <section className="overflow-hidden border-y border-white/8 bg-white/[0.02] py-5">
      <motion.div
        className="flex min-w-max gap-6 whitespace-nowrap text-sm uppercase tracking-[0.34em] text-white/45"
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        <div className="marquee-track">
          {[...items, ...items, ...items].map((item, index) => (
            <span key={`${item}-${index}`} className="mx-3">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
