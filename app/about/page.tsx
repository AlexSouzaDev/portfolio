import type { Metadata } from 'next'
import {
  createMetadata,
  skillGroups,
  certifications,
  education,
  principles,
} from '@/content/site'
import { PageHead } from '@/components/print/PageHead'
import { SectionHead } from '@/components/print/SectionHead'
import { Register, RegisterRow } from '@/components/print/Register'
import { Journey } from '@/components/sections/Journey'
import { Press } from '@/components/motion/Press'
import { SiteFooter } from '@/components/layout/SiteFooter'

export const metadata: Metadata = createMetadata(
  'About',
  'Background, principles, and operating style behind Alex De Souza.',
  '/about'
)

export default function AboutPage() {
  return (
    <>
      <main>
        <PageHead
          mark="Letterhead"
          title="I build from the ground up — system to interface."
          body="AI engineer and full-stack builder, now CTO at ImpulsoLead. My work sits at the intersection of LLM systems, full-stack engineering, and a strong bias toward shipping things that survive contact with reality."
        />

        <Journey mark="01 — Record" />

        <section className="mx-auto max-w-sheet px-[var(--gutter)] py-[clamp(3.5rem,8vw,7rem)]">
          <SectionHead
            mark="02 — Principles"
            title="Clarity, leverage, and choices that age well."
          />
          <Register>
            {principles.map((principle, i) => (
              <RegisterRow
                key={principle.title}
                entry={`0${i + 1}`}
                delay={i * 60}
              >
                <h3 className="m-0 text-[1.24em] font-semibold leading-snug">
                  {principle.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-soft">
                  {principle.body}
                </p>
              </RegisterRow>
            ))}
          </Register>
        </section>

        <section className="mx-auto max-w-sheet px-[var(--gutter)] py-[clamp(3.5rem,8vw,7rem)]">
          <SectionHead
            mark="03 — Case"
            title="The tools, grouped by where they earn their keep."
          />
          <Register>
            {skillGroups.map((group, i) => (
              <RegisterRow key={group.label} entry={group.label} delay={i * 50}>
                <p className="m-0 font-mono text-[0.76em] leading-loose">
                  {group.items.join('  ·  ')}
                </p>
              </RegisterRow>
            ))}
          </Register>
        </section>

        <section className="mx-auto max-w-sheet px-[var(--gutter)] pb-[clamp(3.5rem,8vw,7rem)]">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
            <Press>
              <p className="sc text-[0.9rem] text-ink-soft">Education</p>
              <div className="mt-5 border-t border-rule pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="m-0 text-[1.24em] font-semibold">
                    {education.school}
                  </h3>
                  <span className="figures-lining shrink-0 font-mono text-micro uppercase text-ink-soft">
                    {education.period}
                  </span>
                </div>
                <p className="mt-1 text-ink-soft">
                  {education.program} &middot; {education.location}
                </p>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  {education.detail}
                </p>
              </div>
            </Press>

            <Press delay={80}>
              <p className="sc text-[0.9rem] text-ink-soft">Certifications</p>
              <ul className="mt-5 list-none border-t border-rule p-0">
                {certifications.map((cert) => (
                  <li
                    key={cert.title}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-rule py-3"
                  >
                    <span>{cert.title}</span>
                    <span className="sc shrink-0 text-[0.85em] text-ink-soft">
                      {cert.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            </Press>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
