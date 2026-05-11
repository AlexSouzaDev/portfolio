'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '@/content/site'
import { cn, easeOutExpo } from '@/lib/utils'

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'pointer-events-none fixed inset-x-0 top-0 z-50 px-5 transition-all duration-500 sm:px-8 lg:px-16',
          scrolled ? 'pt-4' : 'pt-7'
        )}
      >
        <div
          className={cn(
            'pointer-events-auto flex w-full items-center justify-between transition-all duration-500',
            scrolled && 'border-b border-[var(--line)] pb-4'
          )}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3"
            aria-label="Alex De Souza home"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-[10px] font-semibold tracking-[0.2em] text-[var(--text)]">
              AD
            </span>
            <span className="hidden text-[11px] font-medium tracking-[0.22em] text-[var(--muted)] transition-colors group-hover:text-[var(--text)] sm:block">
              ALEX DE SOUZA
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems
              .filter((item) => item.href !== '/')
              .map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'liquid-underline text-[11px] uppercase tracking-[0.2em] transition-colors',
                      active
                        ? 'text-[var(--text)]'
                        : 'text-[var(--muted)] hover:text-[var(--text)]'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center text-[var(--muted)] transition-colors hover:text-[var(--text)] md:hidden"
          >
            <div className="relative h-3.5 w-5">
              <span
                className={cn(
                  'absolute left-0 top-0 block h-px w-5 bg-current transition-all duration-300',
                  menuOpen && 'top-1.5 rotate-45'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-1.5 block h-px w-5 bg-current transition-opacity duration-300',
                  menuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-3 block h-px w-5 bg-current transition-all duration-300',
                  menuOpen && 'top-1.5 -rotate-45'
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
            transition={{ duration: 0.28, ease: easeOutExpo }}
            className="fixed inset-0 z-40 bg-[var(--bg)] md:hidden"
          >
            <motion.nav
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.38, ease: easeOutExpo }}
              className="flex h-full flex-col justify-between px-5 pb-12 pt-24"
            >
              <div className="divide-y divide-[var(--line)]">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{
                      duration: 0.36,
                      delay: 0.04 + index * 0.04,
                      ease: easeOutExpo,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="block py-5 text-4xl font-semibold tracking-[-0.05em] text-[var(--text)]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs tracking-[0.2em] text-[var(--muted)] uppercase">
                Aveiro, Portugal
              </p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
