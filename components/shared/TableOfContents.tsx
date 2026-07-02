'use client'

import type { InsightTocItem } from '@/lib/data/insights'
import { useEffect, useState } from 'react'

type TableOfContentsProps = {
  items: InsightTocItem[]
  className?: string
}

/** px below the viewport top where a heading counts as the "current" section (clears the fixed header). */
const ACTIVE_OFFSET = 120

export function TableOfContents({ items, className = '' }: TableOfContentsProps) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    if (items.length === 0) return
    const ids = items.map((i) => i.id)
    let frame = 0

    const update = () => {
      frame = 0
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - ACTIVE_OFFSET <= 0) current = id
        else break
      }
      setActive(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [items])

  return (
    <nav aria-label="On this page" className={`text-sm ${className}`}>
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">On this page</p>
      <ul className="space-y-2 border-l border-white/[0.08] pl-4">
        {items.map((item) => {
          const isActive = active === item.id
          const pad = item.level === 3 ? 'pl-3' : ''
          return (
            <li key={item.id} className={pad}>
              <a
                href={`#${item.id}`}
                className={`block py-1 transition-colors ${
                  isActive ? 'font-semibold text-[#FFA91F]' : 'text-white/55 hover:text-white/85'
                }`}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
