'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const WORDS = ['BUILDS.', 'SHIPS.', 'ARCHITECTS.', 'SOLVES.']

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative w-full min-h-screen grid"
      style={{
        gridTemplateColumns: '58% 42%',
      }}
    >
      {/* Noise texture SVG */}
      <svg className="noise-overlay" aria-hidden="true">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Vertical divider */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: '58%',
          width: '2px',
          background: '#2A2A2A',
        }}
        aria-hidden="true"
      />

      {/* Left column */}
      <motion.div
        className="flex flex-col justify-center px-12 py-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Label */}
        <p
          className="font-mono text-[11px] uppercase tracking-[0.12em] mb-8 flex items-center gap-1"
          style={{ color: '#888880' }}
        >
          FOUNDER &amp; CTO — IMPULSOLEAD / ALEXSOUZA.DEV
          <span className="cursor-blink">|</span>
        </p>

        {/* Main headline */}
        <div
          className="font-display font-extrabold leading-[0.92] select-none"
          style={{
            fontSize: 'clamp(64px, 9vw, 112px)',
            color: '#F0EBE0',
          }}
        >
          <div>ALEX</div>
          <div className="relative h-[1.1em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                className="absolute inset-0 block"
                style={{ color: '#FFE500' }}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Pitch */}
        <p
          className="font-mono text-[16px] leading-relaxed mt-7"
          style={{ color: '#888880', maxWidth: '480px' }}
        >
          Founder &amp; CTO building AI-powered SaaS in Portugal.
          <br />
          Currently shipping ImpulsoLead for the 🇧🇷 real estate market.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 mt-10">
          <Link
            href="/work"
            className="font-mono text-[13px] uppercase tracking-wider px-6 py-3 transition-all duration-[120ms]"
            style={{
              background: '#FFE500',
              color: '#0D0D0D',
              border: '2px solid #FFE500',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = '#0D0D0D'
              el.style.color = '#FFE500'
              el.style.boxShadow = '4px 4px 0px #FFE500'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = '#FFE500'
              el.style.color = '#0D0D0D'
              el.style.boxShadow = 'none'
            }}
          >
            SEE MY WORK →
          </Link>
          <Link
            href="/contact"
            className="font-mono text-[13px] uppercase tracking-wider px-6 py-3 transition-all duration-[120ms]"
            style={{
              background: 'transparent',
              color: '#F0EBE0',
              border: '2px solid #F0EBE0',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = '#F0EBE0'
              el.style.color = '#0D0D0D'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'transparent'
              el.style.color = '#F0EBE0'
            }}
          >
            GET IN TOUCH
          </Link>
        </div>

        {/* Data pills */}
        <div className="flex flex-wrap gap-3 mt-8">
          {[
            { label: '↗ 2 LIVE SAAS PRODUCTS', href: '/work' },
            { label: '↗ IMPULSOLEAD.COM', href: 'https://impulsolead.com' },
            { label: '↗ IMPULSOSEARCH.COM', href: 'https://impulsosearch.com' },
            { label: '↗ GITHUB', href: 'https://github.com/AlexSouzaDev' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-mono text-[12px] px-3 py-1.5 transition-colors duration-[120ms]"
              style={{
                border: '1px solid #2A2A2A',
                color: '#888880',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFE500'
                e.currentTarget.style.color = '#FFE500'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2A2A2A'
                e.currentTarget.style.color = '#888880'
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Right column — photo */}
      <div className="flex items-center justify-center px-12 py-20 relative z-10">
        <motion.div
          className="relative"
          initial={{ rotate: -8, y: 30, opacity: 0 }}
          animate={{ rotate: -2, y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Photo frame */}
          <div
            className="relative overflow-hidden group"
            style={{
              border: '3px solid #2A2A2A',
              transform: 'rotate(-2deg)',
              width: 'min(360px, 80%)',
              aspectRatio: '3/4',
            }}
          >
            <Image
              src="/photo.jpg"
              alt="Alex De Souza — Founder & CTO"
              fill
              className="object-cover transition-all duration-300"
              style={{ filter: 'grayscale(100%) contrast(1.05)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'none'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(100%) contrast(1.05)'
              }}
              sizes="360px"
              priority
            />
          </div>

          {/* Floating badge */}
          <div
            className="absolute font-mono text-[11px] uppercase tracking-widest px-3 py-1.5"
            style={{
              bottom: '-12px',
              right: '-12px',
              background: '#FFE500',
              color: '#0D0D0D',
              border: '2px solid #0D0D0D',
              transform: 'rotate(2deg)',
            }}
          >
            CTO @ 2024
          </div>
        </motion.div>
      </div>

      {/* Mobile layout override */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          section > div:nth-child(3) {
            padding: 60px 24px 40px !important;
          }
          section > div:nth-child(4) {
            padding: 20px 24px 60px !important;
          }
        }
      `}</style>
    </section>
  )
}
