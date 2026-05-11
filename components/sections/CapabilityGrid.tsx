import { capabilityPillars } from '@/content/site'
import { FadeIn } from '@/components/motion/FadeIn'
import { RevealText } from '@/components/motion/RevealText'

export function CapabilityGrid() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-14 border-b border-[var(--line)] pb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">What I Bring</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.065em] text-[var(--text)] sm:text-5xl lg:text-6xl">
            <RevealText>
              Strategic product thinking paired with hands-on technical ownership.
            </RevealText>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
            The mix matters. Products move faster when the person shaping them can also build the hard parts.
          </p>
        </FadeIn>

        <div className="grid gap-0 lg:grid-cols-3 lg:divide-x lg:divide-[var(--line)]">
          {capabilityPillars.map((pillar, index) => (
            <FadeIn key={pillar.title} delay={index * 0.07}>
              <div className="border-t border-[var(--line)] py-10 lg:border-0 lg:px-10 lg:first:pl-0 lg:last:pr-0">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                  {pillar.eyebrow}
                </p>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-[var(--text)]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{pillar.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
