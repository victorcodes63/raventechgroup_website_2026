import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { GlobalContactLead } from '@/components/layout/GlobalContactLead'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
})

const SITE_DESCRIPTION =
  'Raven Tech Group builds software, cloud infrastructure, and integrated systems for SACCOs, fintechs, and growth-stage businesses across Kenya and East Africa.'

const SITE_TITLE = 'Raven Tech Group | Technology Consultancy Nairobi, Kenya'

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: '%s | Raven Tech Group',
  },
  description: SITE_DESCRIPTION,
  keywords: ['IT consulting Nairobi', 'software development Kenya', 'SACCO software', 'fintech development East Africa', 'Raven Tech Group'],
  authors: [{ name: 'Raven Tech Group' }],
  creator: 'Raven Tech Group',
  publisher: 'Raven Tech Group',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.raventechgroup.com'),
  alternates: {
    canonical: 'https://www.raventechgroup.com',
  },
  icons: {
    icon: [
      { url: '/images/favicon/favicon.ico', sizes: 'any' },
      { url: '/images/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/images/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/images/favicon/apple-touch-icon.png',
      },
    ],
  },
  manifest: '/images/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://www.raventechgroup.com',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'Raven Tech Group',
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'Raven Tech Group — Technology that African businesses run on',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: '@raventechgroup',
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'Raven Tech Group — Technology that African businesses run on',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '22nvcrl04-2IRlAkERr-6ib_TAw50M3poVrxxBjW1RQ',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${manrope.className}`}>
      <body className="font-sans antialiased bg-[#0A0A0A] text-white">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GA_ID}
            adsId={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? ''}
          />
        )}
        <Header />
        <main className="min-h-screen min-w-0 overflow-x-clip">
          {children}
        </main>
        <GlobalContactLead />
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}

