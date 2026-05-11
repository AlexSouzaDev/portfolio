import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata, workArchive } from '@/content/site'
import { PageHero } from '@/components/sections/PageHero'
import { FadeIn } from '@/components/motion/FadeIn'
import { ScrambleText } from '@/components/ui/ScrambleText'
import { SiteFooter } from '@/components/layout/SiteFooter'

export const metadata: Metadata = createMetadata(
  'Work',
  'Selected products, system design, and founder-led shipping work by Alex De Souza.',
  '/work'
)

export default function WorkPage() {
  return (
    <main>
      <PageHero
        eyebrow="Work"
        title="A compact portfolio with actual product pressure behind it."
        body="I prefer a selective archive: fewer entries, better judgment, stronger systems."
        cta={{ href: '/contact', label: 'Discuss a build' }}
      />
      <section className="px-5 pb-20 sm:px-8 lg:px-16 lg:pb-28">
        <div className="mx-auto max-w-7xl divide-y divide-[var(--line)] border-t border-[var(--line)]">
          {workArchive.map((project, index) => (
            <FadeIn key={project.title} delay={index * 0.05}>
              <Link
                href={project.href}
                className="group grid gap-6 py-10 transition-colors hover:text-[var(--text)] md:grid-cols-[1.2fr_0.4fr_1fr]"
                data-cursor-label="VIEW"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--muted)]">
                    {project.type}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-3xl">
                    <ScrambleText text={project.title} />
                  </h2>
                </div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {project.year}
                </p>
                <p className="text-sm leading-7 text-[var(--muted)]">{project.description}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
