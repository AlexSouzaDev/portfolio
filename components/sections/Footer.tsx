'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const NAV_COLS = [
  ['HOME', 'WORK'],
  ['ABOUT', 'BLOG'],
  ['USES', 'CONTACT'],
]

const NAV_MAP: Record<string, string> = {
  HOME: '/',
  WORK: '/work',
  ABOUT: '/about',
  BLOG: '/blog',
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
        if (!dateStr) {
          setLabel('recently')
          return
        }
        const diff = Date.now() - new Date(dateStr).getTime()
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(hours / 24)
        if (hours < 1) setLabel('< 1 hour ago')
        else if (hours < 24) setLabel(`${hours}h ago`)
        else setLabel(`${days}d ago`)
      })
      .catch(() => setLabel('recently'))
  }, [])

  return (
    <p className="font-mono text-[12px]" style={{ color: '#888880' }}>
      LAST COMMIT — {label}
    </p>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="w-full px-8 py-10 grid"
      style={{
        borderTop: '2px solid #2A2A2A',
        gridTemplateColumns: '1fr 1fr 1fr',
      }}
    >
      {/* Left */}
      <div className="flex flex-col gap-3">
        <Link href="/" aria-label="Home">
          <div
            className="flex items-center justify-center w-[38px] h-[38px] font-display font-extrabold text-sm"
            style={{ border: '2px solid #F0EBE0', color: '#F0EBE0' }}
          >
            AS
          </div>
        </Link>
        <p className="font-mono text-[13px]" style={{ color: '#888880' }}>
          Alex De Souza
          <br />
          Founder &amp; CTO — ImpulsoLead
          <br />
          alexsouza.dev
          <br />
          © 2024–{currentYear}
        </p>
      </div>

      {/* Center — sitemap */}
      <div className="flex justify-center">
        <div
          className="grid gap-x-12 gap-y-2"
          style={{ gridTemplateColumns: 'auto auto' }}
        >
          {NAV_COLS.flat().map((label) => (
            <Link
              key={label}
              href={NAV_MAP[label]}
              className="font-mono text-[12px] uppercase tracking-wider transition-colors duration-[120ms]"
              style={{ color: '#888880' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFE500'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#888880'
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-2 items-end">
        <p className="font-mono text-[12px]" style={{ color: '#888880' }}>
          BUILDING IN PORTUGAL 🇵🇹
        </p>
        <p className="font-mono text-[12px]" style={{ color: '#888880' }}>
          SHIPPING TO BRAZIL 🇧🇷
        </p>
        <p className="font-mono text-[12px]" style={{ color: '#888880' }}>
          POWERED BY NEXT.JS + VERCEL
        </p>
        <LastCommit />
      </div>

      {/* Mobile override */}
      <style jsx>{`
        @media (max-width: 768px) {
          footer {
            grid-template-columns: 1fr !important;
            gap: 2rem;
          }
          footer > div:last-child {
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  )
}
