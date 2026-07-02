/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.raventechgroup.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Enable static page generation for better SEO
  output: 'standalone',
  // Enable compression
  compress: true,
  // Performance optimizations
  poweredByHeader: false,
  // Experimental features for better performance
  experimental: {
    // optimizeCss: true, // Critters dependency issue in Next.js 16
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'raventechgroup.com' }],
        destination: 'https://www.raventechgroup.com/:path*',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/playbooks',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/playbooks/:path*',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/services/hr-platform',
        destination: '/products/stride',
        permanent: true,
      },
      {
        source: '/services/hr-platform/:path*',
        destination: '/products/stride',
        permanent: true,
      },
    ]
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
