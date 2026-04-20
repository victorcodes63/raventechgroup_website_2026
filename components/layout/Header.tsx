'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ServicesMegaMenu } from '@/components/layout/ServicesMegaMenu'
import { NavDropdownPanel } from '@/components/layout/NavDropdownPanel'
import { services } from '@/lib/data/services'
import {
  SITE_HEADER_NAV,
  siteNavDropdownIsActive,
  siteNavLinkIsActive,
} from '@/lib/data/siteNavigation'
import { CTAButton } from '@/components/ui/CTAButton'

type OpenHeaderMenu = 'services' | 'resources' | 'company' | null

const TOP_SCROLL_THRESHOLD = 56
const SCROLL_DELTA = 8

const linkClass = (active: boolean) =>
  `inline-flex items-center text-[13px] font-medium transition-colors duration-150 lg:text-[14px] ${
    active ? 'text-white' : 'text-white/70 hover:text-white'
  }`

const linkUnderline = (active: boolean) =>
  active ? 'border-b-2 border-[#FFA91F] pb-0.5' : ''

export function Header() {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<OpenHeaderMenu>(null)
  const [mobileSubmenu, setMobileSubmenu] = useState<OpenHeaderMenu>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [nearPageTop, setNearPageTop] = useState(true)
  const [concealedByScroll, setConcealedByScroll] = useState(false)
  const [peekTop, setPeekTop] = useState(false)
  const lastScrollY = useRef(0)
  const peekLeaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearMenuCloseTimer = () => {
    if (menuCloseTimerRef.current) {
      clearTimeout(menuCloseTimerRef.current)
      menuCloseTimerRef.current = null
    }
  }

  const scheduleMenuClose = () => {
    clearMenuCloseTimer()
    menuCloseTimerRef.current = setTimeout(() => setOpenMenu(null), 140)
  }

  const openMenuNow = (id: Exclude<OpenHeaderMenu, null>) => {
    clearMenuCloseTimer()
    setOpenMenu(id)
  }

  const closeAllMenus = useCallback(() => {
    clearMenuCloseTimer()
    setOpenMenu(null)
  }, [])

  const clearPeekLeaveTimer = useCallback(() => {
    if (peekLeaveTimerRef.current) {
      clearTimeout(peekLeaveTimerRef.current)
      peekLeaveTimerRef.current = null
    }
  }, [])

  const schedulePeekTopFalse = useCallback(() => {
    clearPeekLeaveTimer()
    peekLeaveTimerRef.current = setTimeout(() => setPeekTop(false), 380)
  }, [clearPeekLeaveTimer])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setNearPageTop(y < TOP_SCROLL_THRESHOLD)

      if (window.innerWidth < 768) {
        setConcealedByScroll(false)
        lastScrollY.current = y
        return
      }

      if (y < TOP_SCROLL_THRESHOLD) {
        setConcealedByScroll(false)
      } else {
        const delta = y - lastScrollY.current
        if (delta > SCROLL_DELTA) setConcealedByScroll(true)
        else if (delta < -SCROLL_DELTA) setConcealedByScroll(false)
      }
      lastScrollY.current = y
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isDesktop && concealedByScroll && openMenu !== null) {
      clearMenuCloseTimer()
      setOpenMenu(null)
    }
  }, [isDesktop, concealedByScroll, openMenu])

  useEffect(() => {
    if (!concealedByScroll) setPeekTop(false)
  }, [concealedByScroll])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 768) {
        setConcealedByScroll(false)
        setPeekTop(false)
        clearPeekLeaveTimer()
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [clearPeekLeaveTimer])

  useEffect(() => {
    return () => clearPeekLeaveTimer()
  }, [clearPeekLeaveTimer])

  const showDesktopBar =
    !isDesktop ||
    isMobileMenuOpen ||
    openMenu !== null ||
    nearPageTop ||
    peekTop ||
    !concealedByScroll

  useEffect(() => {
    if (isMobileMenuOpen) {
      clearMenuCloseTimer()
      setOpenMenu(null)
      setMobileSubmenu(null)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    closeAllMenus()
    setIsMobileMenuOpen(false)
    setMobileSubmenu(null)
  }, [pathname, closeAllMenus])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const isServicesOpen = openMenu === 'services'

  return (
    <>
      {isDesktop && concealedByScroll ? (
        <div
          className="fixed left-0 right-0 top-0 z-[49] h-12 bg-transparent"
          aria-hidden
          onMouseEnter={() => {
            clearPeekLeaveTimer()
            setPeekTop(true)
          }}
          onMouseLeave={schedulePeekTopFalse}
        />
      ) : null}

      <motion.header
        initial={false}
        animate={{ y: isDesktop && !showDesktopBar ? '-100%' : 0 }}
        transition={{
          duration: reducedMotion ? 0 : 0.32,
          ease: [0.4, 0, 0.2, 1],
        }}
        className={`pointer-events-none fixed left-0 right-0 top-0 z-50 w-full will-change-transform transition-all duration-300 ease-in-out border-b ${
          scrolled
            ? 'border-white/[0.08] bg-[#0A0A0A]/75 backdrop-blur-xl backdrop-saturate-150'
            : 'border-white/[0.06] bg-transparent'
        }`}
        onMouseEnter={() => {
          if (isDesktop && concealedByScroll) {
            clearPeekLeaveTimer()
            setPeekTop(true)
          }
        }}
        onMouseLeave={() => {
          if (isDesktop && concealedByScroll) schedulePeekTopFalse()
        }}
      >
        <div className="site-shell pointer-events-auto">
          <div className="relative overflow-visible">
            <nav aria-label="Main navigation">
              <div className="relative flex h-[60px] w-full items-center gap-3 md:h-[72px] md:gap-6">
                <Link href="/" className="flex flex-shrink-0 self-stretch items-center space-x-2 touch-manipulation">
                  <motion.div
                    whileHover={reducedMotion ? undefined : { scale: 1.02 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                    className="flex items-center space-x-6"
                  >
                    <div className="relative h-8 w-8 md:h-9 md:w-9">
                      <Image
                        src="/images/logos/raven-Square%20Icon.png"
                        alt="Raven Tech Group logo"
                        fill
                        sizes="(max-width: 768px) 32px, 36px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </motion.div>
                </Link>

                <div className="hidden min-w-0 flex-1 items-center justify-center overflow-x-auto [scrollbar-width:none] md:flex md:justify-center [&::-webkit-scrollbar]:hidden">
                  <div className="flex items-center gap-x-3 px-1 lg:gap-x-4 xl:gap-x-6">
                    {SITE_HEADER_NAV.map((entry) => {
                      if (entry.type === 'services') {
                        return (
                          <div
                            key="services"
                            className="relative shrink-0"
                            onMouseEnter={() => openMenuNow('services')}
                            onMouseLeave={scheduleMenuClose}
                          >
                            <button
                              type="button"
                              onMouseEnter={() => openMenuNow('services')}
                              onClick={() => {
                                if (openMenu === 'services') {
                                  closeAllMenus()
                                } else {
                                  openMenuNow('services')
                                }
                              }}
                              aria-expanded={isServicesOpen}
                              aria-haspopup="true"
                              className={`inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-150 lg:text-[14px] ${
                                isServicesOpen ? 'text-[#FFA91F]' : 'text-white/70 hover:text-white'
                              }`}
                            >
                              <span>Services</span>
                              <ChevronDown
                                size={12}
                                strokeWidth={2}
                                aria-hidden
                                className={`shrink-0 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                              />
                            </button>
                          </div>
                        )
                      }

                      if (entry.type === 'link') {
                        const active = siteNavLinkIsActive(pathname, entry.href)
                        return (
                          <Link
                            key={entry.href}
                            href={entry.href}
                            onMouseEnter={closeAllMenus}
                            onFocus={closeAllMenus}
                            className={`${linkClass(active)} ${linkUnderline(active)} shrink-0`}
                          >
                            {entry.label}
                          </Link>
                        )
                      }

                      if (entry.type === 'dropdown') {
                        const dd = entry
                        const open = openMenu === dd.id
                        const childActive = siteNavDropdownIsActive(pathname, dd.id)
                        return (
                          <div
                            key={dd.id}
                            className="relative shrink-0"
                            onMouseEnter={() => openMenuNow(dd.id)}
                            onMouseLeave={scheduleMenuClose}
                          >
                            <button
                              type="button"
                              onMouseEnter={() => openMenuNow(dd.id)}
                              onClick={() => {
                                if (open) closeAllMenus()
                                else openMenuNow(dd.id)
                              }}
                              aria-expanded={open}
                              aria-haspopup="true"
                              className={`inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-150 lg:text-[14px] ${
                                open || childActive ? 'text-[#FFA91F]' : 'text-white/70 hover:text-white'
                              } ${childActive && !open ? 'border-b-2 border-[#FFA91F] pb-0.5' : ''}`}
                            >
                              <span>{dd.label}</span>
                              <ChevronDown
                                size={12}
                                strokeWidth={2}
                                aria-hidden
                                className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                              />
                            </button>
                            {open ? (
                              <NavDropdownPanel
                                dropdown={dd}
                                isOpen={open}
                                onMouseEnter={() => {
                                  clearMenuCloseTimer()
                                  openMenuNow(dd.id)
                                }}
                                onMouseLeave={scheduleMenuClose}
                                onNavigate={closeAllMenus}
                              />
                            ) : null}
                          </div>
                        )
                      }

                      return null
                    })}
                  </div>
                </div>

                <div className="hidden flex-shrink-0 items-center gap-2 md:flex lg:gap-3" onMouseEnter={closeAllMenus}>
                  <Link
                    href="/book"
                    className="rounded-card border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/85 transition-colors duration-200 hover:border-[#FFA91F] hover:text-[#FFA91F] lg:text-sm"
                  >
                    Book
                  </Link>
                  <CTAButton href="/contact" className="px-4 py-2 text-sm lg:px-5">
                    Contact
                  </CTAButton>
                </div>

                <div className="flex flex-1 md:hidden" />

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center p-2 text-white transition-colors hover:text-brand-400 md:hidden touch-manipulation"
                  aria-label="Toggle menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              <AnimatePresence>
                {isMobileMenuOpen && (
                  <>
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.2 } }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="fixed inset-0 z-[45] bg-black/50 backdrop-blur-sm md:hidden"
                    />
                    <motion.div
                      initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: { duration: reducedMotion ? 0 : 0.3 },
                      }}
                      className="relative z-[50] max-h-[min(85vh,calc(100dvh-5rem))] overflow-y-auto rounded-b-card border-t border-neutral-800 bg-black/95 backdrop-blur-sm md:hidden"
                    >
                      <div className="space-y-1 px-4 py-4 sm:px-5">
                        {SITE_HEADER_NAV.map((entry, index) => (
                          <motion.div
                            key={entry.type === 'link' ? entry.href : entry.type === 'services' ? 'services' : entry.id}
                            initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: reducedMotion ? 0 : undefined, delay: reducedMotion ? 0 : index * 0.04 }}
                          >
                            {entry.type === 'services' ? (
                              <div className="space-y-1">
                                <button
                                  type="button"
                                  className="flex w-full min-h-[44px] items-center justify-between py-3 text-left font-medium text-white/85 transition-colors duration-200 hover:text-brand-400 touch-manipulation"
                                  onClick={() =>
                                    setMobileSubmenu((prev) => (prev === 'services' ? null : 'services'))
                                  }
                                  aria-expanded={mobileSubmenu === 'services'}
                                  aria-controls="mobile-services"
                                >
                                  Services
                                  <ChevronDown
                                    size={16}
                                    className={`shrink-0 transition-transform ${mobileSubmenu === 'services' ? 'rotate-180' : ''}`}
                                    aria-hidden
                                  />
                                </button>
                                {mobileSubmenu === 'services' ? (
                                  <div id="mobile-services" className="space-y-1 pl-3">
                                    {services.map((service) => (
                                      <Link
                                        key={service.title}
                                        href={service.href}
                                        className="block min-h-[44px] rounded-card bg-white/[0.04] px-4 py-3 text-sm text-white/75 transition-colors duration-200 hover:bg-brand-500/15 hover:text-brand-300 touch-manipulation"
                                        onClick={() => {
                                          setIsMobileMenuOpen(false)
                                          setMobileSubmenu(null)
                                        }}
                                      >
                                        <div className="font-medium">{service.title}</div>
                                        <div className="mt-1 text-xs leading-relaxed text-white/40">
                                          {service.description}
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            ) : null}

                            {entry.type === 'link' ? (
                              <Link
                                href={entry.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block min-h-[44px] py-3 font-medium transition-colors duration-200 touch-manipulation ${
                                  siteNavLinkIsActive(pathname, entry.href)
                                    ? 'text-[#FFA91F]'
                                    : 'text-white/85 hover:text-brand-400'
                                }`}
                              >
                                {entry.label}
                              </Link>
                            ) : null}

                            {entry.type === 'dropdown' ? (
                              <div className="space-y-1">
                                <button
                                  type="button"
                                  className="flex w-full min-h-[44px] items-center justify-between py-3 text-left font-medium text-white/85 transition-colors duration-200 hover:text-brand-400 touch-manipulation"
                                  onClick={() =>
                                    setMobileSubmenu((prev) => (prev === entry.id ? null : entry.id))
                                  }
                                  aria-expanded={mobileSubmenu === entry.id}
                                  aria-controls={`mobile-${entry.id}`}
                                >
                                  {entry.label}
                                  <ChevronDown
                                    size={16}
                                    className={`shrink-0 transition-transform ${mobileSubmenu === entry.id ? 'rotate-180' : ''}`}
                                    aria-hidden
                                  />
                                </button>
                                {mobileSubmenu === entry.id ? (
                                  <div id={`mobile-${entry.id}`} className="space-y-1 pl-3">
                                    {entry.items.map((item) => (
                                      <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block min-h-[44px] rounded-card bg-white/[0.04] px-4 py-3 text-sm text-white/75 transition-colors duration-200 hover:bg-brand-500/15 hover:text-brand-300 touch-manipulation"
                                        onClick={() => {
                                          setIsMobileMenuOpen(false)
                                          setMobileSubmenu(null)
                                        }}
                                      >
                                        <div className="font-medium">{item.label}</div>
                                        <div className="mt-1 text-xs leading-relaxed text-white/40">{item.description}</div>
                                      </Link>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            ) : null}
                          </motion.div>
                        ))}

                        <motion.div
                          initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: reducedMotion ? 0 : undefined,
                            delay: reducedMotion ? 0 : SITE_HEADER_NAV.length * 0.04,
                          }}
                          className="flex flex-col gap-2 border-t border-white/[0.06] pt-4"
                        >
                          <Link
                            href="/book"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex min-h-[44px] items-center justify-center rounded-card border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-[#FFA91F] hover:text-[#FFA91F]"
                          >
                            Book a call
                          </Link>
                          <CTAButton
                            href="/contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full justify-center px-6 py-3"
                          >
                            Contact
                          </CTAButton>
                        </motion.div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </nav>
            <ServicesMegaMenu
              isOpen={isServicesOpen}
              onOpen={() => {
                clearMenuCloseTimer()
              }}
              onClose={closeAllMenus}
              onSoftClose={scheduleMenuClose}
            />
          </div>
        </div>
      </motion.header>
    </>
  )
}
