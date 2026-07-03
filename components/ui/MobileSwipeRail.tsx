import type { ReactNode } from 'react'

type MobileSwipeRailProps = {
  children: ReactNode
  /** Short hint shown above the rail on touch devices */
  hint?: string
  className?: string
  hintClassName?: string
  /** Extend scroll area to section edges (matches homepage Services) */
  bleed?: boolean
  'aria-label'?: string
}

type MobileSwipeCardProps = {
  children: ReactNode
  className?: string
  widthClassName?: string
}

const SCROLL_TRACK =
  'flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

export function MobileSwipeRail({
  children,
  hint = 'Swipe to see more',
  className = '',
  hintClassName = 'text-white/35',
  bleed = true,
  'aria-label': ariaLabel,
}: MobileSwipeRailProps) {
  const bleedClasses = bleed ? '-mx-5 px-5' : ''

  return (
    <div className={className}>
      {hint ? (
        <p className={`mb-3 text-[11px] ${hintClassName}`}>{hint}</p>
      ) : null}
      <div className={`${SCROLL_TRACK} ${bleedClasses}`} aria-label={ariaLabel}>
        {children}
      </div>
    </div>
  )
}

export function MobileSwipeCard({
  children,
  className = '',
  widthClassName = 'w-[min(88vw,420px)]',
}: MobileSwipeCardProps) {
  return <div className={`shrink-0 snap-start ${widthClassName} ${className}`.trim()}>{children}</div>
}
