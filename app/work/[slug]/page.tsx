import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createMetadata, workArchive } from '@/content/site'
import { Card } from '@/components/print/Card'
import { Press } from '@/components/motion/Press'
import { SiteFooter } from '@/components/layout/SiteFooter'

type Params = { slug: string }

export function generateStaticParams() {
  return workArchive.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const project = workArchive.find((entry) => entry.slug === slug)
  if (!project) return createMetadata('Case file')

  return createMetadata(project.title, project.description, `/work/${slug}`)
}

export default async function CaseFilePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const project = workArchive.find((entry) => entry.slug === slug)
  if (!project) notFound()

  const index = workArchive.findIndex((entry) => entry.slug === slug) + 1
  const external = project.href.startsWith('http')

  return (
    <>
      <main>
        {/* The memo header — the calling-card format, grown to fit a subject. */}
        <section className="mx-auto max-w-sheet px-[var(--gutter)] pb-[clamp(2rem,4vw,3rem)] pt-[clamp(2rem,5vw,4rem)]">
          <Card
            ratio={false}
            mark={<>Case&nbsp;file</>}
            firm={
              <span className="figures-lining font-mono text-micro uppercase">
                No. {String(index).padStart(2, '0')} / {workArchive.length}
              </span>
            }
            foot={
              <>
                {project.year} &nbsp;&middot;&nbsp; {project.type}
              </>
            }
          >
            <h1 className="m-0 text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[1.06]">
              {project.title}
            </h1>
          </Card>
        </section>

        <section className="mx-auto max-w-sheet px-[var(--gutter)] pb-[clamp(3.5rem,8vw,7rem)]">
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[16rem_1fr]">
            {/* The memo block */}
            <Press as="div">
              <dl className="m-0 border-t border-rule">
                <div className="border-b border-rule py-3">
                  <dt className="font-mono text-micro uppercase text-ink-soft">Re</dt>
                  <dd className="m-0 mt-1">{project.title}</dd>
                </div>
                <div className="border-b border-rule py-3">
                  <dt className="font-mono text-micro uppercase text-ink-soft">Date</dt>
                  <dd className="figures-old m-0 mt-1">{project.year}</dd>
                </div>
                <div className="border-b border-rule py-3">
                  <dt className="font-mono text-micro uppercase text-ink-soft">
                    Discipline
                  </dt>
                  <dd className="m-0 mt-1">{project.type}</dd>
                </div>
                <div className="border-b border-rule py-3">
                  <dt className="font-mono text-micro uppercase text-ink-soft">Stack</dt>
                  <dd className="m-0 mt-1 font-mono text-[0.74em] leading-relaxed">
                    {project.stack.join(' · ')}
                  </dd>
                </div>
                <div className="border-b border-rule py-3">
                  <dt className="font-mono text-micro uppercase text-ink-soft">
                    Source
                  </dt>
                  <dd className="m-0 mt-1">
                    <a
                      href={project.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="link"
                    >
                      {project.href.replace(/^https?:\/\//, '')}
                    </a>
                  </dd>
                </div>
              </dl>
            </Press>

            {/* The body */}
            <Press as="div" delay={80} className="max-w-measure">
              <p className="text-[1.14em] leading-relaxed">{project.description}</p>

              <p className="mt-12 border-t border-rule pt-6">
                <Link
                  href="/work"
                  className="sc ink-bleed text-ink-soft transition-colors duration-300 ease-press hover:text-ink"
                >
                  Back to the index
                </Link>
              </p>
            </Press>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
