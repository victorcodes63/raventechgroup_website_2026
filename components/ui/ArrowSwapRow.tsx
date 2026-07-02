'use client'

import { ArrowUpRight } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

/** Parent must set matching `group/${name}`, e.g. `group/card` on the card `Link`. */
export type ArrowSwapGroupName = 'card' | 'consult' | 'img' | 'feat' | 'case' | 'footer'

const orderLabel: Record<ArrowSwapGroupName, string> = {
  card: 'order-1 group-hover/card:order-2',
  consult: 'order-1 group-hover/consult:order-2',
  img: 'order-1 group-hover/img:order-2',
  feat: 'order-1 group-hover/feat:order-2',
  case: 'order-1 group-hover/case:order-2',
  footer: 'order-1 group-hover/footer:order-2',
}

const orderIcon: Record<ArrowSwapGroupName, string> = {
  card: 'order-2 group-hover/card:order-1',
  consult: 'order-2 group-hover/consult:order-1',
  img: 'order-2 group-hover/img:order-1',
  feat: 'order-2 group-hover/feat:order-1',
  case: 'order-2 group-hover/case:order-1',
  footer: 'order-2 group-hover/footer:order-1',
}

type ArrowSwapRowProps = {
  children: React.ReactNode
  className?: string
  groupName?: ArrowSwapGroupName
  iconSize?: number
  strokeWidth?: number
  iconClassName?: string
}

/**
 * Text + arrow row with the same hover behavior as {@link CTAButton}: flex `order` swap, fixed gap (no layout shift).
 * Place inside an ancestor with `group/${groupName}` (typically the wrapping `Link`).
 */
export function ArrowSwapRow({
  children,
  className,
  groupName = 'card',
  iconSize = 14,
  strokeWidth = 2.2,
  iconClassName,
}: ArrowSwapRowProps) {
  return (
    <span className={twMerge('inline-flex items-center gap-2', className)}>
      <span className={twMerge('min-w-0', orderLabel[groupName])}>{children}</span>
      <span
        aria-hidden
        className={twMerge('flex shrink-0 items-center justify-center text-current', orderIcon[groupName])}
      >
        <ArrowUpRight size={iconSize} strokeWidth={strokeWidth} className={twMerge('text-current', iconClassName)} />
      </span>
    </span>
  )
}
