import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
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

export const metadata: Metadata = {
  title: {
    default: 'Raven Tech Group - Innovative Technology Solutions',
    template: '%s | Raven Tech Group',
  },
  description: 'Raven Tech Group provides cutting-edge technology solutions, software development, and IT consulting services. Transform your business with innovative technology.',
  keywords: ['technology solutions', 'software development', 'IT consulting', 'web development', 'Raven Tech Group'],
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
    canonical: '/',
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
    locale: 'en_US',
    url: 'https://www.raventechgroup.com',
    title: 'Raven Tech Group - Innovative Technology Solutions',
    description: 'Raven Tech Group provides cutting-edge technology solutions, software development, and IT consulting services. Transform your business with innovative technology.',
    siteName: 'Raven Tech Group',
    images: [
      {
        url: '/images/favicon/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
        alt: 'Raven Tech Group - Technology Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raven Tech Group - Innovative Technology Solutions',
    description: 'Raven Tech Group provides cutting-edge technology solutions, software development, and IT consulting services. Transform your business with innovative technology.',
    creator: '@raventechgroup',
    images: ['/images/favicon/web-app-manifest-512x512.png'],
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
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
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
      <body className="font-sans antialiased bg-white text-dark-900">
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}

