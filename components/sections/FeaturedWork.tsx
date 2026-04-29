import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TiltCard } from '@/components/ui/TiltCard'
import { featuredProjects } from '@/content/site'
import { ScrambleText } from '@/components/ui/ScrambleText'

export function FeaturedWork() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Selected work"
          title="Products with more than visual polish behind them."
          body="These are systems built around use, pressure, and actual product constraints."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.06}>
              <TiltCard className="h-full">
                <Link
                  href={project.href}
                  className="group flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.24)]"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-cyan-200/70">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="mt-8 text-3xl font-semibold tracking-[-0.05em] text-white">
                      <ScrambleText text={project.title} />
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/60">{project.summary}</p>
                  </div>
                  <div className="mt-10 border-t border-white/10 pt-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/40">Scope</p>
                    <p className="mt-3 text-sm leading-7 text-white/68">{project.impact}</p>
                  </div>
                </Link>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
