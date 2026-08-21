import { Press } from '@/components/motion/Press'
import { cn } from '@/lib/utils'

type SectionHeadProps = {
  /** The marginal mark — mono, set in the left column. */
  mark: string
  title: string
  sub?: string
  className?: string
}

export function SectionHead({ mark, title, sub, className }: SectionHeadProps) {
  return (
    <Press
      className={cn(
        'mb-[clamp(2rem,4vw,3.2rem)] grid gap-x-6 gap-y-2 border-t border-rule pt-4',
        'sm:grid-cols-[7rem_1fr] sm:items-baseline',
        className
      )}
    >
      <span className="figures-lining font-mono text-micro uppercase text-ink-soft sm:pt-2">
        {mark}
      </span>
      <h2 className="m-0 text-balance text-[clamp(1.85rem,4.2vw,3.1rem)] font-medium leading-[1.1]">
        {title}
        {sub ? <span className="sc mt-2 block text-[clamp(0.82rem,1.4vw,1rem)] text-ink-soft">{sub}</span> : null}
      </h2>
    </Press>
  )
}
