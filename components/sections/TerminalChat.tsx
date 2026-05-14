'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Line {
  type: 'command' | 'response' | 'prompt'
  text: string
}

const INITIAL_LINES: Line[] = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'response', text: '  Alex De Souza — Fullstack & AI Engineer, ImpulsoLead' },
  { type: 'prompt', text: '$ stack' },
  { type: 'response', text: '  Next.js · TypeScript · Python · Anthropic SDK · PostgreSQL · Redis' },
  { type: 'prompt', text: '$ products' },
  { type: 'response', text: '  impulsolead.com — AI SaaS for real estate (🇧🇷 Brazil)' },
  { type: 'response', text: '  impulsosearch.com — AI search layer, same ecosystem' },
  { type: 'prompt', text: '$ certs' },
  { type: 'response', text: '  Duke MLOps · IBM GenAI · Microsoft Full-Stack · Microsoft Cybersecurity' },
  { type: 'response', text: '  UoL Mathematics · CU Boulder SQL' },
  { type: 'prompt', text: '$ available?' },
  { type: 'response', text: '  Reviewing select projects. Drop a message below.' },
]

export function TerminalChat() {
  const [lines, setLines] = useState<Line[]>([])
  const [visibleCount, setVisibleCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < INITIAL_LINES.length) {
        setVisibleCount(i + 1)
        i++
      } else {
        clearInterval(interval)
      }
    }, 75)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setLines(INITIAL_LINES.slice(0, visibleCount))
  }, [visibleCount])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  return (
    <section
      id="ai"
      className="w-full px-8 py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Header */}
      <div
        className="flex items-baseline justify-between mb-10 pb-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-baseline gap-6">
          <h2
            className="font-display font-extrabold"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#F5F3EE' }}
          >
            ASK ME ANYTHING
          </h2>
          <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            [AI]
          </span>
        </div>
        <span className="font-mono text-[11px] hidden md:block" style={{ color: '#8A8A8A' }}>
          POWERED BY CLAUDE
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="w-full max-w-3xl mx-auto"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {/* Title bar */}
          <div
            className="flex items-center px-4 py-2.5 gap-3"
            style={{
              background: '#101010',
              borderBottom: '1px solid rgba(214,255,63,0.3)',
            }}
          >
            <div className="flex gap-1.5">
              <span className="block w-2.5 h-2.5 rounded-full" style={{ background: '#D6FF3F' }} />
              <span className="block w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
              <span className="block w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
            <span className="font-mono text-[11px] mx-auto" style={{ color: '#8A8A8A' }}>
              portfolio.sh — bash
            </span>
          </div>

          {/* Body */}
          <div
            ref={scrollRef}
            className="terminal-scroll overflow-y-auto p-6 flex flex-col gap-0.5"
            style={{ maxHeight: '400px', background: '#080808' }}
          >
            {lines.map((line, i) => (
              <p
                key={i}
                className="font-mono text-[12px] leading-[1.7]"
                style={{
                  color: line.type === 'prompt' ? '#D6FF3F' : '#8A8A8A',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {line.text}
              </p>
            ))}

          </div>
        </div>
      </motion.div>
    </section>
  )
}
