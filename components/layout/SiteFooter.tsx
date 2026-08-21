import Link from 'next/link'
import { site } from '@/content/site'

/** The colophon. Every printed book ends with one. */
export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-sheet px-[var(--gutter)] py-12">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="max-w-measure">
            <p className="font-mono text-micro uppercase text-ink-soft">Colophon</p>
            <p className="mt-3">
              Set in <span className="sc">EB Garamond</span> and{' '}
              <span className="sc">IBM Plex Mono</span>, with small caps and
              oldstyle figures throughout. Built on Next.js and TypeScript,
              exported static, and served from {site.location}.
            </p>
          </div>

          <nav className="flex flex-wrap items-baseline gap-x-6 gap-y-2 sm:justify-end">
            <a
              href={site.social.github}
              target="_blank"
              rel="noreferrer"
              className="sc ink-bleed text-ink-soft transition-colors duration-300 ease-press hover:text-ink"
            >
              GitHub
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="sc ink-bleed text-ink-soft transition-colors duration-300 ease-press hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="sc ink-bleed text-ink-soft transition-colors duration-300 ease-press hover:text-ink"
            >
              Email
            </a>
            <Link
              href="/work"
              className="sc ink-bleed text-ink-soft transition-colors duration-300 ease-press hover:text-ink"
            >
              Work
            </Link>
          </nav>
        </div>

        <p className="figures-lining mt-10 border-t border-rule pt-5 font-mono text-micro uppercase text-ink-soft">
          &copy; {new Date().getFullYear()} Alex De Souza &nbsp;&middot;&nbsp; {site.role}
        </p>
      </div>
    </footer>
  )
}
