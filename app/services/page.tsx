import { Metadata } from 'next'

import { ServicesContent } from './ServicesContent'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore Raven Tech Group’s core services across software development, cloud, cybersecurity, digital transformation, consulting, and integration.',
}

export default function ServicesPage() {
  return <ServicesContent />
}



