import { counters } from '@/content/site'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { FadeIn } from '@/components/motion/FadeIn'

export function MetricsStrip() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid divide-y divide-[var(--line)] border-y border-[var(--line)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {counters.map((counter, index) => (
            <FadeIn key={counter.label} delay={index * 0.08}>
              <div className="py-14 lg:px-14 lg:first:pl-0 lg:last:pr-0">
                <AnimatedCounter {...counter} />
                <p className="mt-4 max-w-[18rem] text-sm leading-6 text-[var(--muted)]">
                  {counter.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
