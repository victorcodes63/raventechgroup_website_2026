import { Variants } from 'framer-motion'

// Fade in animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Fade in up animations
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

// Fade in down animations
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Scale in animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: 'easeOut',
  },
}

export const hoverLift = {
  y: -5,
  transition: {
    duration: 0.2,
    ease: 'easeOut',
  },
}

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

// Scroll reveal animation
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

// Hero / page title: slower stagger so copy is readable at a natural pace
const heroEase = [0.22, 1, 0.36, 1] as const

export const pageHeroBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: heroEase,
      delay: 0.32,
    },
  },
}

export const pageHeroTitleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.52,
    },
  },
}

export const pageHeroWordVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: 'blur(7px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.92,
      ease: heroEase,
    },
  },
}

export const pageHeroDescriptionVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.05,
      ease: heroEase,
      delay: 1.28,
    },
  },
}

export const pageHeroButtonVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.68,
      ease: heroEase,
      delay: 1.72,
    },
  },
}

/**
 * Home accordion hero — sub-element entrance (description, logos, footer band).
 * Defined here so Hero.tsx has zero inline animation variants (rule §6).
 */
const heroAccordionEase: [number, number, number, number] = [0.16, 1, 0.32, 1]

/**
 * Container: staggers ALL panel content top→bottom.
 * delayChildren waits for the accordion flex expansion (1.1s, decelerating ease)
 * to be ~95% settled so copy never re-wraps visibly while the panel is still growing.
 */
export const heroAccordionStaggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.09,
    },
  },
}

/** Body copy + chrome inside the active panel (blur entrance). */
export const heroAccordionRiseVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: heroAccordionEase },
  },
}

/** Active panel H1 only — no filter blur so the headline stays sharp (no glow at rest). */
export const heroAccordionTitleVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: heroAccordionEase },
  },
}

/** Home accordion hero — slow word cascade + gentle eases (no snappy spring). */
const homeAccordionHeroWordEase: [number, number, number, number] = [0.16, 1, 0.32, 1]

export const homeAccordionHeroTitleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1.05,
    },
  },
}

export const homeAccordionHeroWordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.08,
      ease: homeAccordionHeroWordEase,
    },
  },
}

export const homeAccordionHeroDescriptionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: heroEase,
      delay: 0.62,
    },
  },
}

export const homeAccordionHeroButtonVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: heroEase,
      delay: 0.9,
    },
  },
}

// ─── Problems section ────────────────────────────────────────────────────────

const problemsEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Amber CTA banner at the bottom of the Problems section: subtle scale-up. */
export const problemsBannerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: problemsEase },
  },
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Case Studies accordion — expanded panel content.
 * Fades in with a gentle y-lift when a panel becomes active;
 * fades out quickly when a panel collapses.
 */
export const caseAccordionContentVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

/**
 * Case Studies accordion — collapsed strip overlay (circle icon layer).
 * Delayed entrance so the strip doesn't flash during the expand transition;
 * exits quickly to reveal the expanding content beneath.
 */
export const caseAccordionStripVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: 'easeIn' },
  },
}

// ─── Service detail pages (/services/[slug]) ─────────────────────────────────

const serviceMotionEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Section eyebrow + H2 + subcopy — stagger children. */
export const serviceSectionHeaderGroupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

export const serviceSectionHeaderChildVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: serviceMotionEase },
  },
}

export const serviceCapabilityStaggerParentVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
}

export const serviceCapabilityStaggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: serviceMotionEase },
  },
}

export const serviceNumberedBenefitNumVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: serviceMotionEase },
  },
}

export const serviceNumberedBenefitBodyVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: serviceMotionEase, delay: 0.08 },
  },
}

export const serviceIndustryCardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: serviceMotionEase },
  },
}

export const serviceTimelineLineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0.4 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.1, ease: serviceMotionEase }, opacity: { duration: 0.4 } },
  },
}

export const serviceInsightCardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: serviceMotionEase },
  },
}

export const serviceWhatYouGetBlockVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.52, ease: serviceMotionEase },
  },
}

export const serviceBenefitWatermarkVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: serviceMotionEase },
  },
}

export const serviceTimelineDotVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: serviceMotionEase },
  },
}

