'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

import { services } from '@/lib/data/services'

type ServicesMegaMenuProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onSoftClose?: () => void
}

export function ServicesMegaMenu({ isOpen, onOpen, onClose, onSoftClose }: ServicesMegaMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null)

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
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          onMouseEnter={onOpen}
          onFocusCapture={onOpen}
          onMouseLeave={handleMouseLeave}
          className="pointer-events-auto absolute left-0 right-0 top-full z-40 hidden pt-2 md:block"
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <motion.div
              layout
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_32px_140px_-48px_rgba(12,12,18,0.9)]"
              style={{ minHeight: '25vh' }}
            >
              <div className="relative grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:gap-12">
                <div className="flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 self-start rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
                      Explore Services
                    </span>
                    <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                      Solutions engineered for resilient, modern enterprises.
                    </h3>
                    <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                      From strategy to deployment, our teams craft end-to-end experiences that unlock new
                      growth, performance, and security for your organisation.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/services"
                      onClick={onClose}
                      className="inline-flex items-center justify-center rounded-full border border-brand-400/60 bg-brand-400 px-5 py-2 text-sm font-semibold text-black shadow-[0_16px_40px_-18px_rgba(255,169,30,0.55)] transition duration-200 hover:-translate-y-0.5 hover:bg-brand-300"
                    >
                      View Services
                    </Link>
                    <Link
                      href="/contact"
                      onClick={onClose}
                      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white transition duration-200 hover:border-white/30 hover:bg-white/10"
                    >
                      Book a consultation
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((service, index) => {
                    const Icon = service.Icon
                    return (
                      <Link
                        key={service.slug}
                        href={service.href}
                        onClick={onClose}
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-brand-400/60 hover:bg-brand-400/5 hover:shadow-[0_14px_60px_-30px_rgba(255,169,30,0.45)]"
                      >
                        <motion.span
                          layout
                          className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-300 transition duration-200 group-hover:bg-brand-400/20 group-hover:text-brand-200"
                        >
                          <Icon className="h-6 w-6" aria-hidden />
                        </motion.span>
                        <div className="space-y-2">
                          <p className="text-base font-semibold text-white group-hover:text-brand-200">
                            {service.title}
                          </p>
                          <p className="text-sm leading-relaxed text-white/60">{service.description}</p>
                        </div>
                        <motion.span
                          layout
                          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/50 transition duration-200 group-hover:text-brand-200"
                        >
                          Learn more
                          <svg
                            className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden
                          >
                            <path
                              d="M2 6h8M6 2l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.span>

                        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent" />
                        </div>

                        <span className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-400/10 blur-2xl transition duration-200 group-hover:-right-6 group-hover:-top-6" />
                      </Link>
                    )
                  })}
                  {services.length % 2 !== 0 && (
                    <div className="hidden rounded-2xl border border-dashed border-white/10 sm:flex sm:items-center sm:justify-center">
                      <span className="text-xs uppercase tracking-[0.3em] text-white/30">More coming soon</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

