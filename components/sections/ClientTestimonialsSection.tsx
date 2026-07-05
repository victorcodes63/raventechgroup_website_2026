'use client'

import { twMerge } from 'tailwind-merge'

import {
  ClientTestimonialCarousel,
  type ClientTestimonialEntry,
} from '@/components/ui/ClientTestimonial'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'

type ClientTestimonialsSectionProps = {
  entries: ClientTestimonialEntry[]
  id?: string
  eyebrow?: string
  supporting?: string
  autoplayMs?: number
  variant?: 'default' | 'contact'
  /** Service pages: no section bg or nested site-shell — parent layout owns both */
  embedded?: boolean
  className?: string
}

export function ClientTestimonialsSection({
  entries,
  id = 'testimonials',
  eyebrow = 'What clients say',
  supporting = 'Trusted by SMEs, founders, and ops teams across Africa.',
  autoplayMs = 6500,
  variant = 'default',
  embedded = false,
  className,
}: ClientTestimonialsSectionProps) {
  const bg = embedded ? '' : variant === 'contact' ? 'bg-[#111111]' : 'bg-[#0A0A0A]'

  const header = (
    <>
      <SectionEyebrow gutterBottom={false} className="mb-3">
        {eyebrow}
      </SectionEyebrow>
      <h2 id={`${id}-heading`} className="sr-only">
        Client testimonials
      </h2>
      {supporting ? (
        <p className="mb-8 max-w-xl text-sm font-medium leading-snug tracking-tight text-white/50 sm:mb-10">
          {supporting}
        </p>
      ) : null}
    </>
  )

  if (embedded) {
    return (
      <div
        id={id}
        aria-labelledby={`${id}-heading`}
        className={twMerge('min-w-0', className)}
      >
        {header}
        <ClientTestimonialCarousel entries={entries} autoplayMs={autoplayMs} />
      </div>
    )
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={twMerge(`${bg} min-w-0 overflow-x-clip py-16 sm:py-20 lg:py-28`, className)}
    >
      <div className="site-shell min-w-0">
        {header}
        <ClientTestimonialCarousel entries={entries} autoplayMs={autoplayMs} />
      </div>
    </section>
  )
}
