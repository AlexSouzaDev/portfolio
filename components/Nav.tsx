'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { href: '/work', label: 'WORK' },
  { href: '/about', label: 'ABOUT' },
  { href: '/uses', label: 'USES' },
  { href: '/contact', label: 'CONTACT' },
]

const AVAILABLE = process.env.NEXT_PUBLIC_AVAILABLE === 'true'

export function Nav() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className="sticky top-0 z-50 w-full hidden md:flex items-center justify-between px-8 h-[58px]"
        style={{
          background: 'rgba(8, 8, 8, 0.92)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Monogram */}
        <Link href="/" aria-label="Alex De Souza — Home">
          <div
            className="flex items-center justify-center w-[36px] h-[36px] font-display font-extrabold text-[13px] transition-all duration-150"
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#F5F3EE',
              letterSpacing: '0.05em',
            }}
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

        {/* Center links */}
        <div className="flex items-center gap-8">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link font-mono text-[11px] uppercase tracking-[0.12em] pb-0.5 transition-colors duration-150 ${active ? 'active' : ''}`}
                style={{ color: active ? '#F5F3EE' : '#8A8A8A' }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Availability pill */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em]"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#8A8A8A',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${AVAILABLE ? 'pulse-dot' : ''}`}
            style={{ background: AVAILABLE ? '#00C853' : '#FF2D00' }}
          />
          {AVAILABLE ? 'AVAILABLE FOR PROJECTS' : 'BUSY BUILDING'}
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav
        className="md:hidden sticky top-0 z-50 w-full flex items-center justify-between px-6 h-[54px]"
        style={{
          background: 'rgba(8, 8, 8, 0.92)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <Link href="/" aria-label="Home">
          <div
            className="flex items-center justify-center w-[32px] h-[32px] font-display font-extrabold text-[12px]"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#F5F3EE' }}
          >
            AS
          </div>
        </Link>
        <button
          onClick={() => setDrawerOpen(true)}
          className="font-mono text-[11px] uppercase tracking-[0.12em] flex items-center gap-2"
          style={{ color: '#8A8A8A' }}
        >
          <span style={{ color: '#F5F3EE' }}>MENU</span>
          <span style={{ color: '#D6FF3F' }}>→</span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60]"
              style={{ background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-[70] px-8 py-10"
              style={{
                background: '#101010',
                borderTop: '1px solid rgba(214,255,63,0.4)',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col gap-7">
                {LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className="font-display font-extrabold text-[28px] uppercase tracking-wide transition-colors duration-150"
                    style={{ color: pathname === href ? '#D6FF3F' : '#F5F3EE' }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="mt-10 font-mono text-[11px] uppercase tracking-[0.12em]"
                style={{ color: '#8A8A8A' }}
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
