'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { href: '/work', label: 'WORK' },
  { href: '/about', label: 'ABOUT' },
  { href: '/blog', label: 'BLOG' },
  { href: '/uses', label: 'USES' },
]

const AVAILABLE = process.env.NEXT_PUBLIC_AVAILABLE === 'true'

export function Nav() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className="sticky top-0 z-50 w-full hidden md:flex items-center justify-between px-8 h-[60px]"
        style={{
          background: '#0D0D0D',
          borderBottom: '2px solid #2A2A2A',
        }}
      >
        {/* Monogram */}
        <Link href="/" aria-label="Alex De Souza — Home">
          <div
            className="flex items-center justify-center w-[38px] h-[38px] font-display font-extrabold text-sm transition-all duration-[120ms]"
            style={{
              border: '2px solid #F0EBE0',
              color: '#F0EBE0',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = '#FFE500'
              el.style.color = '#0D0D0D'
              el.style.borderColor = '#FFE500'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'transparent'
              el.style.color = '#F0EBE0'
              el.style.borderColor = '#F0EBE0'
            }}
          >
            AS
          </div>
        </Link>

        {/* Center links */}
        <div className="flex items-center gap-8">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link font-mono text-[12px] uppercase tracking-[0.1em] text-primary pb-1 ${active ? 'active' : ''}`}
                style={{ color: '#F0EBE0' }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Availability pill */}
        <div
          className="flex items-center gap-2 px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
          style={{ border: '1px solid #2A2A2A', color: '#888880' }}
        >
          <span
            className={`w-2 h-2 rounded-full ${AVAILABLE ? 'pulse-dot' : ''}`}
            style={{ background: AVAILABLE ? '#00C853' : '#FF2D00' }}
          />
          {AVAILABLE ? 'AVAILABLE FOR PROJECTS' : 'BUSY BUILDING'}
        </div>
      </nav>

      {/* Mobile Nav — bottom drawer trigger */}
      <nav
        className="md:hidden sticky top-0 z-50 w-full flex items-center justify-between px-6 h-[56px]"
        style={{ background: '#0D0D0D', borderBottom: '2px solid #2A2A2A' }}
      >
        <Link href="/" aria-label="Home">
          <div
            className="flex items-center justify-center w-[34px] h-[34px] font-display font-extrabold text-sm"
            style={{ border: '2px solid #F0EBE0', color: '#F0EBE0' }}
          >
            AS
          </div>
        </Link>
        <button
          onClick={() => setDrawerOpen(true)}
          className="font-mono text-[11px] uppercase tracking-widest"
          style={{ color: '#F0EBE0' }}
        >
          MENU →
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60]"
              style={{ background: 'rgba(13,13,13,0.8)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-[70] px-8 py-10"
              style={{
                background: '#141414',
                borderTop: '2px solid #FFE500',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col gap-8">
                {LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className="font-mono text-[32px] uppercase tracking-wider"
                    style={{ color: '#F0EBE0' }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="mt-10 font-mono text-[13px] uppercase tracking-widest"
                style={{ color: '#888880' }}
              >
                ← CLOSE
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
