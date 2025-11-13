export function OrganizationSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Raven Tech Group',
    url: 'https://www.raventechgroup.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.raventechgroup.com/images/favicon/web-app-manifest-512x512.png',
      width: 512,
      height: 512,
    },
    description: 'Raven Tech Group provides cutting-edge technology solutions, software development, and IT consulting services across Africa and Europe.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Western Heights, Karuna Road, Westlands',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi',
      postalCode: '00100',
      addressCountry: 'KE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254-796-349-079',
      contactType: 'Customer Service',
      email: 'hello@raventechgroup.com',
      areaServed: ['KE', 'UG', 'TZ', 'RW', 'ET', 'GH', 'NG', 'ZA', 'GB', 'DE', 'FR'],
      availableLanguage: ['en'],
    },
    sameAs: [
      // Add your social media profiles here
      // 'https://www.linkedin.com/company/raventechgroup',
      // 'https://twitter.com/raventechgroup',
      // 'https://www.facebook.com/raventechgroup',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '24',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebSiteSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Raven Tech Group',
    url: 'https://www.raventechgroup.com',
    description: 'Innovative technology solutions, software development, and IT consulting services.',
    publisher: {
      '@type': 'Organization',
      name: 'Raven Tech Group',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.raventechgroup.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function LocalBusinessSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.raventechgroup.com',
    name: 'Raven Tech Group',
    image: 'https://www.raventechgroup.com/images/logos/raven_logo.png',
    description: 'Technology solutions, software development, and IT consulting services.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Western Heights, Karuna Road, Westlands',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi',
      postalCode: '00100',
      addressCountry: 'KE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -1.2597,
      longitude: 36.7984,
    },
    telephone: '+254-796-349-079',
    email: 'hello@raventechgroup.com',
    url: 'https://www.raventechgroup.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'Place',
      name: 'Africa and Europe',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

