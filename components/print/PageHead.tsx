import { Press } from '@/components/motion/Press'

/** The letterhead block that opens every sheet in the suite. */
export function PageHead({
  mark,
  title,
  body,
}: {
  mark: string
  title: string
  body?: string
}) {
  return (
    <section className="mx-auto max-w-sheet px-[var(--gutter)] pb-[clamp(2rem,4vw,3rem)] pt-[clamp(3rem,7vw,5.5rem)]">
      <Press>
        <p className="sc text-[0.9rem] text-ink-soft">{mark}</p>
        <h1 className="mt-4 max-w-[18ch] text-balance text-[clamp(2.4rem,6.5vw,4.6rem)] font-medium leading-[1.04]">
          {title}
        </h1>
        {body ? (
          <p className="mt-6 max-w-measure text-[1.08em] leading-relaxed text-ink-soft">
            {body}
          </p>
        ) : null}
      </Press>
    </section>
  )
}
