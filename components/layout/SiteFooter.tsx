import Link from 'next/link'
import { site } from '@/content/site'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] px-5 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
              Built for signal
            </p>
            <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-3xl">
              Strong products earn attention twice: once visually, then again through execution.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end md:justify-end">
            <MagneticButton href="/contact" cursorLabel="GO">
              Start a conversation
            </MagneticButton>
            <p className="text-xs text-[var(--muted)]">{site.location}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--line)] pt-8 text-[11px] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Alex De Souza. Fullstack & AI Engineer.</p>
          <div className="flex items-center gap-6">
            <Link
              href={site.social.github}
              target="_blank"
              rel="noreferrer"
              className="liquid-underline uppercase tracking-[0.15em] transition-colors hover:text-[var(--text)]"
            >
              GitHub
            </Link>
            <Link
              href="/work"
              className="liquid-underline uppercase tracking-[0.15em] transition-colors hover:text-[var(--text)]"
            >
              Work
            </Link>
            <Link
              href="/uses"
              className="liquid-underline uppercase tracking-[0.15em] transition-colors hover:text-[var(--text)]"
            >
              Uses
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
