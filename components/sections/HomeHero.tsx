import { FadeIn } from '@/components/motion/FadeIn'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { heroMetrics } from '@/content/site'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-24 lg:pt-44">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div className="space-y-8">
          <FadeIn>
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-200/20 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.26em] text-cyan-100/78">
              Founder platform
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(151,241,255,0.7)]" />
            </div>
            <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.08em] text-white sm:text-6xl lg:text-[6.6rem] lg:leading-[0.94]">
              Building sharp digital products with founder judgment and engineering depth.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/64 sm:text-lg">
              I design products, engineer systems, and apply AI where it changes the business result. The goal is never more surface area. The goal is better leverage.
            </p>
          </FadeIn>

          <FadeIn delay={0.08} className="flex flex-col gap-4 sm:flex-row">
            <MagneticButton href="/work" cursorLabel="VIEW">
              See the work
            </MagneticButton>
            <MagneticButton
              href="/contact"
              cursorLabel="GO"
              className="border-white/12 bg-white/[0.02] text-white/88"
            >
              Build with Alex
            </MagneticButton>
          </FadeIn>
        </div>

        <StaggerGroup className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {heroMetrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <div className="glass-panel rounded-[2rem] p-6">
                <p className="text-3xl font-semibold tracking-[-0.06em] text-white">{metric.value}</p>
                <p className="mt-3 text-sm leading-6 text-white/58">{metric.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
