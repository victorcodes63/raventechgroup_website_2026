'use client'

import { useState, FormEvent, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import { fadeInUp, staggerContainer, scrollReveal } from '@/lib/animations'
import { trackEvent, trackAdsConversion } from '@/components/analytics/GoogleAnalytics'
import Image from 'next/image'
import Link from 'next/link'
import { CTAButtonElement } from '@/components/ui/CTAButton'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { heroClientLogos } from '@/lib/data/clientLogos'
import { TrustedByLogoMarquee } from '@/components/trust/TrustedByLogoMarquee'
import { services } from '@/lib/data/services'

const contactPageTestimonials = [
  {
    quote:
      'We serve banks, regulators, and large employers—work that used to sprawl across sheets and email. One system now runs a mandate from first contact through billing.',
    name: 'Moses Kirui',
    role: 'Head of Operations · Eagle HR Consultants',
    image: '/images/testimonials/kirui-image.webp',
  },
  {
    quote:
      'From start to finish, the experience was patient and professional. The site reflects my brand—and I have received strong feedback from customers.',
    name: 'Huini Macharia',
    role: 'Founder · Honey Box Accessories',
    image: '/images/clients/honeybox-store.png',
  },
]

interface ContactProps {
  variant?: 'default' | 'homepage'
  /** Homepage only: omit outer section; parent provides layout (e.g. lead band grid). */
  embedded?: boolean
  /** Homepage variant only: overrides default H2 (e.g. route-specific lead-in). */
  homepageHeadline?: string
  /** Homepage variant only: overrides default subtext under the H2. */
  homepageSupporting?: string
  prefillMessage?: string
}

export function Contact({
  variant = 'default',
  embedded = false,
  homepageHeadline,
  homepageSupporting,
  prefillMessage = '',
}: ContactProps) {
  const isHomepage = variant === 'homepage'
  const leadHeadline = homepageHeadline ?? 'Send a brief. We reply within one business day.'
  const leadSupporting =
    homepageSupporting ??
    'Scope, deadlines, or a one-page problem statement—enough for a substantive first response.'
  const reducedMotion = useReducedMotion()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    const form = e.currentTarget || formRef.current
    if (!form) {
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(form)
    const attachmentEntry = formData.get('attachment')
    const attachmentName =
      attachmentEntry instanceof File && attachmentEntry.size > 0 ? attachmentEntry.name : undefined

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || undefined,
      company: formData.get('company') || undefined,
      timeline: formData.get('timeline') || undefined,
      services: formData.get('services') || undefined,
      message: formData.get('message') || undefined,
      attachmentName,
      consentUpdates: formData.get('consentUpdates') === 'on',
      projectContext: isHomepage ? formData.get('message') : undefined,
      honeypot: formData.get('website'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Failed to send message')

      setSubmitStatus('success')
      if (formRef.current) formRef.current.reset()
      else if (e.currentTarget) e.currentTarget.reset()

      trackEvent('form_submit', 'contact', isHomepage ? 'homepage' : 'contact_page')
      const adsLeadLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || ''
      if (adsLeadLabel) {
        trackAdsConversion(adsLeadLabel)
      }
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ── Homepage variant — matches footer tokens & section anatomy ──── */
  if (isHomepage) {
    const fieldShellDefault =
      'border-b border-white/[0.06] py-4 transition-colors focus-within:border-[#FFA91F]/55 focus-within:border-b-[#FFA91F]'
    const fieldShellLead = [
      'rounded-card border border-white/[0.07] bg-[#0A0A0A]/50 px-4 py-3.5 transition-[border-color,background-color] duration-200',
      'focus-within:border-white/[0.16] focus-within:bg-[#0A0A0A]/65',
    ].join(' ')
    const labelLead = 'mb-2 block text-[11px] font-medium uppercase tracking-[0.12em] text-white/40'
    const inputLead =
      'w-full border-0 bg-transparent p-0 text-sm text-white/90 placeholder:text-white/25 focus:outline-none focus:ring-0'

    const fieldShell = embedded ? fieldShellLead : fieldShellDefault

    const homepageInner = (
      <>
        <SectionEyebrow>Contact</SectionEyebrow>
        <h2
          id="homepage-contact-heading"
          className={
            embedded
              ? 'max-w-4xl text-[1.625rem] font-bold leading-[1.15] tracking-[-0.025em] text-white sm:text-[1.875rem] lg:text-[2.125rem]'
              : 'text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl lg:text-[2.5rem] lg:leading-[1.1] xl:text-[2.75rem]'
          }
        >
          {leadHeadline}
        </h2>
        <p
          className={
            embedded
              ? 'mt-5 max-w-3xl text-[15px] leading-[1.7] text-white/48 sm:text-base'
              : 'mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg'
          }
        >
          {leadSupporting}
        </p>

        <form
          id="homepage-contact-form"
          ref={formRef}
          onSubmit={handleSubmit}
          className={`relative scroll-mt-28 ${embedded ? 'mt-10 space-y-4' : 'mt-8 space-y-0 sm:mt-10'}`}
        >
          {embedded ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
                <div className={fieldShell}>
                  <label htmlFor="hp-name" className={labelLead}>
                    Full name *
                  </label>
                  <input id="hp-name" name="name" required autoComplete="name" className={inputLead} placeholder="" />
                </div>
                <div className={fieldShell}>
                  <label htmlFor="hp-email" className={labelLead}>
                    Email *
                  </label>
                  <input
                    id="hp-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputLead}
                    placeholder=""
                  />
                </div>
                <div className={fieldShell}>
                  <label htmlFor="hp-phone" className={labelLead}>
                    Phone number *
                  </label>
                  <input id="hp-phone" name="phone" type="tel" required autoComplete="tel" className={inputLead} placeholder="" />
                </div>
                <div className={fieldShell}>
                  <label htmlFor="hp-company" className={labelLead}>
                    Company *
                  </label>
                  <input
                    id="hp-company"
                    name="company"
                    required
                    autoComplete="organization"
                    className={inputLead}
                    placeholder=""
                  />
                </div>
              </div>
              <div className={fieldShell}>
                <label htmlFor="hp-message" className={labelLead}>
                  Message *
                </label>
                <textarea
                  id="hp-message"
                  name="message"
                  defaultValue={prefillMessage}
                  rows={5}
                  required
                  className={`${inputLead} min-h-[7.5rem] resize-y`}
                  placeholder=""
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-0 sm:grid-cols-2">
                <div className={`${fieldShell} sm:border-r sm:border-white/[0.06] sm:pr-6`}>
                  <label htmlFor="hp-name" className="mb-1 block text-sm font-medium text-white/70">
                    Full name *
                  </label>
                  <input
                    id="hp-name"
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full bg-transparent py-1 text-sm text-white placeholder:text-white/30 focus:outline-none"
                    placeholder=""
                  />
                </div>
                <div className={`${fieldShell} sm:pl-6`}>
                  <label htmlFor="hp-email" className="mb-1 block text-sm font-medium text-white/70">
                    Email *
                  </label>
                  <input
                    id="hp-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full bg-transparent py-1 text-sm text-white placeholder:text-white/30 focus:outline-none"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="grid gap-0 sm:grid-cols-2">
                <div className={`${fieldShell} sm:border-r sm:border-white/[0.06] sm:pr-6`}>
                  <label htmlFor="hp-phone" className="mb-1 block text-sm font-medium text-white/70">
                    Phone number *
                  </label>
                  <input
                    id="hp-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="w-full bg-transparent py-1 text-sm text-white placeholder:text-white/30 focus:outline-none"
                    placeholder=""
                  />
                </div>
                <div className={`${fieldShell} sm:pl-6`}>
                  <label htmlFor="hp-company" className="mb-1 block text-sm font-medium text-white/70">
                    Company *
                  </label>
                  <input
                    id="hp-company"
                    name="company"
                    required
                    autoComplete="organization"
                    className="w-full bg-transparent py-1 text-sm text-white placeholder:text-white/30 focus:outline-none"
                    placeholder=""
                  />
                </div>
              </div>
              <div className={fieldShell}>
                <label htmlFor="hp-message" className="mb-1 block text-sm font-medium text-white/70">
                  Message *
                </label>
                <textarea
                  id="hp-message"
                  name="message"
                  defaultValue={prefillMessage}
                  rows={4}
                  required
                  className="w-full resize-none bg-transparent py-1 text-sm text-white placeholder:text-white/30 focus:outline-none"
                  placeholder=""
                />
              </div>
            </>
          )}

          <div
            className="pointer-events-none absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden opacity-0"
            aria-hidden="true"
          >
            <label htmlFor="hp-website">Website (leave blank)</label>
            <input type="text" id="hp-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className={`space-y-4 ${embedded ? 'pt-6' : 'pt-8'}`}>
            <p className={`text-sm leading-relaxed ${embedded ? 'text-white/38' : 'text-white/45'}`}>
              We store your details to follow up on this request only. See our{' '}
              <Link
                href="/privacy"
                className={
                  embedded
                    ? 'font-medium text-white/55 underline-offset-2 transition-colors hover:text-white/85 hover:underline'
                    : 'font-medium text-[#FFA91F] underline-offset-2 hover:text-[#FFB83F] hover:underline'
                }
              >
                privacy policy
              </Link>
              .
            </p>

            {submitStatus === 'success' && (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-2 rounded-card border border-[#FFA91F]/40 bg-[#FFA91F]/10 px-4 py-3 text-sm text-white"
              >
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-[#FFA91F]" aria-hidden />
                <span>Message sent. We&apos;ll respond within one business day.</span>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-2 rounded-card border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-100"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" aria-hidden />
                <span>{errorMessage || 'Failed to send message. Please try again.'}</span>
              </motion.div>
            )}

            <CTAButtonElement
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className={`w-full px-7 py-3.5 text-sm sm:w-auto ${embedded ? 'shadow-none' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                'Send message'
              )}
            </CTAButtonElement>
          </div>
        </form>
      </>
    )

    if (embedded) {
      return (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full min-h-0"
          aria-labelledby="homepage-contact-heading"
        >
          {homepageInner}
        </motion.div>
      )
    }

    return (
      <section
        id="contact"
        aria-labelledby="homepage-contact-heading"
        className="bg-[#0A0A0A] pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12"
      >
        <div className="site-shell">
          <div className="mx-auto w-full max-w-3xl">{homepageInner}</div>
        </div>
      </section>
    )
  }

  /* ── Dedicated contact page: Problems-style dark surface, line grid (no cards) ─ */
  const labelLine =
    'mb-1 block text-[11px] font-medium uppercase tracking-[0.12em] text-white/45'
  const inputLine =
    'w-full border-0 bg-transparent p-0 text-base text-white placeholder:text-white/30 focus:outline-none focus:ring-0 sm:text-sm'
  const selectLine = `${inputLine} appearance-none pr-8 contact-form-select-chevron-dark`
  const fieldShell =
    'rounded-card border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 transition-colors focus-within:border-[#FFA91F]/45 sm:rounded-none sm:border-x-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:py-4 sm:focus-within:border-white/[0.08]'
  const leftFieldShell = `${fieldShell} sm:border-r sm:pr-6`
  const rightFieldShell = `${fieldShell} sm:pl-6`

  return (
    <>
      <section
        id="contact"
        className="relative isolate bg-[#0A0A0A] pb-14 pt-24 text-white sm:pb-20 sm:pt-32 md:pb-24 md:pt-36 lg:pt-40"
      >
        <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="w-full"
          >
            <motion.div variants={fadeInUp}>
              <SectionEyebrow>Contact</SectionEyebrow>
              <h1 className="max-w-3xl text-[2.35rem] font-bold leading-[1.04] tracking-[-0.03em] text-white md:text-4xl lg:text-5xl">
                Tell us what you are trying to fix
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50 sm:text-lg">
                We reply within one business day. Name the problem, the timeline, and what you need—enough for a substantive first response.
              </p>
            </motion.div>

            <div className="mt-9 grid gap-8 sm:mt-12 lg:mt-16 lg:grid-cols-[minmax(0,1.55fr)_minmax(260px,1fr)] lg:items-start lg:gap-x-10 lg:gap-y-0 xl:gap-x-14">
              <motion.div variants={scrollReveal}>
                <form ref={formRef} onSubmit={handleSubmit} className="relative space-y-3 sm:space-y-0">
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-0">
                    <div className={leftFieldShell}>
                      <label htmlFor="cp-name" className={labelLine}>
                        Full name *
                      </label>
                      <input id="cp-name" name="name" required autoComplete="name" className={inputLine} placeholder="" />
                    </div>
                    <div className={rightFieldShell}>
                      <label htmlFor="cp-email" className={labelLine}>
                        Email *
                      </label>
                      <input
                        id="cp-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={inputLine}
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-0">
                    <div className={leftFieldShell}>
                      <label htmlFor="cp-phone" className={labelLine}>
                        Phone *
                      </label>
                      <input id="cp-phone" name="phone" type="tel" required autoComplete="tel" className={inputLine} placeholder="" />
                    </div>
                    <div className={rightFieldShell}>
                      <label htmlFor="cp-company" className={labelLine}>
                        Company *
                      </label>
                      <input
                        id="cp-company"
                        name="company"
                        required
                        autoComplete="organization"
                        className={inputLine}
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-0">
                    <div className={leftFieldShell}>
                      <label htmlFor="cp-services" className={labelLine}>
                        Service *
                      </label>
                      <select id="cp-services" name="services" required className={selectLine} defaultValue="">
                        <option value="">Select a focus area</option>
                        {services.map((s) => (
                          <option key={s.slug} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                    <div className={rightFieldShell}>
                      <label htmlFor="cp-timeline" className={labelLine}>
                        Timeline
                      </label>
                      <select id="cp-timeline" name="timeline" className={selectLine} defaultValue="">
                        <option value="">Optional</option>
                        <option value="As soon as possible">As soon as possible</option>
                        <option value="This quarter">This quarter</option>
                        <option value="Next quarter">Next quarter</option>
                        <option value="Exploring options">Exploring options</option>
                      </select>
                    </div>
                  </div>
                  <div className={fieldShell}>
                    <label htmlFor="cp-message" className={labelLine}>
                      Message *
                    </label>
                    <textarea
                      id="cp-message"
                      name="message"
                      defaultValue={prefillMessage}
                      rows={5}
                      required
                      className={`${inputLine} min-h-[8rem] resize-y`}
                      placeholder=""
                    />
                  </div>
                  <div className={fieldShell}>
                    <label htmlFor="cp-attachment" className={labelLine}>
                      Attach a file
                    </label>
                    <input
                      id="cp-attachment"
                      name="attachment"
                      type="file"
                      className="mt-1 w-full cursor-pointer bg-transparent text-xs text-white/50 file:mr-3 file:cursor-pointer file:rounded-card file:border-0 file:bg-white/10 file:px-3 file:py-2.5 file:text-xs file:font-semibold file:text-white file:transition-colors hover:file:bg-white/15"
                    />
                    <p className="mt-2 text-[11px] text-white/35">PDF, images, or Office files up to 10 MB.</p>
                  </div>

                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="cp-website">Website (leave blank)</label>
                    <input type="text" id="cp-website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="rounded-card border border-white/[0.08] bg-white/[0.025] px-4 py-4 sm:rounded-none sm:border-x-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:py-5">
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-white/60">
                      <input
                        type="checkbox"
                        name="consentUpdates"
                        className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/20 bg-transparent text-[#FFA91F] focus:outline-none focus:ring-2 focus:ring-[#FFA91F]/40 sm:h-4 sm:w-4"
                      />
                      <span>Occasional updates from Raven (you can unsubscribe anytime).</span>
                    </label>
                  </div>

                  <div className="space-y-4 pt-6">
                    <p className="text-sm leading-relaxed text-white/45">
                      We use your details to respond to this request. See our{' '}
                      <Link
                        href="/privacy"
                        className="font-medium text-[#FFA91F] underline-offset-2 transition-colors hover:text-[#FFB83F] hover:underline"
                      >
                        privacy policy
                      </Link>
                      .
                    </p>

                    {submitStatus === 'success' && (
                      <motion.div
                        initial={reducedMotion ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-2 border-l-2 border-[#FFA91F] pl-4 text-sm text-white/90"
                      >
                        <CheckCircle size={18} className="mt-0.5 shrink-0 text-[#FFA91F]" aria-hidden />
                        <span>Message sent. We&apos;ll respond within one business day.</span>
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={reducedMotion ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-2 border-l-2 border-red-400/80 pl-4 text-sm text-red-200/95"
                      >
                        <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" aria-hidden />
                        <span>{errorMessage || 'Failed to send message. Please try again.'}</span>
                      </motion.div>
                    )}

                    <CTAButtonElement
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      className="w-full px-7 py-3.5 text-sm font-semibold sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send message'
                      )}
                    </CTAButtonElement>
                  </div>
                </form>
              </motion.div>

              <motion.div
                variants={scrollReveal}
                className="flex w-full flex-col divide-y divide-white/[0.08] rounded-card border border-white/[0.08] bg-white/[0.025] p-5 sm:max-w-lg sm:border-0 sm:bg-transparent sm:p-0 lg:sticky lg:top-32 lg:max-w-none lg:self-start"
              >
                <div className="pb-6 sm:pb-8">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/45">What clients say</p>
                  <div className="mb-3 text-4xl font-sans leading-none text-white/[0.12] sm:mb-5">&ldquo;</div>
                  <p className="text-sm leading-relaxed text-white/70">{contactPageTestimonials[activeTestimonial].quote}</p>
                  <div className="mt-6 flex flex-col gap-4 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                        <Image
                          src={contactPageTestimonials[activeTestimonial].image}
                          alt={contactPageTestimonials[activeTestimonial].name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{contactPageTestimonials[activeTestimonial].name}</p>
                        <p className="text-xs text-white/45">{contactPageTestimonials[activeTestimonial].role}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 self-end min-[390px]:self-auto">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTestimonial(
                            (i) => (i - 1 + contactPageTestimonials.length) % contactPageTestimonials.length,
                          )
                        }
                        aria-label="Previous testimonial"
                        className="flex h-9 w-9 items-center justify-center border border-white/[0.12] text-white/45 transition-colors hover:border-[#FFA91F]/45 hover:text-white"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTestimonial((i) => (i + 1) % contactPageTestimonials.length)}
                        aria-label="Next testimonial"
                        className="flex h-9 w-9 items-center justify-center border border-white/[0.12] text-white/45 transition-colors hover:border-[#FFA91F]/45 hover:text-white"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {heroClientLogos.length > 0 && (
                  <div className="hidden pt-8 sm:block">
                    <TrustedByLogoMarquee
                      staticEntrance
                      eyebrow="Trusted by teams at"
                      eyebrowAlign="center"
                    />
                    <div className="mt-8 border-t border-white/[0.08] pt-6 text-center">
                      <p className="flex flex-col items-center gap-2 text-[11px] text-white/45 sm:flex-row sm:justify-center sm:gap-0">
                        <a
                          href="mailto:hello@raventechgroup.com"
                          className="text-[#FFA91F] underline decoration-[#FFA91F]/40 underline-offset-2 transition-colors hover:text-[#FFB83F]"
                        >
                          hello@raventechgroup.com
                        </a>
                        <span className="hidden text-white/25 sm:inline sm:px-2" aria-hidden>
                          ·
                        </span>
                        <a
                          href="tel:+254796349079"
                          className="text-white/65 underline decoration-white/20 underline-offset-2 transition-colors hover:text-white"
                        >
                          +254 796 349 079
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#0A0A0A]" aria-label="Office location map">
        <div className="relative h-[260px] w-full min-h-0 sm:h-[320px] md:h-[380px]">
          <iframe
            title="Raven Tech Group location — Western Heights, Karuna Road, Westlands, Nairobi"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8541252750797!2d36.79839147697934!3d-1.2596568987283558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1765fa05ef0d%3A0xafe61a1cd961a0a3!2sRaven%20Tech%20Group!5e0!3m2!1sen!2ske!4v1762836423781!5m2!1sen!2ske"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 grayscale contrast-[0.92]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#0A0A0A]/25" aria-hidden />
        </div>
      </section>
    </>
  )
}
