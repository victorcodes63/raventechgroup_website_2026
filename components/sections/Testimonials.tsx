'use client'

import { ClientTestimonialsSection } from '@/components/sections/ClientTestimonialsSection'
import { HOME_CLIENT_TESTIMONIALS } from '@/lib/data/clientTestimonials'

interface TestimonialsProps {
  variant?: 'default' | 'contact'
}

export function Testimonials({ variant = 'default' }: TestimonialsProps) {
  return (
    <ClientTestimonialsSection
      entries={HOME_CLIENT_TESTIMONIALS}
      variant={variant}
    />
  )
}
