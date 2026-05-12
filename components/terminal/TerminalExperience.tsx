'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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

const seedPrompts = [
  'what are you building right now?',
  'what kind of teams do you work best with?',
  'what makes your approach different?',
]

const initialReply = [
  { id: 'whoami', type: 'response' as const, text: 'Fullstack engineer. AI builder. Product-minded.' },
  {
    id: 'markets',
    type: 'response' as const,
    text: 'Currently focused on AI systems and SaaS products for real operational use.',
  },
]

export function TerminalExperience() {
  const reduceMotion = useReducedMotion()
  const [bootIndex, setBootIndex] = useState(0)
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [typingDots, setTypingDots] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (bootIndex >= bootLines.length) {
      setLines(initialReply)
      return
    }
    const timeout = window.setTimeout(() => setBootIndex((v) => v + 1), 280)
    return () => window.clearTimeout(timeout)
  }, [bootIndex])

  useEffect(() => {
    if (!loading) return
    const interval = window.setInterval(() => {
      setTypingDots((v) => (v + 1) % 4)
    }, 220)
    return () => window.clearInterval(interval)
  }, [loading])

  useEffect(() => {
    if (!bodyRef.current) return
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines, loading, bootIndex])

  const bootText = useMemo(() => bootLines.slice(0, bootIndex), [bootIndex])

  async function sendMessage(message: string) {
    const trimmed = message.trim()
    if (!trimmed || loading) return

    setLines((current) => [
      ...current,
      { id: crypto.randomUUID(), type: 'prompt', text: trimmed },
    ])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })

      if (!response.ok) throw new Error('Request failed')

      const data = (await response.json()) as { reply: string }
      const nextLines = data.reply
        .split('\n')
        .filter(Boolean)
        .map((line) => ({
          id: crypto.randomUUID(),
          type: 'response' as const,
          text: line,
        }))

      setLines((current) => [...current, ...nextLines])
    } catch {
      setLines((current) => [
        ...current,
        { id: crypto.randomUUID(), type: 'response', text: 'Link unstable. Ask again in a second.' },
      ])
    } finally {
      setLoading(false)
      setTypingDots(0)
      inputRef.current?.focus()
    }
  }

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-16 lg:py-28" id="ai-terminal">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="AI Terminal"
          title="A faster way to understand how Alex thinks, builds, and works."
          body="The interface is intentionally direct. Ask about products, systems, scope, or working style."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-none border border-[var(--line)] bg-[var(--bg-elevated)] p-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
              Suggested prompts
            </p>
            <div className="mt-5 space-y-2">
              {seedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="w-full border-b border-[var(--line)] py-4 text-left text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
                  data-cursor-label="OPEN"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.99 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
            className="overflow-hidden border border-[var(--line)] bg-[var(--bg-elevated)]"
            onClick={() => inputRef.current?.focus()}
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
                  <AnimatePresence>
                    {loading && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[var(--muted)]"
                      >
                        thinking{'.'.repeat(typingDots)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                void sendMessage(input)
              }}
              className="border-t border-[var(--line)] p-4"
            >
              <label htmlFor="terminal-input" className="sr-only">
                Ask Alex a question
              </label>
              <div className="flex items-center gap-3 border-b border-[var(--line)] pb-3 focus-within:border-[var(--text)]/30">
                <span className="font-mono text-[var(--muted)]">{'>'}</span>
                <input
                  id="terminal-input"
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, 500))}
                  placeholder="Ask about product, systems, AI, or availability"
                  className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--muted)]/40 focus:outline-none"
                  disabled={loading || bootIndex < bootLines.length}
                />
                <button
                  type="submit"
                  disabled={loading || bootIndex < bootLines.length}
                  className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors hover:text-[var(--text)] disabled:opacity-30"
                  data-cursor-label="SEND"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
