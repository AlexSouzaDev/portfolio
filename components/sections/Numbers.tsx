import { Press } from '@/components/motion/Press'
import { Figure } from '@/components/print/Figure'
import { SectionHead } from '@/components/print/SectionHead'
import { counters } from '@/content/site'

/** Figure set. Three counts, set large, in oldstyle. */
export function Numbers() {
  return (
    <section className="mx-auto max-w-sheet px-[var(--gutter)] py-[clamp(3.5rem,8vw,7rem)]">
      <SectionHead mark="04 — Figures" title="The count, so far." />
      <div className="grid border-y border-rule sm:grid-cols-3">
        {counters.map((counter, i) => (
          <Press
            key={counter.label}
            delay={i * 80}
            className="border-b border-rule px-0 py-10 last:border-b-0 sm:border-b-0 sm:border-r sm:px-8 sm:last:border-r-0 sm:first:pl-0 sm:last:pr-0"
          >
            <Figure value={counter.value} suffix={counter.suffix} />
            <p className="mt-4 max-w-[20rem] leading-relaxed text-ink-soft">
              {counter.label}
            </p>
          </Press>
        ))}
      </div>
    </section>
  )
}
