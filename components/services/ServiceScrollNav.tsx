'use client'

import { useEffect, useState, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export type ServiceScrollNavItem = {
  id: string
  label: string
}

export function ServiceScrollNav({ items }: { items: ServiceScrollNavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const reducedMotion = useReducedMotion()
  const itemIdsKey = items.map((i) => i.id).join('|')

  useEffect(() => {
    setActiveId(items[0]?.id ?? '')
  }, [itemIdsKey, items])

  useEffect(() => {
    const sectionElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (sectionElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visibleSections.length > 0) {
          setActiveId(visibleSections[0].target.id)
        }
      },
      {
        rootMargin: '-100px 0px -65% 0px',
        threshold: 0,
      }
    )

    sectionElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [itemIdsKey, items])

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (!element) return

    const offset = 88
    const elementTop = element.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({
      top: elementTop,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })

    setActiveId(id)
  }

  if (items.length === 0) return null

  return (
    <div className="flex flex-col">
      <nav aria-label="Section navigation">
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`group relative block py-1.5 pl-3 text-[13px] leading-tight transition-colors duration-150 ${
                    isActive ? 'font-semibold text-white' : 'text-white/45 hover:text-white/75'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 top-1/2 block h-3 w-[2px] -translate-y-1/2 bg-[#FFA91F]"
                      transition={
                        reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 40 }
                      }
                    />
                  ) : null}
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mt-10 border-t border-white/[0.06] pt-8">
        <Link href="/contact" className="group inline-flex flex-col gap-3">
          <span className="flex h-14 w-14 items-center justify-center text-[#FFA91F]/85 transition-colors duration-200 group-hover:text-[#FFA91F]">
            <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              />
            </svg>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/80 transition-colors duration-200 group-hover:text-[#FFA91F]">
            Get in touch
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </Link>
      </div>
    </div>
  )
}
