'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { easeOutExpo } from '@/lib/utils'

type Line = {
  id: string
  type: 'system' | 'prompt' | 'response'
  text: string
}

const bootLines = [
  'Booting AlexOS...',
  'Loading engineer profile...',
  'Syncing systems...',
  'AI ready.',
  '>',
]

const initialReply: Line[] = [
  { id: 'whoami', type: 'response', text: 'Fullstack engineer. AI builder. Product-minded.' },
  {
    id: 'markets',
    type: 'response',
    text: 'Currently focused on AI systems and SaaS products for real operational use.',
  },
]

export function TerminalExperience() {
  const reduceMotion = useReducedMotion()
  const [bootIndex, setBootIndex] = useState(0)
  const [lines] = useState<Line[]>(initialReply)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bootIndex >= bootLines.length) return
    const timeout = window.setTimeout(() => setBootIndex((v) => v + 1), 280)
    return () => window.clearTimeout(timeout)
  }, [bootIndex])

  useEffect(() => {
    if (!bodyRef.current) return
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines, bootIndex])

  const bootText = useMemo(() => bootLines.slice(0, bootIndex), [bootIndex])

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-16 lg:py-28" id="ai-terminal">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="AI Terminal"
          title="A faster way to understand how Alex thinks, builds, and works."
          body="The interface is intentionally direct. Ask about products, systems, scope, or working style."
        />

        <div className="mt-14">
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.99 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
            className="overflow-hidden border border-[var(--line)] bg-[var(--bg-elevated)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--muted)]/40" />
                <span className="h-2 w-2 rounded-full bg-[var(--muted)]/40" />
                <span className="h-2 w-2 rounded-full bg-[var(--muted)]/40" />
              </div>
              <div className="font-mono text-[11px] tracking-[0.22em] text-[var(--muted)]">
                alexos://terminal
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                online
              </div>
            </div>

            <div
              ref={bodyRef}
              className="terminal-scrollbar h-[400px] overflow-y-auto bg-[var(--bg-elevated)] px-5 py-5 font-mono text-[13px] leading-7 sm:px-6"
            >
              <div className="space-y-1 text-[var(--muted)]">
                {bootText.map((line, index) => (
                  <p key={`${line}-${index}`}>{line}</p>
                ))}
              </div>
              {bootIndex >= bootLines.length ? (
                <div className="mt-4 space-y-2">
                  {lines.map((line) => (
                    <p
                      key={line.id}
                      className={
                        line.type === 'prompt'
                          ? 'text-[var(--text)]'
                          : line.type === 'system'
                            ? 'text-[var(--muted)]/50'
                            : 'text-[var(--text)]/70'
                      }
                    >
                      {line.type === 'prompt' ? `> ${line.text}` : line.text}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
