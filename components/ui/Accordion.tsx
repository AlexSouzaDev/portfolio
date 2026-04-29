'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { easeOutExpo } from '@/lib/utils'

export function Accordion({
  items,
}: {
  items: Array<{ title: string; body: string }>
}) {
  const [open, setOpen] = useState(0)

  return (
    <div className="divide-y divide-white/10 rounded-[2rem] border border-white/10 bg-white/[0.03]">
      {items.map((item, index) => {
        const isOpen = open === index
        return (
          <div key={item.title} className="px-5 py-3 sm:px-7 sm:py-4">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 py-3 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-medium tracking-[-0.03em] text-white">{item.title}</span>
              <span className="text-white/45">{isOpen ? '−' : '+'}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-sm leading-7 text-white/60">{item.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
