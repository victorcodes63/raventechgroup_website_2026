import { Building2, Calendar, Users, type LucideIcon } from 'lucide-react'

export type BookingServiceId = 'discovery' | 'technical' | 'in-person'

/** Canonical Microsoft Bookings service-page URLs (each opens that service directly, no re-pick on Bookings). */
const BOOKING_URLS = {
  discovery:
    'https://outlook.office.com/book/RavenTechGroup1@raventechgroup.com/s/D2SQkWtFAEeI4P4-ATvQ6Q2?ismsaljsauthenabled',
  technical:
    'https://outlook.office.com/book/RavenTechGroup1@raventechgroup.com/s/iKwYRXnezUGbQW2kMPcV5g2?ismsaljsauthenabled',
  'in-person':
    'https://outlook.office.com/book/RavenTechGroup1@raventechgroup.com/s/ARgejIJ_yEWP0sJZjvC0XA2?ismsaljsauthenabled',
} as const

export type BookingServiceOption = {
  id: BookingServiceId
  title: string
  duration: string
  description: string
  icon: LucideIcon
  /** Matches Microsoft Bookings: online vs face-to-face */
  meetingFormat: 'teams' | 'in-person'
  recommended?: boolean
  /**
   * Default Bookings deep link for this card (used when per-service env is unset).
   * Env `NEXT_PUBLIC_BOOKING_URL_*` overrides this for the same id.
   */
  bookingUrl?: string
}

export const bookingServiceOptions: BookingServiceOption[] = [
  {
    id: 'discovery',
    title: 'Discovery call',
    duration: '30 minutes',
    description:
      'A focused conversation about what you are building or what is breaking. No commitment, no pitch deck.',
    icon: Users,
    meetingFormat: 'teams',
    recommended: true,
    bookingUrl: BOOKING_URLS.discovery,
  },
  {
    id: 'technical',
    title: 'Technical deep dive',
    duration: '30 minutes',
    description:
      'When you already have a brief, RFP, or a specific technical challenge and need a senior view before you commit.',
    icon: Calendar,
    meetingFormat: 'teams',
    bookingUrl: BOOKING_URLS.technical,
  },
  {
    id: 'in-person',
    title: 'In-person meeting',
    duration: '1 hour',
    description:
      'Face-to-face in Nairobi when an on-site conversation makes sense — scope, stakeholders, or sensitive context.',
    icon: Building2,
    meetingFormat: 'in-person',
    bookingUrl: BOOKING_URLS['in-person'],
  },
]

/**
 * Resolves the Microsoft Bookings URL for a selected service.
 * Order:
 * 1. `NEXT_PUBLIC_BOOKING_URL_{DISCOVERY|TECHNICAL|IN_PERSON}` (lets Vercel / .env override without code changes)
 * 2. `bookingUrl` on the option (defaults in {@link bookingServiceOptions})
 * 3. `NEXT_PUBLIC_BOOKING_URL` (umbrella fallback)
 *
 * Uses a `switch` on `serviceId` so bundlers always see static `process.env.NEXT_PUBLIC_*` accesses (required for inlining).
 */
export function resolveBookingUrl(
  serviceId: BookingServiceId,
  optionBookingUrl?: string | null
): string | undefined {
  let fromServiceEnv: string | undefined
  switch (serviceId) {
    case 'discovery':
      fromServiceEnv = process.env.NEXT_PUBLIC_BOOKING_URL_DISCOVERY?.trim()
      break
    case 'technical':
      fromServiceEnv = process.env.NEXT_PUBLIC_BOOKING_URL_TECHNICAL?.trim()
      break
    case 'in-person':
      fromServiceEnv = process.env.NEXT_PUBLIC_BOOKING_URL_IN_PERSON?.trim()
      break
  }

  if (fromServiceEnv && fromServiceEnv.length > 0) return fromServiceEnv

  const fromOption = typeof optionBookingUrl === 'string' ? optionBookingUrl.trim() : ''
  if (fromOption.length > 0) return fromOption

  const fallback = process.env.NEXT_PUBLIC_BOOKING_URL?.trim()
  if (fallback && fallback.length > 0) return fallback

  return undefined
}
