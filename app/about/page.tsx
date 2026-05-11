import type { Metadata } from 'next'
import { createMetadata } from '@/content/site'
import { PageHero } from '@/components/sections/PageHero'
import { FounderTimeline } from '@/components/sections/FounderTimeline'
import { Accordion } from '@/components/ui/Accordion'
import { FadeIn } from '@/components/motion/FadeIn'
import { SiteFooter } from '@/components/layout/SiteFooter'

export const metadata: Metadata = createMetadata(
  'About',
  'Background, principles, and operating style behind Alex De Souza.',
  '/about'
)

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="I build like a founder because I am one."
        body="My work sits at the intersection of product judgment, technical depth, and a strong bias toward shipping systems that survive contact with reality."
      />
      <FounderTimeline />
      <section className="px-5 pb-20 sm:px-8 lg:px-16 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-12 border-b border-[var(--line)] pb-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
              Operating Principles
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-4xl">
              Clarity, leverage, and choices that age well.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--muted)]">
              I care about product choices that can still look intelligent six months later.
            </p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <Accordion
              items={[
                {
                  title: 'Build for the real bottleneck',
                  body: 'The right solution is rarely the flashiest one. I start with where time, trust, or decision quality is actually being lost.',
                },
                {
                  title: 'Protect the system while moving quickly',
                  body: 'Fast shipping matters. So does not creating future drag every time speed is required. I optimize for both.',
                },
                {
                  title: 'Use AI with product logic',
                  body: 'AI is valuable when it sharpens a workflow, qualifies intent, or increases operator leverage. Everything else is noise.',
                },
              ]}
            />
          </FadeIn>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
