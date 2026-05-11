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
    <section className="px-5 pb-16 pt-36 sm:px-8 lg:px-16 lg:pt-44">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">{eyebrow}</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.07em] text-[var(--text)] sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
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
