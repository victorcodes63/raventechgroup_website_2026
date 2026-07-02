'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { Contact } from '@/components/sections/Contact'
import { SITE_SECTION_STAGGER } from '@/lib/siteScrollMotion'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
function ContactWithPrefill() {
  const searchParams = useSearchParams()
  const prefillMessage = searchParams.get('prefillMessage') || searchParams.get('message') || ''
  return <Contact prefillMessage={prefillMessage} />
}

const faqItems = [
  {
    question: 'How soon will I hear back?',
    answer:
      'Same day. Every enquiry gets a real response from the Raven team before end of business — not an automated acknowledgement, not a ticket number.',
  },
  {
    question: 'What should I put in my message?',
    answer:
      "Whatever you have. A rough idea, a specific problem, or even just the name of your business and what's frustrating you right now. We'll ask the right questions on the call.",
  },
  {
    question: 'Is the first call really free?',
    answer:
      "Completely. No invoice, no obligation, no sales pitch dressed up as a consultation. We use the first call to understand your situation — you use it to decide if we're the right fit.",
  },
  {
    question: 'What happens after I hit send?',
    answer:
      "You'll hear from us the same day. If your project is a good fit we'll book a scoping call, walk through your requirements, and follow up with a clear proposal within five working days.",
  },
  {
    question: 'We’re not based in Kenya—can you still work with us?',
    answer:
      'Yes. We work with businesses across Africa. Delivery is hybrid — remote by default, on-site where it matters. Location has never been a reason to say no.',
  },
  {
    question: 'What kind of businesses do you work with?',
    answer:
      "SMEs, SACCOs, fintechs, and growth-stage businesses that have outgrown their current setup and need a technology partner who can build, not just advise. If you're still running critical operations on WhatsApp and spreadsheets, you're exactly who we built this for.",
  },
]

type FaqItem = (typeof faqItems)[number]

function ContactFaqAccordion({ items }: { items: FaqItem[] }) {
  const reducedMotion = useReducedMotion()
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set())

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <div className="divide-y divide-white/[0.08]">
      {items.map((faq, index) => {
        const isOpen = openKeys.has(faq.question)
        const triggerId = `contact-faq-trigger-${index}`
        const panelId = `contact-faq-panel-${index}`

        return (
          <div key={faq.question} className="py-4 sm:py-5">
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(faq.question)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-sm font-semibold text-white sm:text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#FFA91F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            >
              <span className="pr-2">{faq.question}</span>
              <motion.span
                aria-hidden
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={transition}
                className={`text-lg leading-none ${isOpen ? 'text-[#FFA91F]' : 'text-white/40'}`}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={transition}
                  className="overflow-hidden"
                >
                  <div className="mt-3 border-t border-white/[0.06] pt-3">
                    <p className="text-sm leading-relaxed text-white/55 sm:text-[15px]">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default function ContactPage() {
  const s = (n: number) => n * SITE_SECTION_STAGGER
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <ScrollReveal delay={s(0)}>
        <Suspense fallback={null}>
          <ContactWithPrefill />
        </Suspense>
      </ScrollReveal>

      <ScrollReveal delay={s(1)}>
        <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-16 text-white sm:py-20 lg:py-32">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
            <div className="grid w-full gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 shrink-0 bg-[#FFA91F] md:w-10" aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FFA91F]">Before you write</span>
                </div>
                <h2 className="text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
                  Quick answers for busy owners
                </h2>
                <p className="max-w-md text-base leading-relaxed text-white/50 sm:text-lg">
                  No jargon here—just how we usually work. Still unsure? Send the form anyway; we&apos;d rather read your note than lose you
                  to a FAQ.
                </p>
              </motion.div>
              <ContactFaqAccordion items={faqItems} />
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  )
}
