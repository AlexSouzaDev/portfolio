import { capabilityPillars } from '@/content/site'
import { FadeIn } from '@/components/motion/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function CapabilityGrid() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What I bring"
          title="Strategic product thinking paired with hands-on technical ownership."
          body="The mix matters. Products move faster when the person shaping them can also build the hard parts."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {capabilityPillars.map((pillar, index) => (
            <FadeIn key={pillar.title} delay={index * 0.05}>
              <article className="glass-panel rounded-[2rem] p-7">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/68">{pillar.eyebrow}</p>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-white">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{pillar.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
