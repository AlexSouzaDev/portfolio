'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CHANNELS = [
  { label: 'EMAIL ↗', href: 'mailto:alexandre@impulsolead.com', display: 'alexandre@impulsolead.com' },
  { label: 'LINKEDIN ↗', href: 'https://linkedin.com/in/alexandre-de-souza', display: 'in/alexandre-de-souza' },
  { label: 'GITHUB ↗', href: 'https://github.com/AlexSouzaDev', display: 'github.com/AlexSouzaDev' },
  { label: 'IMPULSOLEAD ↗', href: 'https://impulsolead.com', display: 'impulsolead.com' },
]

function LiveClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Lisbon',
      })
      setTime(formatted)
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <p className="font-mono text-[11px] mt-6" style={{ color: '#888880' }}>
      Currently {time} WET (Portugal) — I&apos;m probably coding.
    </p>
  )
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [charCount, setCharCount] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const fieldStyle = {
    background: '#0D0D0D',
    border: '2px solid #2A2A2A',
    color: '#F0EBE0',
    fontFamily: 'var(--font-jetbrains), monospace',
    fontSize: '14px',
    padding: '12px',
    outline: 'none',
    width: '100%',
  }

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#FFE500'
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = '#2A2A2A'
  }

  return (
    <section className="w-full px-8 py-24" style={{ borderTop: '2px solid #2A2A2A' }}>
      {/* Section header */}
      <div className="mb-10">
        <h2
          className="font-display font-extrabold"
          style={{ fontSize: 'clamp(48px, 7vw, 64px)', color: '#F0EBE0' }}
        >
          LET&apos;S BUILD.
        </h2>
        <div
          className="flex items-baseline justify-between pb-4 mt-2"
          style={{ borderBottom: '2px solid #2A2A2A' }}
        >
          <p
            className="font-mono text-[15px] leading-relaxed"
            style={{ color: '#888880', maxWidth: '600px' }}
          >
            Available for founding engineer roles, technical co-founder conversations,
            and select freelance engagements.
            <br />
            <br />
            Not interested in: spec work, unpaid trials, or &ldquo;exposure.&rdquo;
          </p>
          <span className="font-mono text-[11px]" style={{ color: '#888880' }}>
            [05]
          </span>
        </div>
      </div>

      {/* Two-column layout */}
      <div
        className="grid"
        style={{ gridTemplateColumns: '1fr 1fr', gap: '0' }}
      >
        {/* Left — form */}
        <motion.div
          className="pr-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="NAME"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onFocus={onFocus}
              onBlur={onBlur}
              required
              aria-label="Your name"
              style={fieldStyle}
            />
            <input
              type="email"
              placeholder="EMAIL"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={onFocus}
              onBlur={onBlur}
              required
              aria-label="Your email"
              style={fieldStyle}
            />
            <div className="relative">
              <textarea
                placeholder="MESSAGE"
                value={form.message}
                onChange={(e) => {
                  const val = e.target.value.slice(0, 500)
                  setForm({ ...form, message: val })
                  setCharCount(val.length)
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                required
                rows={6}
                maxLength={500}
                aria-label="Your message"
                style={{ ...fieldStyle, resize: 'none' }}
              />
              <span
                className="absolute bottom-2 right-3 font-mono text-[11px]"
                style={{ color: '#888880' }}
              >
                {charCount}/500
              </span>
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="w-full font-mono text-[13px] uppercase tracking-wider py-4 transition-all duration-[120ms]"
              style={{
                background: status === 'sent' ? '#0D0D0D' : '#FFE500',
                color: status === 'sent' ? '#FFE500' : '#0D0D0D',
                border: '2px solid #FFE500',
              }}
              onMouseEnter={(e) => {
                if (status !== 'sent') {
                  e.currentTarget.style.background = '#0D0D0D'
                  e.currentTarget.style.color = '#FFE500'
                }
              }}
              onMouseLeave={(e) => {
                if (status !== 'sent') {
                  e.currentTarget.style.background = '#FFE500'
                  e.currentTarget.style.color = '#0D0D0D'
                }
              }}
            >
              {status === 'sent'
                ? '✓ SENT — I\'LL RESPOND WITHIN 48H'
                : status === 'sending'
                ? 'SENDING...'
                : 'SEND MESSAGE →'}
            </button>

            {status === 'error' && (
              <p className="font-mono text-[12px]" style={{ color: '#FF2D00' }}>
                Something went wrong. Email me directly.
              </p>
            )}
          </form>
        </motion.div>

        {/* Right — channels */}
        <motion.div
          className="pl-12 flex flex-col"
          style={{ borderLeft: '2px solid #2A2A2A' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.3, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col">
            {CHANNELS.map(({ label, href, display }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between px-5 py-4 font-mono transition-all duration-[120ms]"
                style={{ border: '2px solid #2A2A2A', marginTop: '-2px' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = '#FFE500'
                  el.style.transform = 'translate(-2px, -2px)'
                  el.style.boxShadow = '2px 2px 0px #FFE500'
                  el.style.zIndex = '1'
                  el.style.position = 'relative'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = '#2A2A2A'
                  el.style.transform = ''
                  el.style.boxShadow = 'none'
                }}
              >
                <span className="text-[12px] uppercase tracking-wider" style={{ color: '#F0EBE0' }}>
                  {label}
                </span>
                <span className="text-[12px]" style={{ color: '#888880' }}>
                  {display}
                </span>
              </a>
            ))}
          </div>

          <LiveClock />
        </motion.div>
      </div>

      {/* Mobile override */}
      <style jsx>{`
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
          .grid > div:first-child {
            padding-right: 0 !important;
            margin-bottom: 2rem !important;
          }
          .grid > div:last-child {
            border-left: none !important;
            border-top: 2px solid #2A2A2A !important;
            padding-left: 0 !important;
            padding-top: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}
