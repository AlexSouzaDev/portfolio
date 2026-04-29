import { RevealText } from '@/components/motion/RevealText'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
}: {
  eyebrow: string
  title: string
  body?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={cn('max-w-3xl space-y-4', align === 'center' && 'mx-auto text-center')}>
      <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/68">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
        <RevealText>{title}</RevealText>
      </h2>
      {body ? <p className="text-base leading-7 text-white/64 sm:text-lg">{body}</p> : null}
    </div>
  )
}
