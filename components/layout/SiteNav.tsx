import Link from 'next/link'
import { navItems } from '@/content/site'

/**
 * The running head. A letterhead rule that stays with the sheet —
 * monogram left, routes in small caps right, no drawer, no client JS.
 */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 bg-paper">
      <div className="mx-auto flex max-w-sheet flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-rule px-[var(--gutter)] py-4">
        <Link
          href="/"
          className="sc text-[1.05rem] leading-none transition-colors duration-300 ease-press hover:text-seal"
          aria-label="Alex De Souza — home"
        >
          A. De&nbsp;Souza
        </Link>

        <nav className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
          {navItems
            .filter((item) => item.href !== '/')
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="sc ink-bleed text-[0.95rem] leading-none text-ink-soft transition-colors duration-300 ease-press hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  )
}
