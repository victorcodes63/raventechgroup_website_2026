'use client'

import type { InsightTocItem } from '@/lib/data/insights'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type TableOfContentsProps = {
  items: InsightTocItem[]
  className?: string
}

export function TableOfContents({ items, className = '' }: TableOfContentsProps) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    if (reduced || items.length === 0) return
    const elements = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el != null)
    if (elements.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] },
    )

    elements.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [items, reduced])

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
