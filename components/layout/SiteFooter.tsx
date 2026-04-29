import Link from 'next/link'
import { site } from '@/content/site'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">
              Built for signal
            </p>
            <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
              Strong products earn attention twice: once visually, then again through execution.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <MagneticButton href="/contact" cursorLabel="GO">
              Start a conversation
            </MagneticButton>
            <p className="text-sm text-white/55">{site.location}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Founder-built and performance-minded.</p>
          <div className="flex items-center gap-5">
            <Link href={site.social.github} target="_blank" rel="noreferrer">
              GitHub
            </Link>
            <Link href="/work">Work</Link>
            <Link href="/uses">Uses</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
