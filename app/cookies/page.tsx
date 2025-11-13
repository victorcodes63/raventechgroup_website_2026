'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function CookiesPage() {
  return (
    <main className="bg-black text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-black via-black to-zinc-950">
        <div className="container mx-auto px-4 pb-24 pt-32 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mx-auto max-w-3xl space-y-6 text-center">
            <motion.span variants={fadeInUp} className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Cookie Policy
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              How we use cookies and similar technologies.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-base text-white/65 sm:text-lg">
              Raven Tech Group uses cookies and related technologies to keep our site secure, remember preferences, and understand which content is most
              helpful. We do not sell personal data or use tracking pixels for advertising.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-black">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">Cookies we set</h2>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <span className="font-semibold text-white">Essential cookies</span>
                  <p className="mt-2 text-white/65">
                    Required for basic site functionality, security, and remembering your cookie preferences. These are always active and do not store
                    personally identifiable information.
                  </p>
                </li>
                <li className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <span className="font-semibold text-white">Analytics cookies</span>
                  <p className="mt-2 text-white/65">
                    We use privacy-focused analytics to understand aggregated site usage. Data is anonymized and never shared with advertisers. You can opt out
                    by adjusting your browser settings to block analytics scripts.
                  </p>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">Managing cookies</h2>
              <p className="text-sm text-white/70">
                Most browsers accept cookies by default, but you can usually modify your settings to decline cookies or receive alerts before they are stored.
                Blocking essential cookies may impact site functionality.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">Contact</h2>
              <p className="text-sm text-white/70">
                Have questions about how we use cookies? Email{' '}
                <Link href="mailto:privacy@raventechgroup.com" className="text-brand-300 transition hover:text-brand-200">
                  privacy@raventechgroup.com
                </Link>{' '}
                and our team will help.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}



