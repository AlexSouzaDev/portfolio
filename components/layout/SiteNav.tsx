'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '@/content/site'
import { cn, easeOutExpo } from '@/lib/utils'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-5">
        <div
          className={cn(
            'pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 sm:px-5',
            scrolled
              ? 'border-white/15 bg-slate-950/70 shadow-[0_20px_80px_rgba(4,8,20,0.45)] backdrop-blur-2xl'
              : 'border-transparent bg-transparent'
          )}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full px-2 py-2"
            aria-label="Alex De Souza home"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/25 bg-white/5 text-sm font-semibold tracking-[0.24em] text-white">
              AD
            </span>
            <span className="hidden text-sm font-medium tracking-[0.18em] text-white/80 sm:block">
              ALEX DE SOUZA
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative rounded-full px-4 py-2 text-sm text-white/72 transition-colors hover:text-white"
                  data-cursor-label="OPEN"
                >
                  <span>{item.label}</span>
                  <span
                    className={cn(
                      'absolute inset-x-4 bottom-1 h-px origin-left bg-gradient-to-r from-cyan-300 via-white to-transparent transition-transform duration-300',
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:block">
            <MagneticButton href="/contact" cursorLabel="GO" size="sm">
              Let&apos;s build
            </MagneticButton>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="relative h-4 w-5">
              <span
                className={cn(
                  'absolute left-0 top-0 block h-px w-5 bg-white transition-all duration-300',
                  menuOpen && 'top-2 rotate-45'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-2 block h-px w-5 bg-white transition-opacity duration-300',
                  menuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-4 block h-px w-5 bg-white transition-all duration-300',
                  menuOpen && 'top-2 -rotate-45'
                )}
              />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="fixed inset-0 z-40 bg-slate-950/92 backdrop-blur-2xl md:hidden"
          >
            <motion.nav
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.45, ease: easeOutExpo }}
              className="flex h-full flex-col justify-between px-6 pb-8 pt-28"
            >
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 16, opacity: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 + index * 0.05, ease: easeOutExpo }}
                  >
                    <Link
                      href={item.href}
                      className="block rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-5 text-3xl font-semibold tracking-[-0.04em] text-white"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="space-y-4">
                <MagneticButton href="/contact" cursorLabel="GO" className="w-full justify-center">
                  Start the conversation
                </MagneticButton>
                <p className="text-sm text-white/55">Founder platform built in Portugal for global product work.</p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
