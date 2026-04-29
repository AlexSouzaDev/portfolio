import { timeline } from '@/content/site'
import { FadeIn } from '@/components/motion/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function FounderTimeline() {
  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Founder story"
          title="Built through repetition, not posturing."
          body="The story is straightforward: ship, learn under pressure, raise the standard, and keep compounding."
        />
        <div className="space-y-5">
          {timeline.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.05}>
              <article className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">{item.year}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{item.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
