import { counters, socialProof } from '@/content/site'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function MetricsStrip() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="Proof"
          title="A small body of work with a high signal-to-noise ratio."
          body="The portfolio is intentionally selective. I’d rather show fewer things with stronger logic behind them."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {counters.map((counter) => (
            <AnimatedCounter key={counter.label} {...counter} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {socialProof.map((item) => (
            <div key={item} className="rounded-[1.6rem] border border-white/10 bg-white/[0.025] p-5 text-sm leading-7 text-white/62">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
