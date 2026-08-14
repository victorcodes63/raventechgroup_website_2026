import type { Metadata } from 'next'
import { ProcessPageContent } from '@/app/process/ProcessPageContent'

const canonical = 'https://www.raventechgroup.com/process'

export const metadata: Metadata = {
  title: 'How we engage | Raven Tech Group',
  description:
    'Four delivery phases from discovery through operations — one accountable team for ambitious African enterprises. Based in Westlands, Nairobi.',
  keywords: [
    'technology consultancy Kenya',
    'IT delivery Nairobi',
    'software engagement Africa',
    'digital transformation delivery',
  ],
  openGraph: {
    title: 'How we engage | Raven Tech Group',
    description:
      'Four delivery phases from discovery through operations — one accountable team end to end.',
    url: canonical,
    siteName: 'Raven Tech Group',
    type: 'website',
    locale: 'en_KE',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How we engage | Raven Tech Group',
    description:
      'Four delivery phases from discovery through operations — one accountable team end to end.',
  },
  alternates: { canonical },
  robots: { index: true, follow: true },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.raventechgroup.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'How we engage',
      item: canonical,
    },
  ],
}

export default function ProcessPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ProcessPageContent />
    </main>
  )
}
