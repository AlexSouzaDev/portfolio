'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Line {
  type: 'command' | 'response' | 'prompt'
  text: string
}

const INITIAL_LINES: Line[] = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'response', text: '  Alex De Souza — Founder & CTO, ImpulsoLead' },
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
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Staggered reveal of initial lines
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < INITIAL_LINES.length) {
        setVisibleCount(i + 1)
        i++
      } else {
        clearInterval(interval)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setLines(INITIAL_LINES.slice(0, visibleCount))
  }, [visibleCount])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines, loading])

  const sendMessage = async (msg: string) => {
    if (!msg.trim() || loading) return

    const userLine: Line = { type: 'prompt', text: `$ ${msg}` }
    setLines((prev) => [...prev, userLine])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      })

      if (!res.ok) throw new Error('Rate limited or server error')

      const data = await res.json() as { reply: string }
      const responseLines = data.reply
        .split('\n')
        .filter((l: string) => l.trim())
        .map((l: string) => ({ type: 'response' as const, text: `  ${l}` }))

      setLines((prev) => [...prev, ...responseLines])
    } catch {
      setLines((prev) => [
        ...prev,
        { type: 'response', text: '  [error] Could not reach the server. Try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full px-8 py-24" style={{ borderTop: '2px solid #2A2A2A' }}>
      {/* Section header */}
      <div
        className="flex items-baseline justify-between mb-10 pb-4"
        style={{ borderBottom: '2px solid #2A2A2A' }}
      >
        <h2
          className="font-display font-extrabold"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#F0EBE0' }}
        >
          ASK ME ANYTHING
        </h2>
        <span className="font-mono text-[11px]" style={{ color: '#888880' }}>
          [AI]
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Terminal panel */}
        <div
          className="w-full max-w-3xl mx-auto"
          style={{ border: '3px solid #2A2A2A' }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div
            className="flex items-center px-4 py-2 gap-3"
            style={{
              background: '#141414',
              borderBottom: '3px solid #FFE500',
            }}
          >
            <div className="flex gap-2">
              <span className="block w-3 h-3" style={{ background: '#FFE500' }} />
              <span className="block w-3 h-3" style={{ background: '#888880' }} />
              <span className="block w-3 h-3" style={{ background: '#2A2A2A' }} />
            </div>
            <span
              className="font-mono text-[11px] mx-auto"
              style={{ color: '#888880' }}
            >
              portfolio.sh — bash
            </span>
          </div>

          {/* Terminal body */}
          <div
            className="terminal-scroll overflow-y-auto p-6 flex flex-col gap-1"
            style={{
              maxHeight: '420px',
              background: '#0A0A0A',
            }}
          >
            {lines.map((line, i) => (
              <p
                key={i}
                className="font-mono text-[13px] leading-relaxed"
                style={{
                  color: line.type === 'prompt' ? '#FFE500' : '#888880',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {line.text}
              </p>
            ))}

            {loading && (
              <p className="font-mono text-[13px]" style={{ color: '#888880' }}>
                {'  '}
                <span className="cursor-blink">_</span>
              </p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input line */}
          <div
            className="flex items-center px-6 py-4 gap-2"
            style={{
              background: '#0A0A0A',
              borderTop: '1px solid #2A2A2A',
            }}
          >
            <span className="font-mono text-[13px]" style={{ color: '#FFE500' }}>
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage(input)
              }}
              placeholder="ask me anything..."
              className="flex-1 bg-transparent font-mono text-[13px] outline-none"
              style={{ color: '#F0EBE0', caretColor: '#FFE500' }}
              disabled={loading}
              aria-label="Terminal input — ask Alex anything"
            />
          </div>
        </div>

        <p
          className="text-center font-mono text-[11px] mt-4"
          style={{ color: '#2A2A2A' }}
        >
          Powered by Claude (claude-sonnet-4-6) — responds in character as Alex
        </p>
      </motion.div>
    </section>
  )
}
