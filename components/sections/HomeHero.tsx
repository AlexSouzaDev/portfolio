import { FadeIn } from '@/components/motion/FadeIn'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function HomeHero() {
  return (
    <section className="relative flex min-h-[94vh] flex-col justify-between px-5 pb-16 pt-32 sm:px-8 lg:px-16 lg:pb-20 lg:pt-44">
      <div>
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.34em] text-[var(--muted)]">
            AI Engineer · Full-Stack · CTO @ ImpulsoLead · Aveiro, Portugal
          </p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <h1 className="mt-8 max-w-[22ch] text-[clamp(3rem,8.5vw,8rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[var(--text)]">
            Building sharp digital products with engineering depth and AI precision.
          </h1>
        </FadeIn>
      </div>

      <FadeIn delay={0.22}>
        <div className="border-t border-[var(--line)] pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
              I architect products, engineer the systems beneath them, and ship LLM and multi-agent features where they change the business result. The goal is leverage, not surface area.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/work" cursorLabel="VIEW">
                See the work
              </MagneticButton>
              <MagneticButton href="/contact" cursorLabel="GO">
                Build with Alex
              </MagneticButton>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
