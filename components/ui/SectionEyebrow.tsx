'use client'

import { twMerge } from 'tailwind-merge'

type SectionEyebrowProps = {
  children: React.ReactNode
  className?: string
  align?: 'start' | 'center'
  /** When false, omit default bottom margin so a parent stack controls rhythm */
  gutterBottom?: boolean
}

/**
 * Section label: amber hairline + uppercase title. Use on dark sections site-wide.
 */
export function SectionEyebrow({
  children,
  className,
  align = 'start',
  gutterBottom = true,
}: SectionEyebrowProps) {
  return (
    <div
      className={twMerge(
        'flex items-center gap-3',
        gutterBottom && 'mb-6',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <div className="h-px w-8 shrink-0 bg-brand-500 md:w-10" aria-hidden />
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">{children}</span>
    </div>
  )
}
