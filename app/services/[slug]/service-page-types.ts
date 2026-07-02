export type Capability = {
  title: string
  description: string
  points?: string[]
}

export type DeliveryStep = {
  title: string
  description: string
}

export type ServiceFaq = {
  question: string
  answer: string
}

export type TeamRole = {
  role: string
  focus: string
}

export type TimelineStage = {
  phase: string
  duration: string
  focus: string
}

export type RelatedCaseStudy = {
  slug: string
  client: string
  outcome: string
}

export type ServiceHeroVariant = 'default' | 'split-trust'

/** Bottom-of-page closing block: one tailored action (contact with prefill). */
export type ServiceClosingCta = {
  eyebrow: string
  headline: string
  body: string
  /** Shown on the primary control — links to /contact with message pre-filled */
  primaryLabel: string
  /** Default text inserted into the contact form message field */
  contactPrefill: string
  /** Optional line under the button; defaults in UI if omitted */
  footnote?: string
}

export type ServiceDetail = {
  overview: string
  highlights: string[]
  outcomes: string[]
  ctaLabel: string
  heroImageAlt?: string
  /** Right column image for “What you get” — defaults to hero if unset */
  heroSupportingImage?: string
  heroSupportingImageAlt?: string
  /** ELEKS-style hero: left copy + right trust grid (legacy; cinematic hero is default) */
  heroVariant?: ServiceHeroVariant
  /** Small label above the title, e.g. "Engineering" */
  heroEyebrow?: string
  /** Hero headline first line (high contrast) */
  heroHeadline?: string
  /** Hero headline second line (muted) */
  heroHeadlineSub?: string
  /** Optional third muted line (e.g. web dev three-line headline) */
  heroHeadlineSub2?: string
  /** Optional partner or certification marks — omit unless authentic assets exist */
  awardBadges?: { name: string; logo: string }[]
  capabilities?: Capability[]
  deliveryApproach?: DeliveryStep[]
  tooling?: string[]
  faqs?: ServiceFaq[]
  engagementSignals?: string[]
  clientCommitments?: string[]
  teamStructure?: TeamRole[]
  sampleTimeline?: TimelineStage[]
  successMetrics?: string[]
  relatedCaseStudies?: RelatedCaseStudy[]
  customerFeedback?: {
    quote: string
    author: string
    role: string
    company: string
    projectContext?: string
    avatar?: string
  }[]
  certifications?: {
    name: string
    logo?: string
    description?: string
  }[]
  industries?: {
    name: string
    slug?: string
    icon?: string
  }[]
  numberedBenefits?: {
    number: string
    title: string
    description: string
  }[]
  leadershipTeam?: {
    name: string
    role: string
    bio: string
    photo?: string
  }[]
  relatedInsights?: {
    title: string
    excerpt: string
    slug: string
    /** Defaults to `/insights/{slug}` when omitted */
    href?: string
    image?: string
    readTime?: string
  }[]
  /** Injected in page.tsx via merge — tailored closing copy per service */
  closingCta?: ServiceClosingCta
}
