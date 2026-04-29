'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const NAV_MAP: Record<string, string> = {
  HOME: '/',
  WORK: '/work',
  ABOUT: '/about',
  USES: '/uses',
  CONTACT: '/contact',
}

function LastCommit() {
  const [label, setLabel] = useState('...')

  useEffect(() => {
    fetch('https://api.github.com/repos/AlexSouzaDev/portfolio/commits?per_page=1')
      .then((r) => r.json())
      .then((data) => {
        const dateStr = data?.[0]?.commit?.committer?.date
        if (!dateStr) { setLabel('recently'); return }
        const diff = Date.now() - new Date(dateStr).getTime()
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(hours / 24)
        if (hours < 1) setLabel('< 1h ago')
        else if (hours < 24) setLabel(`${hours}h ago`)
        else setLabel(`${days}d ago`)
      })
      .catch(() => setLabel('recently'))
  }, [])

  return (
    <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
      last commit — {label}
    </span>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="w-full px-8 py-10"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div
        className="grid"
        style={{ gridTemplateColumns: '1fr 1fr 1fr' }}
      >
        {/* Left */}
        <div className="flex flex-col gap-4">
          <Link href="/" aria-label="Home">
            <div
              className="flex items-center justify-center w-[34px] h-[34px] font-display font-extrabold text-[13px] transition-all duration-150"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#F5F3EE', letterSpacing: '0.05em' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.background = '#D6FF3F'
                el.style.color = '#080808'
                el.style.borderColor = '#D6FF3F'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = 'transparent'
                el.style.color = '#F5F3EE'
                el.style.borderColor = 'rgba(255,255,255,0.2)'
              }}
            >
              AS
            </div>
          </Link>
          <div className="font-mono text-[11px] flex flex-col gap-1" style={{ color: '#8A8A8A' }}>
            <span style={{ color: '#F5F3EE' }}>Alex De Souza</span>
            <span>Founder &amp; CTO — ImpulsoLead</span>
            <span>alexsouza.dev</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>© 2024–{currentYear}</span>
          </div>
        </div>

        {/* Center — sitemap */}
        <div className="flex justify-center items-start">
          <div className="grid gap-x-10 gap-y-2" style={{ gridTemplateColumns: 'auto auto' }}>
            {Object.keys(NAV_MAP).map((label) => (
              <Link
                key={label}
                href={NAV_MAP[label]}
                className="font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#D6FF3F'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.3)'
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-2 items-end">
          <p className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            BUILDING IN PORTUGAL 🇵🇹
          </p>
          <p className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            SHIPPING TO BRAZIL 🇧🇷
          </p>
          <p className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            NEXT.JS + VERCEL
          </p>
          <LastCommit />
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mt-8 pt-6 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
          Designed &amp; built by Alex De Souza
        </p>
        <div
          className="font-mono text-[10px] px-2.5 py-1"
          style={{
            border: '1px solid rgba(214,255,63,0.2)',
            color: '#D6FF3F',
            opacity: 0.6,
          }}
        >
          OPEN TO SELECT PROJECTS
        </div>
      </div>

      {/* Mobile override */}
      <style jsx>{`
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr !important;
            gap: 2rem;
          }
          .grid > div:last-child {
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  )
}
