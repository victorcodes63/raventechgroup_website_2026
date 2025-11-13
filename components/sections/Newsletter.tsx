'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setSubmitStatus('error')
      setErrorMessage('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    try {
      // TODO: Integrate with your email marketing service (Mailchimp, ConvertKit, etc.)
      // For now, this sends to the same contact API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: email,
          message: 'Newsletter subscription request',
          honeypot: '', // Honeypot field
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe. Please try again.')
      }

      setSubmitStatus('success')
      setEmail('')
      
      // Track newsletter signup in Google Analytics
      trackEvent('newsletter_signup', 'engagement', 'homepage')
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="border-t border-white/10 bg-gradient-to-br from-brand-500/10 via-brand-500/5 to-transparent py-16 sm:py-20 md:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/20"
          >
            <Mail className="h-8 w-8 text-brand-400" />
          </motion.div>
          
          <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">
            Stay updated with our latest insights
          </h2>
          <p className="mb-8 text-base text-white/70 sm:text-lg">
            Get technology tips, industry updates, and exclusive content delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-base text-white placeholder:text-white/50 focus:border-brand-500/80 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-brand-500/60"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                className="rounded-xl bg-brand-500 px-8 py-4 text-base font-semibold text-black transition-colors hover:bg-brand-400 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 inline h-5 w-5 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </motion.button>
            </div>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand-500/20 px-4 py-3 text-sm text-brand-200"
              >
                <CheckCircle size={18} />
                <span>Successfully subscribed! Check your email.</span>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-red-500/20 px-4 py-3 text-sm text-red-200"
              >
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <p className="mt-4 text-xs text-white/50">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </motion.section>
  )
}

