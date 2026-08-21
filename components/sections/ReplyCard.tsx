import { SectionHead } from '@/components/print/SectionHead'
import { Press } from '@/components/motion/Press'
import { ReplyForm } from '@/components/sections/ReplyForm'
import { contactReasons, site } from '@/content/site'

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT

/**
 * The reply card — the tear-off card at the back of the suite.
 * Renders a real form when a form endpoint is configured at build time,
 * and the engraved address block when it is not.
 */
export function ReplyCard({ mark = '05 — Reply' }: { mark?: string }) {
  return (
    <section className="mx-auto max-w-sheet px-[var(--gutter)] py-[clamp(3.5rem,8vw,7rem)]">
      <SectionHead
        mark={mark}
        title="When the brief is ambitious, the build should be too."
      />

      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Press>
          <p className="sc text-[0.82rem] text-ink-soft">Enquiries welcome for</p>
          <ul className="mt-4 list-none border-t border-rule p-0">
            {contactReasons.map((reason) => (
              <li
                key={reason}
                className="border-b border-rule py-3.5 leading-relaxed text-ink-soft"
              >
                {reason}
              </li>
            ))}
          </ul>
        </Press>

        <Press delay={80}>
          {endpoint ? (
            <ReplyForm endpoint={endpoint} />
          ) : (
            <div className="max-w-measure">
              <p className="leading-relaxed text-ink-soft">
                Clear scope beats vague hype. Send context and I will read it
                properly.
              </p>
              <p className="mt-8">
                <a
                  href={`mailto:${site.email}`}
                  className="sc ink-bleed text-[clamp(1.2rem,3vw,2rem)] transition-colors duration-300 ease-press hover:text-seal"
                >
                  {site.email}
                </a>
              </p>
              <p className="figures-lining mt-8 font-mono text-micro uppercase text-ink-soft">
                {site.location} &nbsp;&middot;&nbsp; replies within two days
              </p>
            </div>
          )}
        </Press>
      </div>
    </section>
  )
}
