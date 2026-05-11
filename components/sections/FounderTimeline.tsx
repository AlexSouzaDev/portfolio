import { timeline } from '@/content/site'
import { FadeIn } from '@/components/motion/FadeIn'

export function FounderTimeline() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-0 flex items-end justify-between border-b border-[var(--line)] pb-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
            Founder Story
          </p>
          <p className="hidden text-[11px] tracking-[0.15em] text-[var(--muted)] sm:block">
            Built through repetition, not posturing.
          </p>
        </FadeIn>

        <div className="grid gap-0 lg:grid-cols-[1fr_2fr]">
          <div />
          <div className="divide-y divide-[var(--line)]">
            {timeline.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.07}>
                <div className="grid gap-4 py-10 sm:grid-cols-[7rem_1fr]">
                  <p className="pt-1 text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                    {item.year}
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
