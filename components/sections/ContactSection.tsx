import { contactReasons } from '@/content/site'
import { RevealText } from '@/components/motion/RevealText'
import { FadeIn } from '@/components/motion/FadeIn'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function ContactSection() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-14 border-b border-[var(--line)] pb-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">Contact</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.065em] text-[var(--text)] sm:text-5xl lg:text-6xl">
            <RevealText>
              When the brief is ambitious, the build should be too.
            </RevealText>
          </h2>
        </FadeIn>

        <div className="grid gap-14 lg:grid-cols-[0.84fr_1.16fr]">
          <FadeIn className="space-y-3">
            <p className="mb-6 text-sm leading-7 text-[var(--muted)]">
              If you need product judgment, engineering depth, and someone comfortable owning the hard middle, reach out.
            </p>
            {contactReasons.map((reason) => (
              <div
                key={reason}
                className="border-b border-[var(--line)] py-4 text-sm leading-7 text-[var(--muted)]"
              >
                {reason}
              </div>
            ))}
          </FadeIn>

          <FadeIn delay={0.08} className="flex flex-col justify-center gap-6">
            <p className="text-sm leading-7 text-[var(--muted)]">Clear scope beats vague hype.</p>
            <MagneticButton
              href="mailto:alexandre@impulsolead.com"
              cursorLabel="EMAIL"
            >
              Send enquiry
            </MagneticButton>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
