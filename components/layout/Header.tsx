'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ServicesMegaMenu } from '@/components/layout/ServicesMegaMenu'
import { services } from '@/lib/data/services'
import { CTAButton } from '@/components/ui/CTAButton'

const navItems = [
  { name: 'Services', href: '/services' },
  { name: 'Problems', href: '/#problems' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Insights', href: '/insights' },
  { name: 'About', href: '/about' },
]

const TOP_SCROLL_THRESHOLD = 56
const SCROLL_DELTA = 8

export function Header() {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  /** Desktop (md+): header tucked away after scrolling down; shown on scroll up or top-edge hover */
  const [isDesktop, setIsDesktop] = useState(false)
  const [nearPageTop, setNearPageTop] = useState(true)
  const [concealedByScroll, setConcealedByScroll] = useState(false)
  const [peekTop, setPeekTop] = useState(false)
  const lastScrollY = useRef(0)
  const peekLeaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearServicesTimeout = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
      servicesTimeoutRef.current = null
    }
  }

  const handleServicesOpen = () => {
    clearServicesTimeout()
    setIsServicesOpen(true)
  }
  
  const keepServicesMenuOpen = () => {
    // Only keep an already-open menu alive when crossing into it.
    clearServicesTimeout()
  }

  const scheduleServicesClose = () => {
    clearServicesTimeout()
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 120)
  }

  const handleServicesCloseImmediate = () => {
    clearServicesTimeout()
    setIsServicesOpen(false)
  }

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
    if (isDesktop && concealedByScroll && isServicesOpen) {
      clearServicesTimeout()
      setIsServicesOpen(false)
    }
  }, [isDesktop, concealedByScroll, isServicesOpen])

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
    isServicesOpen ||
    nearPageTop ||
    peekTop ||
    !concealedByScroll

  useEffect(() => {
    if (isMobileMenuOpen) {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current)
        servicesTimeoutRef.current = null
      }
      setIsServicesOpen(false)
      setIsMobileServicesOpen(false)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    // Prevent stale focus state from reopening the desktop mega menu after navigation.
    handleServicesCloseImmediate()
    setIsMobileMenuOpen(false)
    setIsMobileServicesOpen(false)
  }, [pathname])

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

  return (
    <>
      {/* Desktop: invisible hit area when the bar is tucked away — hover reveals the header */}
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
            <div className="relative flex h-[60px] w-full items-center gap-4 md:h-[72px] md:gap-8">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
            {navItems.map((item) => {
              if (item.name === 'Services') {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={handleServicesOpen}
                    onMouseLeave={scheduleServicesClose}
                  >
                    <button
                      type="button"
                      onMouseEnter={handleServicesOpen}
                      onClick={() => {
                        if (isServicesOpen) {
                          handleServicesCloseImmediate()
                        } else {
                          handleServicesOpen()
                        }
                      }}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                      className={`inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors duration-150 ${
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

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={handleServicesCloseImmediate}
                  onFocus={handleServicesCloseImmediate}
                  className="text-[14px] font-medium text-white/70 transition-colors duration-150 hover:text-white"
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA (right) */}
          <div className="hidden flex-shrink-0 items-center md:flex" onMouseEnter={handleServicesCloseImmediate}>
            <CTAButton href="/contact" className="px-5 py-2 text-sm">
              Contact us
            </CTAButton>
          </div>

          {/* Spacer for mobile */}
          <div className="flex flex-1 md:hidden" />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-brand-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
            </div>

            {/* Mobile Navigation */}
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
                    className="relative z-[50] overflow-hidden rounded-b-card border-t border-neutral-800 bg-black/95 backdrop-blur-sm md:hidden"
                  >
                    <div className="space-y-2 px-4 py-4 sm:px-5">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: reducedMotion ? 0 : undefined, delay: reducedMotion ? 0 : index * 0.05 }}
                    >
                      {item.name === 'Services' ? (
                        <div className="space-y-2">
                          <button
                            type="button"
                            className="w-full text-left text-white/85 hover:text-brand-400 transition-colors duration-200 font-medium py-3 min-h-[44px] touch-manipulation"
                            onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                            aria-expanded={isMobileServicesOpen}
                            aria-controls="mobile-services"
                          >
                            Services
                          </button>
                          {isMobileServicesOpen && (
                            <div id="mobile-services" className="space-y-2 pl-4">
                              {services.map((service) => (
                                <Link
                                  key={service.title}
                                  href={service.href}
                                  className="block rounded-card bg-white/[0.04] px-4 py-3 text-sm text-white/75 transition-colors duration-200 hover:bg-brand-500/15 hover:text-brand-300 min-h-[44px] touch-manipulation"
                                  onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    setIsMobileServicesOpen(false)
                                  }}
                                >
                                  <div className="font-medium">{service.title}</div>
                                  <div className="mt-1 text-white/40 text-xs leading-relaxed">
                                    {service.description}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-white/85 hover:text-brand-400 transition-colors duration-200 font-medium py-3 min-h-[44px] touch-manipulation"
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : undefined,
                      delay: reducedMotion ? 0 : navItems.length * 0.05,
                    }}
                    className="mt-2"
                  >
                    <CTAButton
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full px-6 py-3"
                    >
                      Contact us
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
            onOpen={keepServicesMenuOpen}
            onClose={handleServicesCloseImmediate}
            onSoftClose={scheduleServicesClose}
          />
        </div>
      </div>
    </motion.header>
    </>
  )
}
