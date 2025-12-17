'use client'

import Link from 'next/link'

const sections = [
  {
    title: '1. Information we collect',
    items: [
      'Contact details you share with us, such as name, email address, phone number, and company information.',
      'Project-related materials that help us scope engagements, including briefs, technical documentation, and assets provided by you.',
      'Usage data generated when you browse our websites, handled via privacy-friendly analytics and server logs.',
    ],
  },
  {
    title: '2. How we use your information',
    items: [
      'To respond to enquiries, prepare proposals, and manage contractual relationships.',
      'To deliver, maintain, and improve our services, including software development, consulting, and managed support.',
      'To comply with legal obligations, maintain security, and prevent fraud or misuse of our systems.',
    ],
  },
  {
    title: '3. Sharing and disclosure',
    items: [
      'We never sell personal data.',
      'We share information only with vetted partners who support our delivery (for example, cloud hosting, productivity, and security tooling). Each provider is bound by confidentiality commitments.',
      'We may disclose data if required by law or to protect our rights, users, or the public.',
    ],
  },
  {
    title: '4. Data retention & security',
    items: [
      'Project artefacts are retained only for the duration of the engagement and as required for support or legal purposes.',
      'We store data in secure cloud environments with access controls, encryption, and regular audits.',
      'You can request deletion or export of your information at any time by contacting privacy@raventechgroup.com.',
    ],
  },
  {
    title: '5. Your choices',
    items: [
      'Opt out of marketing communications at any time by using the unsubscribe link or contacting us directly.',
      'Request access, correction, or deletion of your personal data by emailing privacy@raventechgroup.com.',
      'Limit the data you provide—only share what is necessary to evaluate or deliver your engagement.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-black via-black to-zinc-950">
        <div className="container mx-auto px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Privacy Policy
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">How Raven Tech Group handles your data</h1>
            <p className="mt-6 text-base text-white/65 sm:text-lg">
              This policy explains what information we collect, how we use it, and the safeguards we maintain. It applies to raventechgroup.com and any
              services we provide to clients and partners. Last updated: November 10, 2025.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-black">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-12">
            {sections.map((section) => (
              <article key={section.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                <ul className="mt-4 space-y-3 text-sm text-white/65 sm:text-base">
                  {section.items.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-950">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <h2 className="text-2xl font-semibold text-white">Questions or requests?</h2>
            <p className="mt-4 text-sm text-white/65 sm:text-base">
              Reach our data protection lead at{' '}
              <Link href="mailto:privacy@raventechgroup.com" className="text-brand-300 transition hover:text-brand-200">
                privacy@raventechgroup.com
              </Link>{' '}
              or{' '}
              <Link href="/contact" className="text-brand-300 transition hover:text-brand-200">
                contact us
              </Link>{' '}
              directly. We respond within one business day.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}


