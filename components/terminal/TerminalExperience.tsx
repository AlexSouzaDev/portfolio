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
  'Loading founder profile...',
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
  { id: 'whoami', type: 'response' as const, text: 'Founder. Engineer. Product builder.' },
  { id: 'markets', type: 'response' as const, text: 'Currently focused on AI systems and SaaS products for real operational use.' },
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

    const timeout = window.setTimeout(() => setBootIndex((value) => value + 1), 280)
    return () => window.clearTimeout(timeout)
  }, [bootIndex])

  useEffect(() => {
    if (!loading) return
    const interval = window.setInterval(() => {
      setTypingDots((value) => (value + 1) % 4)
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

    setLines((current) => [...current, { id: crypto.randomUUID(), type: 'prompt', text: trimmed }])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

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
    <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-28" id="ai-terminal">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="AI terminal"
          title="A faster way to understand how Alex thinks, builds, and works."
          body="The interface is intentionally direct. Ask about products, systems, scope, or working style."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-cyan-200/10 bg-slate-950/70 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.4)]">
            <p className="text-xs uppercase tracking-[0.26em] text-cyan-200/65">Suggested prompts</p>
            <div className="mt-5 space-y-3">
              {seedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left text-sm text-white/72 transition hover:border-cyan-200/30 hover:bg-white/[0.06]"
                  data-cursor-label="OPEN"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 30, scale: 0.985 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
            className="overflow-hidden rounded-[2.2rem] border border-cyan-200/12 bg-slate-950/95 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center justify-between border-b border-cyan-200/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-300/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
              </div>
              <div className="font-mono text-xs tracking-[0.24em] text-white/45">
                alexos://terminal
              </div>
              <div className="text-xs uppercase tracking-[0.24em] text-cyan-200/55">
                online
              </div>
            </div>

            <div
              ref={bodyRef}
              className="terminal-scrollbar h-[420px] overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(151,241,255,0.06),transparent_35%),linear-gradient(180deg,#07111f_0%,#040913_100%)] px-5 py-6 font-mono text-[13px] leading-7 sm:px-6"
            >
              <div className="space-y-1 text-cyan-100/80">
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
                          ? 'text-cyan-200'
                          : line.type === 'system'
                            ? 'text-white/44'
                            : 'text-white/70'
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
                        className="text-white/45"
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
              className="border-t border-cyan-200/10 bg-white/[0.02] p-4"
            >
              <label htmlFor="terminal-input" className="sr-only">
                Ask Alex a question
              </label>
              <div className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-4 py-3 focus-within:border-cyan-200/35 focus-within:shadow-[0_0_0_1px_rgba(151,241,255,0.18)]">
                <span className="font-mono text-cyan-200">{'>'}</span>
                <input
                  id="terminal-input"
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, 500))}
                  placeholder="Ask about product, systems, AI, or availability"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/28 focus:outline-none"
                  disabled={loading || bootIndex < bootLines.length}
                />
                <button
                  type="submit"
                  disabled={loading || bootIndex < bootLines.length}
                  className="rounded-full border border-cyan-200/20 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100 transition hover:border-cyan-200/45 disabled:opacity-40"
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
