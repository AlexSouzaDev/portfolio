import { FadeIn } from '@/components/motion/FadeIn'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function PageHero({
  eyebrow,
  title,
  body,
  cta,
}: {
  eyebrow: string
  title: string
  body: string
  cta?: { href: string; label: string }
}) {
  return (
    <section className="relative overflow-hidden px-5 pb-14 pt-36 sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/68">{eyebrow}</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.08em] text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/64 sm:text-lg">
            {body}
          </p>
          {cta ? (
            <div className="mt-8">
              <MagneticButton href={cta.href}>{cta.label}</MagneticButton>
            </div>
          ) : null}
        </FadeIn>
      </div>
    </section>
  )
}
