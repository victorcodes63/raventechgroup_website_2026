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
      initial={reducedMotion ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: reducedMotion ? 0 : 0.18 }}
      className="absolute left-0 top-full z-[60] pt-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menu"
      aria-label={`${dropdown.label} menu`}
    >
      <div className="min-w-[280px] max-w-[min(100vw-2rem,320px)] rounded-card border border-white/[0.1] bg-[#0A0A0A]/95 py-2 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl backdrop-saturate-150">
        {dropdown.items.map((item) => {
          const active = siteNavLinkIsActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={onNavigate}
              className={`block px-4 py-3 transition-colors ${
                active ? 'bg-[#FFA91F]/10' : 'hover:bg-white/[0.04]'
              }`}
            >
              <span className={`block text-sm font-semibold ${active ? 'text-[#FFA91F]' : 'text-white'}`}>
                {item.label}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-white/45">{item.description}</span>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
