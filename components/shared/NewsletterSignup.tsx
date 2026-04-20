'use client'

import { FormEvent, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Loader2, Mail } from 'lucide-react'
import { CTAButtonElement } from '@/components/ui/CTAButton'

type NewsletterSignupProps = {
  source?: string
  className?: string
  title?: string
  description?: string
}

export function NewsletterSignup({
  source = 'insights',
  className = '',
  title = 'Get field notes monthly',
  description = 'One honest email per month. No spam.',
}: NewsletterSignupProps) {
  const reduced = useReducedMotion()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      const data = (await res.json()) as { success: boolean; message: string }
      if (!res.ok || !data.success) {
        setStatus('error')
        setMessage(data.message || 'Something went wrong.')
        return
      }
      setStatus('success')
      setEmail('')
      setMessage(data.message)
    } catch {
      setStatus('error')
      setMessage('Network error. Try again.')
    }
  }

  return (
    <motion.section
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`border-t border-white/[0.06] bg-[#0A0A0A] py-16 lg:py-20 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
        <div className="flex flex-col gap-8 rounded-card border border-white/[0.08] bg-[#111111] p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card border border-[#FFA91F]/25 bg-[#FFA91F]/10">
              <Mail className="h-6 w-6 text-[#FFA91F]" aria-hidden />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">{title}</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">{description}</p>
            </div>
          </div>
          <form onSubmit={onSubmit} className="flex w-full min-w-0 flex-col gap-3 sm:max-w-md sm:flex-row lg:w-auto">
            <label htmlFor="newsletter-email-field" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email-field"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-card border border-white/20 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#FFA91F] focus:bg-white/[0.08] focus:outline-none"
            />
            <CTAButtonElement
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex shrink-0 items-center justify-center gap-2 px-6 py-3.5"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Sending
                </>
              ) : (
                'Subscribe'
              )}
            </CTAButtonElement>
          </form>
        </div>
        {message ? (
          <p
            className={`mt-4 text-sm ${status === 'success' ? 'text-green-400/90' : 'text-red-400/90'}`}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </div>
    </motion.section>
  )
}
