'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { SiteNavDropdown } from '@/lib/data/siteNavigation'
import { siteNavLinkIsActive } from '@/lib/data/siteNavigation'
import { usePathname } from 'next/navigation'

type NavDropdownPanelProps = {
  dropdown: SiteNavDropdown
  isOpen: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onNavigate: () => void
}

export function NavDropdownPanel({
  dropdown,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onNavigate,
}: NavDropdownPanelProps) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()

  if (!isOpen) return null

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        reducedMotion ? { duration: 0 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
      }
      className="absolute left-0 top-full z-50 pt-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menu"
      aria-label={`${dropdown.label} menu`}
    >
      <div className="min-w-[280px] max-w-[min(100vw-2rem,340px)] overflow-hidden rounded-card border border-white/[0.08] bg-[#111111] shadow-[0_32px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl backdrop-saturate-150">
        {dropdown.items.map((item, index) => {
          const active = siteNavLinkIsActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={onNavigate}
              className={`block px-5 py-3.5 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                index > 0 ? 'border-t border-white/[0.06]' : ''
              } ${active ? 'bg-white/[0.05]' : 'hover:bg-white/[0.04]'}`}
            >
              <span
                className={`block text-sm font-semibold tracking-tight ${active ? 'text-brand-500' : 'text-white'}`}
              >
                {item.label}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-white/50">{item.description}</span>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
