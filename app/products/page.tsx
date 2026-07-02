import type { Metadata } from 'next'

import { ProductsIndexContent } from './ProductsIndexContent'

const site = 'https://www.raventechgroup.com'

const title = 'Products | Raven Tech Group'
const description =
  'Software products built and operated by Raven Tech Group — starting with Stride, the business management platform for East Africa.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${site}/products`,
    siteName: 'Raven Tech Group',
    locale: 'en_KE',
    type: 'website',
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  alternates: { canonical: `${site}/products` },
  robots: { index: true, follow: true },
}

export default function ProductsPage() {
  return <ProductsIndexContent />
}
