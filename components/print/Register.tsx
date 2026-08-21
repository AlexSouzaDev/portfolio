import Link from 'next/link'
import { Press } from '@/components/motion/Press'
import { cn } from '@/lib/utils'

/** The ruled index. Every row is a docket line: key in the margin, entry beside it. */
export function Register({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ul className={cn('m-0 list-none border-t border-rule p-0', className)}>
      {children}
    </ul>
  )
}

export function RegisterRow({
  entry,
  children,
  href,
  delay = 0,
  className,
}: {
  /** The marginal key — year, number, or route. */
  entry: React.ReactNode
  children: React.ReactNode
  href?: string
  delay?: number
  className?: string
}) {
  const body = (
    <div
      className={cn(
        'grid gap-x-6 gap-y-1 py-[1.1rem] sm:grid-cols-[7rem_1fr] sm:items-start',
        className
      )}
    >
      <span className="figures-lining font-mono text-micro uppercase text-ink-soft sm:pt-2">
        {entry}
      </span>
      <div className="max-w-measure">{children}</div>
    </div>
  )

  const external = href?.startsWith('http')

  return (
    <Press
      as="li"
      delay={delay}
      className="block border-b border-rule transition-colors duration-300 ease-press hover:border-ink"
    >
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noreferrer" className="block">
            {body}
          </a>
        ) : (
          <Link href={href} className="block">
            {body}
          </Link>
        )
      ) : (
        body
      )}
    </Press>
  )
}
