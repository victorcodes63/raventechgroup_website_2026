'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { services } from '@/lib/data/services'
import {
  SERVICE_MEGA_CATEGORIES,
  SERVICE_MEGA_CATEGORY_SERVICES,
  type MegaMenuServiceItem,
  type ServiceMegaCategoryId,
} from '@/lib/data/serviceMegaGroups'
import { SERVICE_MEGA_MENU_ICONS } from '@/lib/data/serviceMegaMenuIcons'
import { CTAButton } from '@/components/ui/CTAButton'
import { ArrowSwapRow } from '@/components/ui/ArrowSwapRow'

type ServicesMegaMenuProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onSoftClose?: () => void
}

/** Matches /services index:4 tiles use 2 columns (2×2), never 3+1 with empty slots. */
function megaMenuGridLayout(itemCount: number): { gridClass: string; columnCount: number } {
  if (itemCount <= 1) {
    return { gridClass: 'grid-cols-1', columnCount: 1 }
  }
  if (itemCount === 2) {
    return { gridClass: 'grid-cols-1 sm:grid-cols-2', columnCount: 2 }
  }
  if (itemCount === 3) {
    return { gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', columnCount: 3 }
  }
  return { gridClass: 'grid-cols-1 sm:grid-cols-2', columnCount: 2 }
}

export function ServicesMegaMenu({ isOpen, onOpen, onClose, onSoftClose }: ServicesMegaMenuProps) {
  const reducedMotion = useReducedMotion()
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [activeCategory, setActiveCategory] = useState<ServiceMegaCategoryId>('engineering')

  const categoryConfig = useMemo(() => SERVICE_MEGA_CATEGORIES, [])

  const categoryServices = useMemo(() => SERVICE_MEGA_CATEGORY_SERVICES, [])

  const activeItems = categoryServices[activeCategory]
  const activeMeta = categoryConfig.find((c) => c.id === activeCategory)

  const { gridClass: serviceGridClass, columnCount: numCols } = megaMenuGridLayout(activeItems.length)
  const totalSlots =
    activeItems.length <= numCols ? numCols : Math.ceil(activeItems.length / numCols) * numCols
  const fillerCount = totalSlots - activeItems.length

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return

    setActiveCategory('engineering')

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (menuRef.current && !menuRef.current.contains(target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  const handleMouseLeave = () => {
    if (onSoftClose) {
      onSoftClose()
      return
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-label="Services navigation"
          initial={
            reducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -8, scale: 0.98 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            reducedMotion
              ? { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } }
              : { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }
          }
          transition={
            reducedMotion ? { duration: 0 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
          }
          onMouseEnter={onOpen}
          onMouseLeave={handleMouseLeave}
          className="pointer-events-auto absolute left-0 right-0 top-full z-40 hidden w-full min-w-0 pt-2 md:block"
        >
          <div className="w-full min-w-0">
            <div className="relative w-full min-w-0 overflow-hidden rounded-card border border-white/[0.08] bg-[#111111] shadow-[0_32px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              <div className="relative grid gap-0 lg:grid-cols-[minmax(220px,260px)_minmax(0,1fr)]">
                <div className="border-b border-white/[0.06] bg-[#0D0D0D] p-4 lg:border-b-0 lg:border-r lg:border-white/[0.06] lg:p-5">
                  <div className="mb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                      Service groups
                    </p>
                  </div>
                  <div className="space-y-0">
                    {categoryConfig.map((category) => {
                      const isActive = activeCategory === category.id
                      return (
                        <button
                          key={category.id}
                          id={`mega-group-${category.id}`}
                          type="button"
                          aria-pressed={isActive}
                          aria-controls="mega-services-panel"
                          onMouseEnter={() => setActiveCategory(category.id)}
                          onFocus={() => setActiveCategory(category.id)}
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full border-l-2 px-4 py-3 text-left transition-colors duration-150 ${
                            isActive
                              ? 'border-[#FFA91F] bg-white/[0.05] text-white'
                              : 'border-transparent text-white/65 hover:bg-white/[0.03] hover:text-white'
                          }`}
                        >
                          <p className="text-sm font-semibold">{category.label}</p>
                          <p
                            className={`mt-1 line-clamp-2 text-xs leading-relaxed ${
                              isActive ? 'text-white/45' : 'text-white/40'
                            }`}
                          >
                            {category.description}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex min-h-0 flex-col bg-[#111111] p-4 sm:p-5 lg:p-6">
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.06] pb-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFA91F]">
                        {activeMeta?.label.toUpperCase()}
                      </p>
                      <p className="mt-0.5 text-sm text-white/60">{activeMeta?.highlight}</p>
                    </div>
                    <p
                      className="shrink-0 text-right text-xs tabular-nums text-white/35"
                      aria-live="polite"
                    >
                      {activeItems.length} {activeMeta?.label}{' '}
                      {activeItems.length === 1 ? 'service' : 'services'}
                    </p>
                  </div>

                  <div
                    id="mega-services-panel"
                    role="tabpanel"
                    aria-labelledby={`mega-group-${activeCategory}`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCategory}
                        initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
                        transition={{ duration: reducedMotion ? 0 : 0.18, ease: 'easeOut' }}
                        className="overflow-hidden rounded-card"
                      >
                        <div className={`grid items-stretch gap-3 ${serviceGridClass}`}>
                          {activeItems.map((item: MegaMenuServiceItem, index: number) => {
                            const service = services.find((s) => s.slug === item.slug)
                            if (!service) return null
                            const MenuIcon = SERVICE_MEGA_MENU_ICONS[item.slug]
                            if (!MenuIcon) return null
                            const isPrimary = index === 0

                            return (
                              <Link
                                key={`${activeCategory}-${item.slug}-${item.title}`}
                                href={service.href}
                                onClick={onClose}
                                className="group/card flex h-full min-h-0 flex-col rounded-card border border-white/[0.06] bg-[#0A0A0A] p-5 transition-all duration-200 hover:border-[#FFA91F]/25 hover:bg-[#141414]"
                              >
                                <div className="flex gap-3">
                                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card border border-[#FFA91F]/20 bg-[#FFA91F]/10 text-[#FFA91F]">
                                    <MenuIcon size={18} weight="bold" aria-hidden />
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    {isPrimary && (
                                      <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#FFA91F]">
                                        Core service
                                      </span>
                                    )}
                                    <p className="text-base font-semibold leading-snug text-white">{item.title}</p>
                                    <p className="mt-1 text-xs leading-relaxed text-white/50">{item.sub}</p>
                                  </div>
                                </div>
                                <ArrowSwapRow
                                  groupName="card"
                                  iconSize={13}
                                  strokeWidth={2.4}
                                  className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]/80 group-hover/card:text-[#FFA91F]"
                                >
                                  Learn more
                                </ArrowSwapRow>
                              </Link>
                            )
                          })}
                          {Array.from({ length: fillerCount }).map((_, i) => (
                            <div
                              key={`mega-empty-${activeCategory}-${i}`}
                              aria-hidden
                              className="min-h-[140px] rounded-card border border-dashed border-white/[0.04] bg-[#0A0A0A]/50 sm:min-h-[150px]"
                            />
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-6">
                    <CTAButton href="/services" onClick={onClose} variant="primary" className="px-5 py-2 text-sm">
                      View all services
                    </CTAButton>
                    <CTAButton
                      href="/book"
                      variant="outline-dark"
                      onClick={onClose}
                      className="px-5 py-2 text-sm"
                    >
                      Book a discovery call
                    </CTAButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
