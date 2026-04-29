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
      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-5">
          {workArchive.map((project, index) => (
            <FadeIn key={project.title} delay={index * 0.05}>
              <Link
                href={project.href}
                className="group grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-200/25 hover:bg-white/[0.05] md:grid-cols-[1.2fr_0.5fr_1fr]"
                data-cursor-label="VIEW"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-cyan-200/65">{project.type}</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
                    <ScrambleText text={project.title} />
                  </h2>
                </div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/44">{project.year}</p>
                <p className="text-sm leading-7 text-white/62">{project.description}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
