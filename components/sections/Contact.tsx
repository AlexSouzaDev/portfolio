'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'


const CHANNELS = [
  {
    label: 'EMAIL',
    href: 'mailto:alexandre@impulsolead.com',
    display: 'alexandre@impulsolead.com',
  },
  {
    label: 'LINKEDIN',
    href: 'https://linkedin.com/in/alexandre-de-souza',
    display: 'in/alexandre-de-souza',
  },
  {
    label: 'GITHUB',
    href: 'https://github.com/AlexSouzaDev',
    display: 'github.com/AlexSouzaDev',
  },
  {
    label: 'IMPULSOLEAD',
    href: 'https://impulsolead.com',
    display: 'impulsolead.com',
  },
]

function LiveClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const formatted = new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Lisbon',
      })
      setTime(formatted)
    }
    update()
    const interval = setInterval(update, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="flex items-center gap-2 mt-6 font-mono text-[11px]"
      style={{ color: '#8A8A8A' }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full pulse-dot flex-shrink-0"
        style={{ background: '#00C853' }}
      />
      {time} WET · Portugal — probably coding
    </div>
  )
}

export function Contact() {
  return (
    <section
      className="w-full"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Big CTA headline */}
      <div
        className="px-8 pt-20 pb-12"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.14em] mb-5"
              style={{ color: '#D6FF3F', opacity: 0.7 }}
            >
              CONTACT [05]
            </p>
            <h2
              className="font-display font-extrabold leading-[0.92]"
              style={{ fontSize: 'clamp(42px, 7vw, 88px)', color: '#F5F3EE' }}
            >
              NEED SOMEONE
              <br />
              WHO ACTUALLY
              <br />
              <span style={{ color: '#D6FF3F' }}>SHIPS?</span>
            </h2>
          </div>
          <div className="flex flex-col gap-2 font-mono text-[12px]" style={{ color: '#8A8A8A', maxWidth: '280px' }}>
            <p>Available for senior fullstack or AI engineering roles, and select freelance engagements.</p>
            <p className="mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Not interested in: spec work, unpaid trials, or &ldquo;exposure.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Two-column form */}
      <div
        className="grid px-8 py-16"
        style={{ gridTemplateColumns: '1fr 1fr', gap: '0' }}
      >
        {/* Left — direct contact */}
        <motion.div
          className="pr-12 flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[13px] leading-[1.85] mb-8" style={{ color: '#8A8A8A' }}>
            Send an email directly and I&apos;ll reply within 48 hours.
          </p>
          <a
            href="mailto:alexandre@impulsolead.com"
            className="w-full font-mono text-[12px] uppercase tracking-[0.1em] py-4 font-semibold text-center transition-all duration-150"
            style={{ background: '#D6FF3F', color: '#080808', border: '1px solid #D6FF3F', display: 'block' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#D6FF3F'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#D6FF3F'
              e.currentTarget.style.color = '#080808'
            }}
          >
            EMAIL ME →
          </a>
        </motion.div>

        {/* Right — channels */}
        <motion.div
          className="pl-12 flex flex-col"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col" style={{ gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
            {CHANNELS.map(({ label, href, display }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between px-5 py-4 font-mono transition-all duration-150 group"
                style={{ background: '#080808' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(214,255,63,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#080808'
                }}
              >
                <span
                  className="text-[11px] uppercase tracking-[0.1em] transition-colors duration-150"
                  style={{ color: '#F5F3EE' }}
                >
                  {label} ↗
                </span>
                <span className="text-[11px]" style={{ color: '#8A8A8A' }}>
                  {display}
                </span>
              </a>
            ))}
          </div>

          {/* Meta */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-3 font-mono text-[11px]" style={{ color: '#8A8A8A' }}>
              <span>RESPONSE TIME</span>
              <span style={{ color: '#D6FF3F' }}>Within 48 hours</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]" style={{ color: '#8A8A8A' }}>
              <span>AVAILABILITY</span>
              <span style={{ color: '#F5F3EE' }}>Reviewing select projects</span>
            </div>
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
            border-top: 1px solid rgba(255,255,255,0.06) !important;
            padding-left: 0 !important;
            padding-top: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}
