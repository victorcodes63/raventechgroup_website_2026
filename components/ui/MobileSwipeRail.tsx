'use client'

import { Children, createContext, useContext, type ReactNode } from 'react'

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
  'flex w-full min-w-0 max-w-full snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

/** True when the rail has a single item — cards render full-width, no swipe affordance. */
const SwipeRailStaticContext = createContext(false)

export function MobileSwipeRail({
  children,
  hint = 'Swipe to see more',
  className = '',
  hintClassName = 'text-white/35',
  bleed = true,
  'aria-label': ariaLabel,
}: MobileSwipeRailProps) {
  const isStatic = Children.count(children) <= 1

  if (isStatic) {
    return (
      <SwipeRailStaticContext.Provider value={true}>
        <div className={`min-w-0 max-w-full ${className}`.trim()} aria-label={ariaLabel}>
          {children}
        </div>
      </SwipeRailStaticContext.Provider>
    )
  }

  // scroll-pl keeps the first snap point aligned with the bleed padding — without it
  // the browser snaps the first card to the scrollport edge and clips it.
  const bleedClasses = bleed ? '-mx-5 px-5 scroll-pl-5' : ''

  return (
    <div className={`min-w-0 max-w-full overflow-hidden ${className}`.trim()}>
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
  const isStatic = useContext(SwipeRailStaticContext)
  const width = isStatic ? 'w-full' : `shrink-0 snap-start ${widthClassName}`
  return <div className={`${width} ${className}`.trim()}>{children}</div>
}
