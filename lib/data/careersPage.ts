export type CareersPillar = {
  title: string
  description: string
}

export type HiringStep = {
  step: string
  title: string
  description: string
}

export type CandidateTrait = {
  title: string
  description: string
}

export const careersPillars: CareersPillar[] = [
  {
    title: 'Owner-level accountability',
    description:
      'You work close to decisions and close to outcomes. The person framing the work is available when delivery risk appears.',
  },
  {
    title: 'Real production pressure',
    description:
      'Most projects support live operations in finance, commerce, and operations-heavy businesses. Reliability matters from day one.',
  },
  {
    title: 'Tight delivery cadence',
    description:
      'Work ships in two-week cycles. Scope is clear, demos are direct, and feedback translates into the next sprint without bureaucracy.',
  },
  {
    title: 'Growth through responsibility',
    description:
      'You get mentoring and high ownership at the same time. Better judgment, communication, and execution are part of the role.',
  },
]

export const hiringSteps: HiringStep[] = [
  {
    step: '01',
    title: 'Intro call',
    description:
      'A short conversation about your background, your strongest projects, and how you approach delivery under constraints.',
  },
  {
    step: '02',
    title: 'Practical review',
    description:
      'We review recent work or run a focused exercise that reflects real project conditions. We care about thinking quality, not tricks.',
  },
  {
    step: '03',
    title: 'Working session',
    description:
      'A collaborative discussion on architecture, trade-offs, and communication style with a small Raven panel.',
  },
  {
    step: '04',
    title: 'Decision within five business days',
    description:
      'Every candidate gets a clear outcome and concise feedback. No long silence loops and no vague next steps.',
  },
]

export const candidateTraits: CandidateTrait[] = [
  {
    title: 'You communicate early when risk appears.',
    description: 'Escalation is a strength. Hidden blockers are the expensive path.',
  },
  {
    title: 'You care about maintainability, not just launch.',
    description: 'Clean handovers, operational clarity, and documentation are expected outputs.',
  },
  {
    title: 'You can switch between depth and pace.',
    description: 'Some weeks need deep architecture work; others need fast, reliable shipping.',
  },
]
