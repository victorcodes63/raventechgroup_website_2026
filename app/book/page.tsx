'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Clock, MapPin, Video } from 'lucide-react'

import { CTAButtonElement } from '@/components/ui/CTAButton'
import {
  bookingServiceOptions,
  resolveBookingUrl,
  type BookingServiceId,
} from '@/lib/data/bookingServices'

const motionEase = [0.22, 1, 0.36, 1] as const

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFA91F]'

export default function BookPage() {
  const [selectedService, setSelectedService] = useState<BookingServiceId>('discovery')
  const reducedMotion = useReducedMotion()
  const instant = reducedMotion ? { opacity: 1, y: 0 } : undefined

  const activeUrl = useMemo(() => {
    const option = bookingServiceOptions.find((s) => s.id === selectedService)
    return resolveBookingUrl(selectedService, option?.bookingUrl)
  }, [selectedService])

  const handleContinue = () => {
    if (!activeUrl) return
    const win = window.open(activeUrl, '_blank', 'noopener,noreferrer')
    if (win) win.opener = null
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-[72px]">
      <div className="site-shell py-10 pb-24 lg:py-24">
        <div className="content-wrap">
          <Link
            href="/"
            className={`mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors duration-150 hover:text-white sm:mb-10 ${focusRing} rounded-card`}
          >
            <ArrowLeft size={14} aria-hidden />
            Back to home
          </Link>

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                animate={instant ?? { opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, ease: motionEase }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-6 bg-[#FFA91F]" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">
                    Free · No commitment
                  </p>
                </div>
                <h1 className="text-[2.35rem] font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                  Let us talk about what you are building.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 lg:text-lg">
                  No pitch deck. No sales theatre. Tell us what is breaking or what you are trying to ship — we will tell
                  you honestly if we are the right team for it.
                </p>
              </motion.div>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={instant ?? { opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.15, ease: motionEase }}
                className="mt-8 space-y-4 sm:mt-10 sm:space-y-5"
              >
                {[
                  {
                    icon: Clock,
                    label: 'Durations that match the work',
                    sub: '30 minutes for discovery and technical sessions; one hour for in-person.',
                  },
                  {
                    icon: Video,
                    label: 'Microsoft Teams',
                    sub: 'Discovery and technical deep dives run on Teams — link is in your confirmation email.',
                  },
                  {
                    icon: MapPin,
                    label: 'East Africa Time · Nairobi in-person',
                    sub: 'Times shown in your local timezone; in-person meetings are scheduled in Nairobi.',
                  },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-card border border-[#FFA91F]/20 bg-[#FFA91F]/10">
                      <Icon size={16} className="text-[#FFA91F]" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{label}</p>
                      <p className="mt-0.5 text-sm leading-snug text-white/50">{sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={instant ?? { opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.25, ease: motionEase }}
                className="mt-8 rounded-card border border-white/[0.08] bg-[#111111] p-5 sm:mt-10 sm:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-6 bg-[#FFA91F]" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">
                    What happens on the call
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    'You describe what you are building or what is breaking',
                    'We ask the questions most people skip in a first meeting',
                    'We tell you honestly whether we are the right fit',
                    'If yes — we sketch next steps and scope. If no — we point you elsewhere.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-snug text-white/65">
                      <CheckCircle size={14} className="mt-0.5 shrink-0 text-[#FFA91F]/70" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.p
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={instant ?? { opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.4 }}
                className="mt-8 text-xs leading-relaxed text-white/35"
              >
                Prefer email? Write to{' '}
                <a
                  href="mailto:hello@raventechgroup.com"
                  className={`text-white/55 underline decoration-white/20 underline-offset-2 transition-colors hover:text-white hover:decoration-white/40 ${focusRing} rounded-card`}
                >
                  hello@raventechgroup.com
                </a>{' '}
                — we reply within 1 business day.
              </motion.p>
            </div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={instant ?? { opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.1, ease: motionEase }}
              className="lg:pl-2"
            >
              <div className="rounded-card border border-white/[0.1] bg-[#0f0f0f] p-4 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.85)] sm:p-6 lg:p-10">
                <div className="mb-6 sm:mb-8">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Step 1 of 2</p>
                  <h2 className="text-[1.65rem] font-bold leading-tight tracking-tight text-white lg:text-3xl">
                    Choose the conversation that fits
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    Three ways to engage — then continue to Microsoft Bookings to choose a slot.
                  </p>
                </div>

                <div className="space-y-3">
                  {bookingServiceOptions.map((service) => {
                    const isSelected = selectedService === service.id
                    const Icon = service.icon
                    const formatLabel = service.meetingFormat === 'teams' ? 'Teams' : 'In person'
                    return (
                      <button
                        key={service.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedService(service.id)}
                        className={`relative w-full rounded-card border p-4 text-left transition-all duration-200 sm:p-5 ${focusRing} ${
                          isSelected
                            ? 'border-[#FFA91F]/50 bg-[#FFA91F]/[0.04]'
                            : 'border-white/[0.08] bg-[#0A0A0A] hover:border-white/[0.15] hover:bg-[#141414]'
                        }`}
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div
                            className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-card border transition-colors duration-200 ${
                              isSelected
                                ? 'border-[#FFA91F]/30 bg-[#FFA91F]/15'
                                : 'border-white/[0.06] bg-white/[0.03]'
                            }`}
                          >
                            <Icon size={16} className={isSelected ? 'text-[#FFA91F]' : 'text-white/50'} aria-hidden />
                          </div>
                          <div className="min-w-0 flex-1">
                            {service.recommended ? (
                              <span className="mb-2 inline-flex rounded-full border border-[#FFA91F]/20 bg-[#FFA91F]/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">
                                Recommended
                              </span>
                            ) : null}
                            <div className="flex flex-col gap-1 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center min-[420px]:gap-x-3">
                              <h3
                                className={`text-[15px] font-semibold leading-snug transition-colors duration-200 sm:text-base ${
                                  isSelected ? 'text-white' : 'text-white/85'
                                }`}
                              >
                                {service.title}
                              </h3>
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-white/[0.12] bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">
                                  {formatLabel}
                                </span>
                                <span className="text-xs font-medium text-white/40">{service.duration}</span>
                              </span>
                            </div>
                            <p className="mt-1.5 text-sm leading-relaxed text-white/55">{service.description}</p>
                          </div>
                          <div
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                              isSelected ? 'border-[#FFA91F] bg-[#FFA91F]' : 'border-white/20 bg-transparent'
                            }`}
                            aria-hidden
                          >
                            {isSelected ? (
                              reducedMotion ? (
                                <span className="block h-2 w-2 rounded-full bg-[#0A0A0A]" />
                              ) : (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                  className="block h-2 w-2 rounded-full bg-[#0A0A0A]"
                                />
                              )
                            ) : null}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-8 border-t border-white/[0.08] pt-8">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Step 2 of 2</p>
                  <h3 className="text-lg font-semibold text-white">Pick a time</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    Microsoft Bookings opens in a new browser tab — sign in only if your organisation requires it.
                  </p>

                  <CTAButtonElement
                    type="button"
                    variant="primary"
                    disabled={!activeUrl}
                    onClick={handleContinue}
                    className="mt-6 w-full px-6 py-4 text-sm"
                  >
                    Pick a time
                  </CTAButtonElement>

                  {!activeUrl ? (
                    <p className="mt-4 rounded-card border border-white/[0.08] bg-[#111111] px-4 py-3 text-xs leading-relaxed text-white/50">
                      Calendar link is not configured. Add{' '}
                      <code className="rounded px-1 font-mono text-[11px] text-white/65">NEXT_PUBLIC_BOOKING_URL</code>{' '}
                      to <code className="rounded px-1 font-mono text-[11px] text-white/65">.env.local</code> at the
                      project root (next to <code className="font-mono text-[11px] text-white/65">package.json</code>
                      ).
                    </p>
                  ) : null}

                  <p className="mt-5 text-center text-xs leading-relaxed text-white/35">
                    Opens our Microsoft Bookings page in a new window. Your scheduling data stays in the Microsoft 365
                    ecosystem.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3 rounded-card border border-white/[0.06] bg-[#111111]/80 p-4 text-xs leading-relaxed text-white/45">
                <CheckCircle size={14} className="mt-0.5 shrink-0 text-[#FFA91F]/60" aria-hidden />
                <span>
                  Confirmation email includes meeting details — Teams link for online sessions, or location notes for
                  in-person. Reschedule or cancel through the link in that email.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
