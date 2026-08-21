import { cn } from '@/lib/utils'

type CardProps = {
  /** Top-left slot — the phone-number position on the original. */
  mark?: React.ReactNode
  /** Top-right slot — the Pierce & Pierce position. */
  firm?: React.ReactNode
  /** The optical centre. Identity only. */
  children?: React.ReactNode
  /** The address line across the foot. */
  foot?: React.ReactNode
  /** Hold the 3.5 x 2in format. Off for memo headers, which grow. */
  ratio?: boolean
  className?: string
}

/**
 * The calling card. Corners hold the data, the centre holds the
 * identity, and everything between them is left as stock.
 */
export function Card({
  mark,
  firm,
  children,
  foot,
  ratio = true,
  className,
}: CardProps) {
  return (
    <article
      className={cn(
        'grid w-full grid-rows-[auto_1fr_auto] bg-paper-lift',
        'p-[clamp(1.4rem,3.6vw,3.2rem)]',
        'shadow-[0_1px_0_rgba(255,253,246,0.8)_inset,0_0_0_1px_var(--paper-shade),0_22px_48px_-30px_rgba(30,28,24,0.42)]',
        ratio && 'min-h-[22rem] sm:aspect-card',
        className
      )}
    >
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start sm:gap-8">
        <div className="sc deboss whitespace-nowrap text-[clamp(0.85rem,1.5vw,1.2rem)]">
          {mark}
        </div>
        <div className="deboss sm:text-right">{firm}</div>
      </div>

      <div className="grid place-content-center py-10 text-center sm:py-0">
        {children}
      </div>

      <div className="sc deboss text-center text-[clamp(0.66rem,1.28vw,1rem)] leading-relaxed">
        {foot}
      </div>
    </article>
  )
}
