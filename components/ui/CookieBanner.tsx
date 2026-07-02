'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CTAButtonElement } from '@/components/ui/CTAButton'

const CONSENT_EVENT = 'cookie-consent-updated'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    window.dispatchEvent(new Event(CONSENT_EVENT))
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    window.dispatchEvent(new Event(CONSENT_EVENT))
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/95 backdrop-blur-sm px-4 py-4 sm:px-6 sm:py-5"
        >
          <div className="site-shell mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div className="flex-1 sm:pr-8">
                <p className="text-sm text-white/80 leading-relaxed">
                  We use cookies to enhance your experience and analyze site usage.{' '}
                  <Link href="/cookies" className="text-brand-400 hover:text-brand-300 underline underline-offset-2 transition-colors">
                    Learn more
                  </Link>
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <CTAButtonElement
                  onClick={handleReject}
                  variant="light-outline"
                  className="px-4 py-2 text-sm"
                >
                  Decline
                </CTAButtonElement>
                <CTAButtonElement
                  onClick={handleAccept}
                  className="px-4 py-2 text-sm"
                >
                  Accept
                </CTAButtonElement>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

