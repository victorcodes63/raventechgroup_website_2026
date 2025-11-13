'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, staggerContainer, pageHeroBadgeVariants, pageHeroTitleVariants, pageHeroWordVariants, pageHeroDescriptionVariants, pageHeroButtonVariants } from '@/lib/animations'
import { Contact } from '@/components/sections/Contact'
import { Testimonials } from '@/components/sections/Testimonials'

const HERO_GRID_SVG = `
  <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>
    <rect x='0.4' y='0.4' width='59.2' height='59.2' fill='none' stroke='rgba(255,169,30,0.18)' stroke-width='0.8' />
    <path d='M30 0 V60 M0 30 H60' fill='none' stroke='rgba(255,169,30,0.08)' stroke-width='0.65' />
    <circle cx='0' cy='0' r='1.6' fill='rgba(255,169,30,0.12)' />
    <circle cx='60' cy='0' r='1.6' fill='rgba(255,169,30,0.12)' />
    <circle cx='0' cy='60' r='1.6' fill='rgba(255,169,30,0.12)' />
    <circle cx='60' cy='60' r='1.6' fill='rgba(255,169,30,0.12)' />
    <circle cx='30' cy='0' r='1' fill='rgba(255,169,30,0.08)' />
    <circle cx='0' cy='30' r='1' fill='rgba(255,169,30,0.08)' />
    <circle cx='60' cy='30' r='1' fill='rgba(255,169,30,0.08)' />
    <circle cx='30' cy='60' r='1' fill='rgba(255,169,30,0.08)' />
  </svg>
`

const HERO_GRID_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(HERO_GRID_SVG)}")`

const quickLinks = [
  { label: 'Book a consultation', href: '/services' },
  { label: 'Browse playbooks', href: '/playbooks' },
  { label: 'Read about us', href: '/about' },
]

export default function ContactPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,26,30,0.6),_rgba(0,0,0,0.9))]"
          />
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: HERO_GRID_PATTERN,
              backgroundSize: '60px 60px',
              backgroundRepeat: 'repeat',
              opacity: 0.55,
            }}
            animate={{ backgroundPosition: ['0px 0px', '40px 28px', '0px 0px'] }}
            transition={{
              backgroundPosition: {
                duration: 24,
                ease: 'easeInOut',
                repeat: Infinity,
              },
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.2 }}
            className="absolute bottom-[-150px] left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-brand-500/16 blur-[150px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0),_rgba(0,0,0,0.86) 70%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pb-24 pt-32 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-4xl text-center">
            <motion.span
              variants={pageHeroBadgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
            >
              Contact Raven Tech Group
            </motion.span>
            <motion.h1
              variants={pageHeroTitleVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {'Let\'s scope your next delivery milestone.'.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  variants={pageHeroWordVariants}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              variants={pageHeroDescriptionVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto mt-6 max-w-2xl text-base text-white/65 sm:text-lg"
            >
              Tell us about the platform you're planning, the systems you're modernising, or the infrastructure you need secured. Our leads reply within
              24 hours, and you'll talk directly to the people responsible for delivery.
            </motion.p>
          </motion.div>
          <motion.div
            variants={pageHeroButtonVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-white/55"
          >
            {quickLinks.map((link) => (
              <Link key={link.label} href={link.href} className="rounded-full border border-white/15 px-4 py-2 transition duration-200 hover:border-brand-400 hover:text-brand-200">
                {link.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      <Contact />
      
      {/* FAQ Section */}
      <section className="border-t border-white/10 bg-white py-12 sm:py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,14,18,0.06),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,169,30,0.08)_0%,transparent_45%,rgba(14,14,18,0.06)_85%)]" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 sm:space-y-5">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-black/50">Quick answers</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black">
                  Quick answers before you reach out.
                </h2>
                <p className="text-sm text-black/70 sm:text-base leading-relaxed">
                  Got something on your mind? Check below — or just send us a message, we'll take it from there.
                </p>
              </motion.div>
              <div className="space-y-4">
                {[
                  {
                    question: 'How quickly can you respond to my inquiry?',
                    answer: 'We aim to respond to all inquiries within one business day. For urgent matters, please call us directly at +254 796 349 079.',
                  },
                  {
                    question: 'What information should I include in my message?',
                    answer: 'Share your project goals, timeline, budget range (if known), and any specific challenges you\'re facing. The more context you provide, the better we can tailor our response.',
                  },
                  {
                    question: 'Do you offer free consultations?',
                    answer: 'Yes, we offer a complimentary discovery call to understand your needs and determine if we\'re a good fit. This typically lasts 30-45 minutes and helps us provide a more accurate proposal.',
                  },
                  {
                    question: 'What happens after I submit the contact form?',
                    answer: 'You\'ll receive an automated confirmation email, and our team will review your inquiry. We\'ll schedule a discovery call within 1-2 business days to discuss your project in detail.',
                  },
                  {
                    question: 'Can you work with teams outside of Kenya?',
                    answer: 'Absolutely. While our headquarters is in Nairobi, we work with clients across Africa and Europe. We offer hybrid delivery models with in-person strategy sessions and remote collaboration.',
                  },
                  {
                    question: 'What types of projects do you typically take on?',
                    answer: 'We focus on software development, cloud solutions, cybersecurity, digital transformation, IT consulting, and system integration. We work best with regulated industries, financial services, and growth-stage SMEs.',
                  },
                ].map((faq, index) => (
                  <motion.details
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 bg-white/90 px-6 py-5 text-left transition duration-200 open:border-brand-400/60 open:bg-brand-400/10 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.35)] backdrop-blur"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-black sm:text-base">
                      <span>{faq.question}</span>
                      <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-black/20 text-black/60 transition duration-200 group-open:border-brand-500 group-open:text-brand-500">
                        <span className="transition-transform duration-200 group-open:rotate-45">+</span>
                      </span>
                    </summary>
                    <p className="mt-4 text-sm text-black/65 sm:text-base leading-relaxed">{faq.answer}</p>
                  </motion.details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials variant="contact" />
    </main>
  )
}


