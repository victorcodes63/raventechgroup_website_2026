export type ProblemPattern = {
  title: string
  body: string
}

export type FitCheckItem = {
  number: string
  label: string
  detail: string
}

export const problemsSection = {
  eyebrow: 'Where growth stalls',
  headline: 'People are rarely the problem. The systems they work in are.',
  subline:
    'Growth-stage companies in Kenya do not stall because the team is weak. They stall because HR, payroll, finance, and operations never shared a system.',
  image: {
    src: '/images/photos/foundation.jpeg',
    alt: 'Exposed conduit and cracked concrete on an office building — infrastructure added after the structure was already standing',
    caption: 'Systems bolted on after the company was already running.',
  },
  patterns: [
    {
      title: 'No shared ledger',
      body: 'HR, payroll, and finance each keep their own version of the same company. Month-end is a negotiation.',
    },
    {
      title: 'Excel is the integration layer',
      body: 'Every report starts with an export. By the time the numbers agree, the decision has already been made.',
    },
    {
      title: 'Software bought for last year’s gap',
      body: 'A tool for payroll. Another for leave. WhatsApp for the rest. None of them were designed to run the company.',
    },
    {
      title: 'Headcount as the workaround',
      body: 'People hired to keep the old system running. The payroll grew. The system did not.',
    },
  ] satisfies readonly ProblemPattern[],
  closeHeadline: 'Then they call Raven.',
  closeRavenWord: 'Raven.',
  closeBody: "We've seen this before. Thirty minutes is enough to know if we're a fit.",
  fitCheck: {
    eyebrow: 'Fit check',
    headline: 'Sound familiar? Usually more than one.',
    body: 'Bring the messy context. We will separate what needs a system, what needs a process change, and what does not need a build at all.',
    items: [
      {
        number: '01',
        label: 'No pitch deck',
        detail: 'A working conversation, not a sales presentation.',
      },
      {
        number: '02',
        label: 'No generic audit',
        detail: 'Observations specific to your stack — not a template.',
      },
      {
        number: '03',
        label: 'Clear next step',
        detail: 'You leave knowing what to do, with or without us.',
      },
    ] satisfies readonly FitCheckItem[],
    cardEyebrow: '30-minute conversation',
    cardHeadline: 'Know if Raven is the right team.',
    cardItems: ['What is breaking', 'What should be built', 'What should wait'],
    cta: 'Book 30 minutes',
    footnote:
      'We reply within one business day with a calendar link, or a direct note if it is not a fit.',
  },
} as const
