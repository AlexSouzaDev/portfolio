import type { Metadata } from 'next'
import { createMetadata, workArchive } from '@/content/site'
import { PageHead } from '@/components/print/PageHead'
import { Register, RegisterRow } from '@/components/print/Register'
import { SiteFooter } from '@/components/layout/SiteFooter'

export const metadata: Metadata = createMetadata(
  'Work',
  'Selected products and engineered systems by Alex De Souza — AI engineer and full-stack builder.',
  '/work'
)

export default function WorkPage() {
  return (
    <>
      <main>
        <PageHead
          mark="The index"
          title="A selective archive, kept short on purpose."
          body="Fewer entries, better judgment, stronger systems. Every line below opens a case file."
        />

        <section className="mx-auto max-w-sheet px-[var(--gutter)] pb-[clamp(3.5rem,8vw,7rem)]">
          <Register>
            {workArchive.map((project, i) => (
              <RegisterRow
                key={project.slug}
                entry={project.year}
                href={`/work/${project.slug}`}
                delay={i * 45}
              >
                <h2 className="sc m-0 text-[clamp(1.15rem,2.4vw,1.6rem)] font-medium">
                  {project.title}
                </h2>
                <p className="sc mt-0.5 text-[0.82rem] text-ink-soft">
                  {project.type}
                </p>
                <p className="mt-2 text-[0.94em] leading-relaxed text-ink-soft">
                  {project.description}
                </p>
              </RegisterRow>
            ))}
          </Register>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
