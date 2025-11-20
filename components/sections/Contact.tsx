'use client'

import { useState, FormEvent, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { fadeInUp, staggerContainer, scrollReveal } from '@/lib/animations'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'hello@raventechgroup.com',
    href: 'mailto:hello@raventechgroup.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+254 796 349 079',
    href: 'tel:+254796349079',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: 'Western Heights, Karuna Road, Westlands, Nairobi',
    href: 'https://www.google.com/maps/place/Western+Heights,+Karuna+Road,+Nairobi',
  },
]

interface ContactProps {
  variant?: 'default' | 'homepage'
}

export function Contact({ variant = 'default' }: ContactProps) {
  const isHomepage = variant === 'homepage'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
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
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || undefined,
      company: formData.get('company') || undefined,
      timeline: formData.get('timeline') || undefined,
      services: formData.get('services') || undefined,
      budget: formData.get('budget') || undefined,
      message: formData.get('message') || undefined,
      projectContext: isHomepage ? formData.get('message') : undefined,
      honeypot: formData.get('website'), // Honeypot field
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      setSubmitStatus('success')
      
      // Reset form safely
      if (formRef.current) {
        formRef.current.reset()
      } else if (e.currentTarget) {
        e.currentTarget.reset()
      }
      
      // Track form submission in Google Analytics
      trackEvent('form_submit', 'contact', isHomepage ? 'homepage' : 'contact_page')
      
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
    <section 
      id="contact" 
      className={`relative overflow-hidden ${
        isHomepage 
          ? 'border-t border-white/10 bg-black py-16 sm:py-20 md:py-28 text-white' 
          : 'border-t border-white/10 bg-white py-12 sm:py-16 md:py-24 text-black'
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        {isHomepage ? (
          <>
            {/* Animated gradient orbs */}
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-20 left-10 h-96 w-96 rounded-full bg-brand-500/20 blur-[120px]"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-brand-500/15 blur-[100px]"
            />
            
            {/* Animated grid pattern */}
            <motion.div
              animate={{
                backgroundPosition: ['0px 0px', '100px 100px', '0px 0px'],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(45deg, rgba(255,169,30,0.2) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,169,30,0.2) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
              }}
            />
            
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(255,169,30,0.15),_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_rgba(255,169,30,0.1),_transparent_60%)]" />
            
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,14,18,0.08),_transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,169,30,0.1)_0%,transparent_45%,rgba(14,14,18,0.08)_85%)]" />
            <div
              className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  'linear-gradient(0deg, rgba(255,169,30,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,169,30,0.18) 1px, transparent 1px)',
                backgroundSize: '140px 140px',
              }}
            />
          </>
        )}
      </div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-6xl space-y-16"
        >
          {!isHomepage && (
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black">
                Let&apos;s scope your next milestone.
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg px-4 sm:px-0 max-w-2xl mx-auto text-black/65">
                Share a brief, link your roadmap, or tell us where you&apos;re stuck. We&apos;ll respond within one business day.
              </p>
            </motion.div>
          )}

          <div className={`grid gap-8 sm:gap-12 ${isHomepage ? 'lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] max-w-6xl mx-auto lg:items-start' : 'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)]'}`}>
            {isHomepage && (
              <motion.div variants={scrollReveal} className="space-y-4 sm:space-y-5">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">Let&apos;s build together</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                  Ready to ship <span className="bg-gradient-to-r from-brand-400 to-brand-500 bg-clip-text text-transparent">technology that grows</span> with you?
                </h2>
                <p className="text-sm text-white/70 sm:text-base leading-relaxed">
                  Share your roadmap, RFP, or problem statement. We&apos;ll align on scope, assemble the right squad, and start delivering value within weeks.
                </p>
              </motion.div>
            )}
            <motion.div 
              variants={scrollReveal} 
              className={`relative overflow-hidden rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 md:p-10 backdrop-blur-xl ${
                isHomepage 
                  ? 'border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent shadow-[0_32px_100px_-24px_rgba(255,169,30,0.25)] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-brand-500/10 before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100' 
                  : 'border border-black/10 bg-white/90 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.35)]'
              }`}
            >
              {isHomepage && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              )}
              <div className="relative z-10">
              <form ref={formRef} onSubmit={handleSubmit} className={`grid gap-5 sm:gap-6 ${isHomepage ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor={`name-${variant}`} className={`mb-2.5 block text-sm font-semibold ${isHomepage ? 'text-white/90' : 'text-black/70'}`}>
                    Name *
                  </label>
                  <input
                    id={`name-${variant}`}
                    name="name"
                    required
                    className={`w-full rounded-xl px-5 py-4 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500/60 min-h-[52px] touch-manipulation ${
                      isHomepage 
                        ? 'border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-brand-500/80 focus:bg-white/15 focus:shadow-[0_0_0_4px_rgba(255,169,30,0.1)]' 
                        : 'border border-black/10 bg-white text-black placeholder:text-black/40'
                    }`}
                    placeholder="Enter your name"
                  />
                </motion.div>
                {isHomepage ? (
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor={`phone-${variant}`} className={`mb-2.5 block text-sm font-semibold ${isHomepage ? 'text-white/90' : 'text-black/70'}`}>
                      Phone Number *
                    </label>
                    <input
                      id={`phone-${variant}`}
                      name="phone"
                      type="tel"
                      required
                      className={`w-full rounded-xl px-5 py-4 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500/60 min-h-[52px] touch-manipulation ${
                        isHomepage 
                          ? 'border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-brand-500/80 focus:bg-white/15 focus:shadow-[0_0_0_4px_rgba(255,169,30,0.1)]' 
                          : 'border border-black/10 bg-white text-black placeholder:text-black/40'
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </motion.div>
                ) : null}
                <motion.div
                  className={isHomepage ? 'sm:col-span-2' : ''}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor={`email-${variant}`} className={`mb-2.5 block text-sm font-semibold ${isHomepage ? 'text-white/90' : 'text-black/70'}`}>
                    Email *
                  </label>
                  <input
                    id={`email-${variant}`}
                    name="email"
                    type="email"
                    required
                    className={`w-full rounded-xl px-5 py-4 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500/60 min-h-[52px] touch-manipulation ${
                      isHomepage 
                        ? 'border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-brand-500/80 focus:bg-white/15 focus:shadow-[0_0_0_4px_rgba(255,169,30,0.1)]' 
                        : 'border border-black/10 bg-white text-black placeholder:text-black/40'
                    }`}
                    placeholder={isHomepage ? "youremail@email.com" : "you@company.com"}
                  />
                </motion.div>
                {!isHomepage && (
                  <>
                    <div>
                      <label htmlFor={`company-${variant}`} className={`mb-2 block text-sm font-medium ${isHomepage ? 'text-white/80' : 'text-black/70'}`}>
                        Company
                      </label>
                      <input
                        id={`company-${variant}`}
                        name="company"
                        className={`w-full rounded-lg px-4 py-3.5 sm:py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/60 min-h-[44px] touch-manipulation ${
                          isHomepage 
                            ? 'border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-brand-500/60' 
                            : 'border border-black/10 bg-white text-black placeholder:text-black/40'
                        }`}
                        placeholder="Where you work"
                      />
                    </div>
                    <div>
                      <label htmlFor={`timeline-${variant}`} className={`mb-2 block text-sm font-medium ${isHomepage ? 'text-white/80' : 'text-black/70'}`}>
                        Timeline
                      </label>
                      <input
                        id={`timeline-${variant}`}
                        name="timeline"
                        className={`w-full rounded-lg px-4 py-3.5 sm:py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/60 min-h-[44px] touch-manipulation ${
                          isHomepage 
                            ? 'border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-brand-500/60' 
                            : 'border border-black/10 bg-white text-black placeholder:text-black/40'
                        }`}
                        placeholder="e.g. Q1 pilot, ongoing support"
                      />
                    </div>
                    <div>
                      <label htmlFor={`services-${variant}`} className={`mb-2 block text-sm font-medium ${isHomepage ? 'text-white/80' : 'text-black/70'}`}>
                        Area of interest
                      </label>
                      <select
                        id={`services-${variant}`}
                        name="services"
                        defaultValue=""
                        className={`w-full rounded-lg px-4 py-3.5 sm:py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/60 min-h-[44px] touch-manipulation ${
                          isHomepage 
                            ? 'border border-white/20 bg-white/10 text-white focus:border-brand-500/60' 
                            : 'border border-black/10 bg-white text-black'
                        }`}
                      >
                        <option value="" disabled className={isHomepage ? 'bg-black text-white' : 'bg-white text-black'}>
                          Select a service
                        </option>
                        <option value="software" className={isHomepage ? 'bg-black text-white' : 'bg-white text-black'}>Software platforms</option>
                        <option value="cloud" className={isHomepage ? 'bg-black text-white' : 'bg-white text-black'}>Cloud foundations</option>
                        <option value="security" className={isHomepage ? 'bg-black text-white' : 'bg-white text-black'}>Security readiness</option>
                        <option value="delivery" className={isHomepage ? 'bg-black text-white' : 'bg-white text-black'}>Embedded delivery support</option>
                        <option value="integration" className={isHomepage ? 'bg-black text-white' : 'bg-white text-black'}>Systems integration & automation</option>
                        <option value="advisory" className={isHomepage ? 'bg-black text-white' : 'bg-white text-black'}>Advisory & discovery</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`budget-${variant}`} className={`mb-2 block text-sm font-medium ${isHomepage ? 'text-white/80' : 'text-black/70'}`}>
                        Budget range
                      </label>
                      <input
                        id={`budget-${variant}`}
                        name="budget"
                        className={`w-full rounded-lg px-4 py-3.5 sm:py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/60 min-h-[44px] touch-manipulation ${
                          isHomepage 
                            ? 'border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-brand-500/60' 
                            : 'border border-black/10 bg-white text-black placeholder:text-black/40'
                        }`}
                        placeholder="Optional – helps us tailor the plan"
                      />
                    </div>
                  </>
                )}
                <motion.div
                  className={isHomepage ? 'sm:col-span-2' : 'sm:col-span-2'}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor={`message-${variant}`} className={`mb-2.5 block text-sm font-semibold ${isHomepage ? 'text-white/90' : 'text-black/70'}`}>
                    Message
                  </label>
                  <textarea
                    id={`message-${variant}`}
                    name="message"
                    rows={isHomepage ? 5 : 6}
                    className={`w-full rounded-xl px-5 py-4 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500/60 touch-manipulation resize-y ${
                      isHomepage 
                        ? 'border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-brand-500/80 focus:bg-white/15 focus:shadow-[0_0_0_4px_rgba(255,169,30,0.1)]' 
                        : 'border border-black/10 bg-white text-black placeholder:text-black/40'
                    }`}
                    placeholder={isHomepage ? "Can we help you?" : "What are you building, modernising, or reviewing?"}
                  />
                </motion.div>
                {/* Honeypot field - hidden from users, visible to bots */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                  <label htmlFor={`website-${variant}`}>Website (leave blank)</label>
                  <input
                    type="text"
                    id={`website-${variant}`}
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <motion.div className={`${isHomepage ? 'sm:col-span-2' : 'sm:col-span-2'} space-y-3`}>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                        isHomepage
                          ? 'bg-brand-500/20 text-brand-200 border border-brand-500/30'
                          : 'bg-green-50 text-green-700 border border-green-200'
                      }`}
                    >
                      <CheckCircle size={18} />
                      <span>Message sent successfully! We&apos;ll get back to you soon.</span>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                        isHomepage
                          ? 'bg-red-500/20 text-red-200 border border-red-500/30'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      <AlertCircle size={18} />
                      <span>{errorMessage || 'Failed to send message. Please try again.'}</span>
                    </motion.div>
                  )}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-brand-500 px-8 py-5 text-base font-semibold text-black transition-all duration-300 hover:bg-brand-400 min-h-[56px] touch-manipulation shadow-[0_16px_40px_-18px_rgba(255,169,30,0.65)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-brand-500`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span className="relative z-10">Sending...</span>
                      </>
                    ) : (
                      <span className="relative z-10">Send Message</span>
                    )}
                  </motion.button>
                </motion.div>
              </form>
              </div>
            </motion.div>

            {!isHomepage && (
              <motion.div variants={scrollReveal} className="space-y-6 sm:space-y-8">
              <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur ${
                isHomepage 
                  ? 'border border-white/10 bg-white/5 shadow-[0_24px_80px_-50px_rgba(255,169,30,0.15)]' 
                  : 'border border-black/10 bg-white/90 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.35)]'
              }`}>
                <h3 className={`text-lg sm:text-xl font-semibold ${isHomepage ? 'text-white' : 'text-black'}`}>Talk to us directly</h3>
                <p className={`mt-2 sm:mt-3 text-sm ${isHomepage ? 'text-white/70' : 'text-black/65'}`}>
                  Prefer a quick chat? Call or email and we&apos;ll line up a discovery session.
                </p>
                <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-5">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon
                    return (
                      <motion.a
                        key={method.title}
                        href={method.href}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-start gap-3 sm:gap-4 rounded-xl px-4 sm:px-5 py-3 sm:py-4 transition duration-200 touch-manipulation min-h-[60px] ${
                          isHomepage 
                            ? 'border border-white/10 bg-white/5 text-white hover:border-brand-400/60 hover:bg-brand-500/20' 
                            : 'border border-black/10 bg-white text-black hover:border-brand-400/60 hover:bg-brand-500/10'
                        }`}
                      >
                        <span className="mt-0.5 sm:mt-1 flex h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500 text-black">
                          <Icon size={18} className="sm:w-5 sm:h-5" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold ${isHomepage ? 'text-white' : 'text-black'}`}>{method.title}</p>
                          <p className={`text-xs sm:text-sm break-words ${isHomepage ? 'text-white/60' : 'text-black/60'}`}>{method.content}</p>
                        </div>
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              <div className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur ${
                isHomepage 
                  ? 'border border-white/10 bg-white/5 shadow-[0_24px_80px_-50px_rgba(255,169,30,0.15)]' 
                  : 'border border-black/10 bg-white/90 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.35)]'
              }`}>
                <h4 className={`text-base font-semibold ${isHomepage ? 'text-white' : 'text-black'}`}>Business Hours (EAT)</h4>
                <div className={`mt-4 space-y-2 text-sm ${isHomepage ? 'text-white/60' : 'text-black/60'}`}>
                  <div className="flex justify-between">
                    <span>Mon – Fri</span>
                    <span>8:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM – 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p className={`mt-3 text-xs ${isHomepage ? 'text-white/50' : 'text-black/50'}`}>We respond to enquiries within one business day.</p>
              </div>
            </motion.div>
            )}
          </div>

          {!isHomepage && (
            <motion.div
              variants={scrollReveal}
              className="overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 bg-white/90 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.35)] backdrop-blur"
            >
              <iframe
                title="Raven Tech Group location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8541252750797!2d36.79839147697934!3d-1.2596568987283558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1765fa05ef0d%3A0xafe61a1cd961a0a3!2sRaven%20Tech%20Group!5e0!3m2!1sen!2ske!4v1762836423781!5m2!1sen!2ske"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[280px] sm:h-[350px] md:h-[420px] w-full border-0"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

