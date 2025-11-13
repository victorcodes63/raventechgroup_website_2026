'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type Testimonial = {
  name: string
  role: string
  quote: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: "Grace Achieng'",
    role: 'Advisor, Nairobi Innovation Hub',
    quote:
      'The Raven crew are the operators we recommend when founders need steady engineering leadership without the red tape.',
    avatar: '/images/testimonials/grace.jpg',
  },
  {
    name: 'David Karanja',
    role: 'CTO, RiftPay Sacco Platform',
    quote:
      'Raven helped us modernise core banking services without downtime. Documentation and audits stayed on track the entire release.',
    avatar: '/images/testimonials/david.jpg',
  },
  {
    name: 'Amina Hassan',
    role: 'Chief Operating Officer, Horn Health',
    quote:
      'They embedded with our product squads and kept clinicians in the loop. Launching patient portals across East Africa finally felt manageable.',
    avatar: '/images/testimonials/amina.jpg',
  },
  {
    name: 'Thandiwe Moyo',
    role: 'VP Engineering, Joburg Transit Authority',
    quote:
      'Observability and resilience were built in from sprint zero. The handover runbooks still anchor our data teams today.',
    avatar: '/images/testimonials/thandiwe.jpg',
  },
  {
    name: 'Kwame Mensah',
    role: 'CEO, Accra Microfinance Cooperative',
    quote:
      'Security workshops were collaborative—not finger pointing. We left with a clear roadmap and immediate wins.',
    avatar: '/images/testimonials/kwame.jpg',
  },
  {
    name: 'Carol Njoroge',
    role: 'Community Lead, Africa Dev Collective',
    quote:
      'Raven Tech Group contributes code, mentorship, and talks—always generous with knowledge and practical guidance.',
    avatar: '/images/testimonials/carol.jpg',
  },
  {
    name: 'Kevin Mwangi',
    role: 'Product Lead, RetailMax',
    quote:
      'They kept us honest about scope, ran weekly demos, and left our internal devs confident to evolve the product.',
    avatar: '/images/testimonials/kevin.jpg',
  },
  {
    name: 'Fatima Diallo',
    role: 'Head of Operations, Dakar Energy Cooperative',
    quote:
      'Their team balanced compliance and innovation. We now deploy infrastructure changes with confidence and full audit trails.',
    avatar: '/images/testimonials/fatima.jpg',
  },
]

interface TestimonialsProps {
  variant?: 'default' | 'contact'
}

export function Testimonials({ variant = 'default' }: TestimonialsProps) {
  const gradients = [
    'from-brand-500/80 to-brand-500/40',
    'from-emerald-500/70 to-emerald-500/40',
    'from-sky-500/70 to-sky-500/40',
    'from-violet-500/70 to-violet-500/40',
  ]

  const rows = testimonials.reduce<Testimonial[][]>(
    (acc, testimonial, index) => {
      const rowIndex = index % 2
      acc[rowIndex].push(testimonial)
      return acc
    },
    [[], []],
  )

  const isContact = variant === 'contact'

  return (
    <section id="testimonials" className="relative overflow-hidden border-t border-white/10 bg-white py-12 sm:py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,14,18,0.06),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,169,30,0.08)_0%,transparent_45%,rgba(14,14,18,0.06)_85%)]" />
      </div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black">
            {isContact ? "Still unsure? Here's what our partners say." : "What people say about Raven."}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm text-black/65 sm:text-base px-4 sm:px-0">
            {isContact 
              ? "Real words from founders, advisors, and partners who've built with us — and never looked back."
              : "Voices from founders, advisors, and partners who've built with us."}
          </p>
        </div>

        <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative overflow-hidden">
              <motion.div
                className="flex w-max gap-4 sm:gap-6 md:gap-8"
                initial={{ x: rowIndex === 0 ? '0%' : '-50%' }}
                animate={{ x: rowIndex === 0 ? '-50%' : '0%' }}
                transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
              >
                {[...row, ...row].map((testimonial, index) => {
                  const gradient = gradients[index % gradients.length]

                  return (
                    <div
                      key={`${testimonial.name}-${index}`}
                      className="flex min-w-[280px] sm:min-w-[320px] max-w-[420px] flex-1 flex-col gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl border border-black/10 bg-white/90 px-4 py-5 sm:px-6 sm:py-6 shadow-[0_18px_60px_-45px_rgba(15,23,42,0.55)] backdrop-blur"
                    >
                      <p className="text-sm text-black/70 leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="mt-auto flex items-center gap-3 sm:gap-4">
                        <span
                          className={`relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${gradient} text-white font-semibold shadow-[0_12px_30px_-20px_rgba(15,23,42,0.55)] flex-shrink-0`}
                        >
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            sizes="(max-width: 640px) 48px, 56px"
                            className={`object-cover ${
                              testimonial.name.includes("Kwame") || 
                              testimonial.name.includes("Kevin") || 
                              testimonial.name.includes("Fatima") 
                                ? "object-top" 
                                : ""
                            }`}
                          />
                        </span>
                        <div className="text-left min-w-0">
                          <div className="text-sm font-semibold text-black truncate">{testimonial.name}</div>
                          <div className="text-xs uppercase tracking-[0.18em] text-black/40 truncate">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 text-center text-sm text-black/55 px-4 sm:px-0">
          Want to speak to a previous partner? <span className="font-medium text-brand-500">We&apos;re happy to make introductions.</span>
        </div>
      </div>
    </section>
  )
}