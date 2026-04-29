'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const PHRASES = ['PRODUCTS.', 'SYSTEMS.', 'REVENUE.', 'LEVERAGE.']

const BADGES = [
  'Portugal / Europe',
  'Available Worldwide',
  'Building Since 2020',
  'Open for Select Projects',
]

export function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PHRASES.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      className="relative w-full min-h-screen"
      style={{
        display: 'grid',
        gridTemplateColumns: '58% 42%',
      }}
    >
      {/* Noise texture */}
      <svg className="noise-overlay" aria-hidden="true">
        <filter id="hero-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* Vertical divider */}
      <div
        className="absolute top-0 bottom-0 hidden md:block"
        style={{
          left: '58%',
          width: '1px',
          background: 'rgba(255,255,255,0.05)',
        }}
        aria-hidden="true"
      />

      {/* Left column */}
      <motion.div
        className="flex flex-col justify-center px-12 py-24 relative z-10"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Status label */}
        <p
          className="font-mono text-[11px] uppercase tracking-[0.14em] mb-10 flex items-center gap-2.5"
          style={{ color: '#8A8A8A' }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 pulse-dot"
            style={{ background: '#D6FF3F' }}
          />
          FOUNDER &amp; CTO — IMPULSOLEAD
          <span className="cursor-blink ml-0.5">|</span>
        </p>

        {/* Main headline */}
        <div
          className="font-display font-extrabold select-none"
          style={{
            fontSize: 'clamp(64px, 10vw, 148px)',
            lineHeight: 0.9,
            color: '#F5F3EE',
          }}
        >
          <div>I BUILD</div>
          <div
            className="relative overflow-hidden"
            style={{ height: '1.06em' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                className="absolute inset-0 block"
                style={{ color: '#D6FF3F' }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              >
                {PHRASES[idx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Sub */}
        <p
          className="font-mono text-[15px] leading-[1.85] mt-9"
          style={{ color: '#8A8A8A', maxWidth: '460px' }}
        >
          Building AI-powered SaaS from Portugal.
          <br />
          Currently shipping ImpulsoLead for the{' '}
          <span style={{ color: '#F5F3EE' }}>🇧🇷 real estate market.</span>
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-3 mt-10">
          <Link
            href="/work"
            className="font-mono text-[12px] uppercase tracking-[0.1em] px-5 py-3 font-semibold transition-all duration-150"
            style={{ background: '#D6FF3F', color: '#080808' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = '#bfed30'
              el.style.transform = 'translate(-2px, -2px)'
              el.style.boxShadow = '2px 2px 0 rgba(0,0,0,0.3)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = '#D6FF3F'
              el.style.transform = ''
              el.style.boxShadow = 'none'
            }}
          >
            VIEW WORK →
          </Link>

          <Link
            href="/contact"
            className="font-mono text-[12px] uppercase tracking-[0.1em] px-5 py-3 transition-all duration-150"
            style={{
              background: 'transparent',
              color: '#F5F3EE',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(255,255,255,0.35)'
              el.style.background = 'rgba(255,255,255,0.04)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(255,255,255,0.15)'
              el.style.background = 'transparent'
            }}
          >
            BOOK A CALL
          </Link>

          <a
            href="#ai"
            className="font-mono text-[12px] uppercase tracking-[0.1em] px-5 py-3 transition-all duration-150"
            style={{
              background: 'transparent',
              color: '#D6FF3F',
              border: '1px solid rgba(214,255,63,0.25)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'rgba(214,255,63,0.07)'
              el.style.borderColor = 'rgba(214,255,63,0.55)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'transparent'
              el.style.borderColor = 'rgba(214,255,63,0.25)'
            }}
          >
            ASK MY AI ↗
          </a>
        </div>

        {/* Meta badges */}
        <div className="flex flex-wrap gap-2 mt-8">
          {BADGES.map((badge) => (
            <span
              key={badge}
              className="font-mono text-[10px] uppercase tracking-[0.1em] px-3 py-1.5"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#8A8A8A',
                background: 'rgba(255,255,255,0.015)',
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Live products strip */}
        <div className="flex flex-wrap gap-3 mt-6">
          {[
            { label: '↗ IMPULSOLEAD.COM', href: 'https://impulsolead.com' },
            { label: '↗ IMPULSOSEARCH.COM', href: 'https://impulsosearch.com' },
            { label: '↗ GITHUB', href: 'https://github.com/AlexSouzaDev' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] transition-colors duration-150"
              style={{ color: 'rgba(255,255,255,0.25)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#D6FF3F'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.25)'
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Right column — photo */}
      <div className="flex items-center justify-center px-12 py-24 relative z-10">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glow behind frame */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(214,255,63,0.08) 0%, transparent 70%)',
              transform: 'scale(1.3)',
            }}
          />

          {/* Photo frame */}
          <div
            className="relative overflow-hidden group"
            style={{
              width: 'min(320px, 82%)',
              aspectRatio: '3/4',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Image
              src="/photo.jpg"
              alt="Alex De Souza — Founder & CTO"
              fill
              className="object-cover transition-all duration-500 ease-out"
              style={{ filter: 'grayscale(100%) contrast(1.1)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0%) contrast(1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(100%) contrast(1.1)'
              }}
              sizes="320px"
              priority
            />

            {/* Accent gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(214,255,63,0.2) 0%, transparent 50%)',
              }}
            />

            {/* Side label — rotated */}
            <div
              className="absolute font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{
                bottom: '50%',
                left: '-40px',
                transform: 'rotate(-90deg) translateX(50%)',
                color: 'rgba(255,255,255,0.15)',
                whiteSpace: 'nowrap',
                transformOrigin: 'left center',
              }}
            >
              ALEXSOUZA.DEV
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            className="absolute font-mono text-[10px] uppercase px-3 py-1.5 font-bold tracking-[0.12em]"
            style={{
              bottom: '-16px',
              right: '-16px',
              background: '#D6FF3F',
              color: '#080808',
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ delay: 0.85, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            FOUNDER // 2024–
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile override */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          section > div:nth-child(3) {
            padding: 80px 24px 40px !important;
          }
          section > div:nth-child(4) {
            padding: 20px 24px 60px !important;
          }
        }
      `}</style>
    </section>
  )
}
