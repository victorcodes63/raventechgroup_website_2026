import { caseStudies } from '@/lib/data/caseStudies'
import { services } from '@/lib/data/services'

export type GlobalContactLeadCopy = {
  headline: string
  supporting: string
}

export const GLOBAL_CONTACT_LEAD_DEFAULT: GlobalContactLeadCopy = {
  headline: 'Send a brief. We reply within one business day.',
  supporting:
    'Scope, deadlines, budget band, or a one-page problem statement—enough for a substantive first response.',
}

const STATIC_COPY: Record<string, Partial<GlobalContactLeadCopy>> = {
  '/about': {
    headline: 'Want to know if we are the right partner? Send a brief.',
    supporting:
      'Company context, what you are trying to ship, and where you are stuck—enough for an honest first reply.',
  },
  '/services': {
    headline: 'Unsure whether you need build, integration, or advisory first? Send a brief.',
    supporting:
      'Stack, users, regulatory context, and timeline are enough. We will map you to web, software, cloud, data, or security work—or a scoped discovery.',
  },
  '/case-studies': {
    headline: 'See a story close to yours? Send a brief with your context.',
    supporting:
      'Sector, current stack, and what changed if you do nothing—enough to tell you if we are a fit.',
  },
  '/insights': {
    headline: 'Want this level of depth on your stack? Send a brief.',
    supporting:
      'What you are building, constraints, and timeline — enough for a substantive first reply.',
  },
  '/careers': {
    headline: 'Interested in working with us? Send a note or your profile.',
    supporting:
      'Role you want, location, and a link to work we should look at. We read every message.',
  },
  '/playbooks': {
    headline: 'Want the playbooks applied to your stack? Send a brief.',
    supporting:
      'What you are trying to improve and who owns the decision—enough to propose a sensible next step.',
  },
  '/process': {
    headline: 'Ready to run this process on your systems? Send a brief.',
    supporting:
      'Where you are in delivery, blockers, and what “done” looks like—enough for a substantive first response.',
  },
}

function normalizePathname(pathname: string): string {
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1) || '/'
  }
  return pathname
}

function mergeWithDefaults(partial: Partial<GlobalContactLeadCopy> | undefined): GlobalContactLeadCopy {
  if (!partial) {
    return GLOBAL_CONTACT_LEAD_DEFAULT
  }
  return {
    headline: partial.headline ?? GLOBAL_CONTACT_LEAD_DEFAULT.headline,
    supporting: partial.supporting ?? GLOBAL_CONTACT_LEAD_DEFAULT.supporting,
  }
}

/** Resolves homepage-style contact band copy for the current route (used before the footer). */
export function getGlobalContactLeadCopy(pathname: string): GlobalContactLeadCopy {
  const path = normalizePathname(pathname)

  const serviceMatch = /^\/services\/([^/]+)$/.exec(path)
  if (serviceMatch) {
    const slug = serviceMatch[1]
    const service = services.find((s) => s.slug === slug)
    if (service) {
      return {
        headline: `Ready to discuss ${service.title}? We reply within one business day.`,
        supporting: GLOBAL_CONTACT_LEAD_DEFAULT.supporting,
      }
    }
  }

  const caseMatch = /^\/case-studies\/([^/]+)$/.exec(path)
  if (caseMatch) {
    const slug = caseMatch[1]
    const study = caseStudies.find((c) => c.slug === slug)
    if (study) {
      return {
        headline: `Building in a similar space to ${study.client}? Send a brief—we reply within one business day.`,
        supporting:
          'Share constraints, timeline, and what success looks like. Enough for a substantive first response.',
      }
    }
  }

  const insightMatch = /^\/insights\/([^/]+)$/.exec(path)
  if (insightMatch) {
    return {
      headline: 'Want this pattern applied to your systems? Send a brief.',
      supporting:
        'Stack, users, and regulatory context — enough to propose a sensible next step.',
    }
  }

  const staticPartial = STATIC_COPY[path]
  if (staticPartial) {
    return mergeWithDefaults(staticPartial)
  }

  return GLOBAL_CONTACT_LEAD_DEFAULT
}
