import type { ServiceClosingCta } from '@/app/services/[slug]/service-page-types'

/**
 * Service-page closing section: one headline, one body, one contact action with prefilled context.
 * Keys must match service slugs in `lib/data/services.ts`.
 */
export const SERVICE_CLOSING_CTA: Record<string, ServiceClosingCta> = {
  'software-development': {
    eyebrow: 'Next step',
    headline: 'Turn the next milestone into shipped software.',
    body:
      'Describe what is slow, manual, or brittle today. We reply with a delivery shape, a realistic window, and what we need from your side to start.',
    primaryLabel: 'Write us about your build',
    contactPrefill:
      'I want to discuss custom software development — current systems, goals, and any hard deadlines:',
  },
  'cloud-solutions': {
    eyebrow: 'Next step',
    headline: 'Stabilise cloud cost and risk before the next renewal cycle.',
    body:
      'Share your environments, compliance pressure, and who owns infrastructure today. We respond with a migration or operations path you can take to leadership.',
    primaryLabel: 'Discuss cloud foundations',
    contactPrefill:
      'I want to discuss cloud — AWS/Azure footprint, migration or day-two ops, and constraints:',
  },
  cybersecurity: {
    eyebrow: 'Next step',
    headline: 'Know where exposure sits — and what to fix first.',
    body:
      'Tell us your regulatory context and what keeps you up at night. We reply with assessment options, scope, and how we report findings to your board.',
    primaryLabel: 'Ask about a security review',
    contactPrefill:
      'I want to discuss cybersecurity — assessments, SDLC, compliance, or incident readiness:',
  },
  'digital-transformation': {
    eyebrow: 'Next step',
    headline: 'Align scope before you fund a multi-year programme.',
    body:
      'Outline where operations break today and what success looks like in numbers. We reply with a discovery shape and decision points before heavy spend.',
    primaryLabel: 'Start a transformation brief',
    contactPrefill:
      'I want to discuss digital transformation — units affected, timelines, and leadership expectations:',
  },
  'it-consulting': {
    eyebrow: 'Next step',
    headline: 'Get a senior view on architecture, spend, or delivery risk.',
    body:
      'Share the decision on the table — vendor choice, org design, or due diligence. We reply with how we would run the next two weeks and what artefacts you get.',
    primaryLabel: 'Request an advisory conversation',
    contactPrefill:
      'I want IT consulting / architecture or leadership cover — situation and what I need from Raven:',
  },
  'system-integration': {
    eyebrow: 'Next step',
    headline: 'Connect payments, ERPs, and APIs without fragile one-offs.',
    body:
      'List the systems involved and what “done” means for users. We reply with an integration outline, testing approach, and ownership split.',
    primaryLabel: 'Describe your integration problem',
    contactPrefill:
      'I need system integration — systems to connect, volumes, and must-go-live date if any:',
  },
  'web-development': {
    eyebrow: 'Next step',
    headline: 'Ship a site or portal that survives Kenyan mobile networks.',
    body:
      'Tell us what you sell, who it is for, and what “done” looks like. We reply with scope, timeline, and a sensible first milestone.',
    primaryLabel: 'Start a web project note',
    contactPrefill:
      'I want to discuss web development — audience, stack preferences, and target launch:',
  },
}
