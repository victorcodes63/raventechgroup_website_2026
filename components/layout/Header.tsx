'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { ServicesMegaMenu } from '@/components/layout/ServicesMegaMenu'
import { services } from '@/lib/data/services'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Playbooks', href: '/playbooks' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
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

  const handleGetStarted = () => {
    if (pathname === '/') {
      // If on homepage, scroll to contact section
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        // Account for fixed header height
        const headerHeight = 80
        const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      // If on another page, navigate to homepage and scroll to contact
      router.push('/')
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          const headerHeight = 80
          const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerHeight

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 300)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-black/60'
          : 'bg-black/90 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative container mx-auto flex h-16 sm:h-20 w-full items-center gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex flex-shrink-0 items-center space-x-2 touch-manipulation">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-6"
            >
              <div className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11">
                <Image
                  src="/images/logos/raven-Square%20Icon.png"
                  alt="Raven Tech Group logo"
                  fill
                  sizes="(max-width: 640px) 32px, (max-width: 768px) 36px, 44px"
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
                    onFocus={handleServicesOpen}
                  >
                    <button
                      type="button"
                      onMouseEnter={handleServicesOpen}
                      onFocus={handleServicesOpen}
                      onClick={() => {
                        if (isServicesOpen) {
                          handleServicesCloseImmediate()
                        } else {
                          handleServicesOpen()
                        }
                      }}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                      className="text-white/80 hover:text-brand-400 transition-colors duration-200 font-medium text-sm tracking-wide inline-flex items-center space-x-2"
                    >
                      <span>Services</span>
                      <motion.span
                        animate={{ rotate: isServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                        aria-hidden
                      >
                        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M3 4l3 4 3-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.span>
                    </button>
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-brand-400 transition-colors duration-200 font-medium text-sm tracking-wide"
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA (right) */}
          <div className="hidden flex-shrink-0 items-center md:flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="px-6 py-2.5 rounded-full font-semibold bg-brand-500 text-black hover:bg-brand-400 transition-colors duration-200 shadow-[0_16px_40px_-18px_rgba(255,169,30,0.65)]"
            >
              Get Started
            </motion.button>
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
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[45] md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-sm relative z-[50]"
              >
                <div className="py-4 space-y-2 px-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
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
                                  className="block rounded-lg bg-white/5 px-4 py-3 text-sm text-white/80 transition-colors duration-200 hover:bg-brand-500/10 hover:text-brand-300 min-h-[44px] touch-manipulation"
                                onClick={() => {
                                  setIsMobileMenuOpen(false)
                                  setIsMobileServicesOpen(false)
                                }}
                              >
                                <div className="font-medium">{service.title}</div>
                                <div className="mt-1 text-white/55 text-xs leading-relaxed">
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
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      handleGetStarted()
                    }}
                    className="w-full px-6 py-3.5 rounded-full font-semibold bg-brand-500 text-black hover:bg-brand-400 transition-colors duration-200 shadow-[0_16px_40px_-18px_rgba(255,169,30,0.65)] min-h-[44px] touch-manipulation mt-2"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      <ServicesMegaMenu
        isOpen={isServicesOpen}
        onOpen={handleServicesOpen}
        onClose={handleServicesCloseImmediate}
        onSoftClose={scheduleServicesClose}
      />
    </motion.header>
  )
}

