import type { Metadata } from 'next'
import { createMetadata, skillGroups, certifications, education } from '@/content/site'
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
        title="I build from the ground up — system to interface."
        body="AI engineer and full-stack builder, now CTO at ImpulsoLead. My work sits at the intersection of LLM systems, full-stack engineering, and a strong bias toward shipping things that survive contact with reality."
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

      <section className="px-5 pb-20 sm:px-8 lg:px-16 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-12 border-b border-[var(--line)] pb-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
              Stack &amp; Tooling
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--text)] sm:text-4xl">
              The tools I reach for, grouped by where they earn their keep.
            </h2>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <FadeIn key={group.label} delay={index * 0.05}>
                <div className="h-full border border-[var(--line)] p-6">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--muted)]">
                    {group.label}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
              Education
            </p>
            <div className="mt-6 border-t border-[var(--line)] pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-[var(--text)]">
                  {education.school}
                </h3>
                <span className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  {education.period}
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {education.program} · {education.location}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{education.detail}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
              Certifications
            </p>
            <div className="mt-6 divide-y divide-[var(--line)] border-t border-[var(--line)]">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <span className="text-sm text-[var(--text)]">{cert.title}</span>
                  <span className="shrink-0 text-xs text-[var(--muted)]">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
