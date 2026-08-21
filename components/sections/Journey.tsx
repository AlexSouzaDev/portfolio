import { SectionHead } from '@/components/print/SectionHead'
import { Register, RegisterRow } from '@/components/print/Register'
import { timeline } from '@/content/site'

/** The register of dates. */
export function Journey({ mark = '03 — Record' }: { mark?: string }) {
  return (
    <section className="mx-auto max-w-sheet px-[var(--gutter)] py-[clamp(3.5rem,8vw,7rem)]">
      <SectionHead
        mark={mark}
        title="Built through repetition"
        sub="Coding since 2020"
      />

      <Register>
        {timeline.map((item, i) => (
          <RegisterRow key={item.title} entry={item.year} delay={i * 60}>
            <h3 className="m-0 text-[1.24em] font-semibold leading-snug">
              {item.title}
            </h3>
            <p className="mt-2 leading-relaxed text-ink-soft">{item.body}</p>
          </RegisterRow>
        ))}
      </Register>
    </section>
  )
}
