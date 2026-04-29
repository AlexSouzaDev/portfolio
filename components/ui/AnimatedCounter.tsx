'use client'

import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function AnimatedCounter({
  value,
  suffix,
  label,
}: {
  value: number
  suffix?: string
  label: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!ref.current || !inView) return
    if (reduceMotion) {
      ref.current.textContent = `${value}${suffix ?? ''}`
      return
    }

    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${suffix ?? ''}`
        }
      },
    })

    return () => controls.stop()
  }, [inView, reduceMotion, suffix, value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)]"
    >
      <span ref={ref} className="block text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
        0
      </span>
      <p className="mt-3 max-w-[18rem] text-sm leading-6 text-white/55">{label}</p>
    </motion.div>
  )
}
