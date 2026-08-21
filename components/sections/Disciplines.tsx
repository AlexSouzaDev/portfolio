import { Press } from '@/components/motion/Press'
import { SectionHead } from '@/components/print/SectionHead'
import { capabilityPillars } from '@/content/site'

/** Three ruled columns. The disciplines the practice covers. */
export function Disciplines() {
  return (
    <section className="mx-auto max-w-sheet px-[var(--gutter)] py-[clamp(3.5rem,8vw,7rem)]">
      <SectionHead
        mark="02 — Practice"
        title="Product judgment and hands-on technical ownership, in the same person."
      />

      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-3">
        {capabilityPillars.map((pillar, i) => (
          <Press key={pillar.title} delay={i * 80} className="max-w-[46ch]">
            <p className="sc text-[0.82rem] text-ink-soft">{pillar.eyebrow}</p>
            <h3 className="mt-3 text-[1.24em] font-semibold leading-snug">
              {pillar.title}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">{pillar.body}</p>
          </Press>
        ))}
      </div>
    </section>
  )
}
