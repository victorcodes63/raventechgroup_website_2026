'use client'

import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'
import { CTAButton, CTAButtonElement } from '@/components/ui/CTAButton'
import { aboutLeadBand, ABOUT_PAGE_CONTACT_PREFILL } from '@/lib/data/aboutPage'

export function AboutLeadBand() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus('idle')
    setErrorMessage('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setErrorMessage('Enter a valid work email.')
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'about_page' }),
      })
      const data: unknown = await res.json()
      const ok = typeof data === 'object' && data !== null && 'success' in data && (data as { success: boolean }).success
      if (!res.ok || !ok) {
        throw new Error('Could not subscribe. Try again or email hello@raventechgroup.com.')
      }
      setStatus('success')
      setEmail('')
      trackEvent('newsletter_signup', 'engagement', 'about_page')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const contactHref = `/contact?prefillMessage=${encodeURIComponent(ABOUT_PAGE_CONTACT_PREFILL)}`

  return (
    <section
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#0A0A0A] py-24 lg:py-32"
      aria-labelledby="about-lead-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[12%] h-72 w-72 rounded-full bg-[#FFA91F]/10 blur-[140px]" />
        <div className="absolute bottom-[-5%] right-[-10%] h-80 w-80 rounded-full bg-white/[0.06] blur-[160px]" />
      </div>
      <div className="relative site-shell">
        <div className="content-wrap">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center"
        >
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-[#FFA91F]" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">{aboutLeadBand.eyebrow}</span>
            </div>
            <h2
              id="about-lead-heading"
              className="mt-6 text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl lg:text-5xl lg:leading-[1.1]"
            >
              {aboutLeadBand.headline}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/60">{aboutLeadBand.subline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <CTAButton href="/book" className="justify-center px-7 py-3.5 text-sm font-semibold">
                Book a discovery call
              </CTAButton>
              <Link
                href={contactHref}
                className="inline-flex min-h-[44px] items-center justify-center px-4 text-sm font-semibold text-white/70 underline-offset-4 transition-colors hover:text-[#FFA91F]"
              >
                Or write to us first
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-card border border-white/[0.08] bg-[#111111] p-6 md:p-8">
              <p className="text-sm font-medium text-white/80">The Raven Brief — one field, no spam.</p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="about-newsletter-email" className="mb-2 block text-sm font-medium text-white/70">
                    Work email
                  </label>
                  <input
                    id="about-newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-card border border-white/20 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#FFA91F] focus:bg-white/[0.08] focus:outline-none"
                    required
                  />
                </div>
                <CTAButtonElement
                  type="submit"
                  disabled={submitting}
                  className="w-full justify-center px-7 py-3.5 text-sm font-semibold disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Subscribing…
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </CTAButtonElement>
                {status === 'success' ? (
                  <p className="flex items-center gap-2 text-sm text-green-400">
                    <CheckCircle className="h-4 w-4 shrink-0" aria-hidden />
                    You are on the list.
                  </p>
                ) : null}
                {status === 'error' ? (
                  <p className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                    {errorMessage}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
