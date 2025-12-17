'use client'

const sections = [
  {
    title: '1. Acceptance of terms',
    content:
      'By accessing or using Raven Tech Group’s website or services, you agree to be bound by these terms. If you are entering into an agreement on behalf of an organisation, you confirm that you have the authority to do so.',
  },
  {
    title: '2. Services',
    content:
      'We offer software engineering, security, cloud, and consulting services. The scope, deliverables, timeline, and fees for each engagement are defined in a Statement of Work (SOW) or Master Services Agreement (MSA).',
  },
  {
    title: '3. Intellectual property',
    content:
      'Unless otherwise agreed, all pre-existing IP remains with the owning party. Upon full payment, clients receive ownership of bespoke deliverables produced for them, while Raven Tech Group retains rights to reusable frameworks, libraries, and methodologies.',
  },
  {
    title: '4. Confidentiality',
    content:
      'Both parties agree to protect confidential information shared during the engagement and to use it only for the purposes of delivering the contracted work. Non-disclosure terms are included in every agreement.',
  },
  {
    title: '5. Payment terms',
    content:
      'Invoices are payable within the timeline stated in the SOW/MSA. Late payments may incur finance charges or suspension of services. All fees are exclusive of taxes unless specified.',
  },
  {
    title: '6. Warranties & disclaimers',
    content:
      'We warrant that we will deliver services with professional care and skill. Except as expressly stated, we disclaim all other warranties, including implied warranties of merchantability or fitness for a particular purpose.',
  },
  {
    title: '7. Limitation of liability',
    content:
      'Raven Tech Group is not liable for indirect, incidental, or consequential damages. Our aggregate liability is limited to the fees paid by the client for the service that gave rise to the claim.',
  },
  {
    title: '8. Governing law',
    content:
      'These terms are governed by the laws of the Republic of Kenya. Any disputes will be handled by competent courts located in Nairobi unless another jurisdiction is mutually agreed in writing.',
  },
  {
    title: '9. Updates',
    content:
      'We may update these terms occasionally. Material changes will be communicated on this page with a revised “Last updated” date.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-black via-black to-zinc-950">
        <div className="container mx-auto px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Terms of Service
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Raven Tech Group service terms</h1>
            <p className="mt-6 text-base text-white/65 sm:text-lg">
              These terms govern the use of our website and the professional services we provide. Last updated: November 10, 2025.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-black">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-10">
            {sections.map((section) => (
              <article key={section.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                <p className="mt-4 text-sm text-white/65 sm:text-base leading-relaxed">{section.content}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-950">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <h2 className="text-2xl font-semibold text-white">Questions about our terms?</h2>
            <p className="mt-4 text-sm text-white/65 sm:text-base">
              Email{' '}
              <a href="mailto:legal@raventechgroup.com" className="text-brand-300 transition hover:text-brand-200">
                legal@raventechgroup.com
              </a>{' '}
              and our legal team will respond within one business day.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}


