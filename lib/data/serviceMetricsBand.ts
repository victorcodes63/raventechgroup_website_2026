export type ServiceMetricBandItem =
  | {
      kind: 'count'
      end: number
      decimals?: number
      prefix?: string
      suffix: string
      label: string
    }
  | { kind: 'text'; value: string; label: string }

/** Client-referenced or delivery-target metrics — no unverifiable averages */
export const SERVICE_METRICS_BAND: Record<string, ServiceMetricBandItem[]> = {
  'software-development': [
    { kind: 'text', value: '8–12', label: 'Weeks to production' },
    { kind: 'text', value: '6+', label: 'Platforms shipped' },
    { kind: 'text', value: '2', label: 'Week release cadence' },
    { kind: 'text', value: '24/7', label: 'Support on active builds' },
  ],
  'cloud-solutions': [
    { kind: 'text', value: '99.9%', label: 'Uptime target (SLA)' },
    { kind: 'text', value: '3×', label: 'Deploy frequency target' },
    { kind: 'text', value: 'Zero', label: 'Vendor lock-in goal' },
    { kind: 'text', value: '48h', label: 'Incident readout SLA' },
  ],
  'web-development': [
    { kind: 'text', value: '90+', label: 'Lighthouse target score' },
    { kind: 'text', value: '<2s', label: 'LCP target on 4G' },
    { kind: 'text', value: '100%', label: 'Core Web Vitals pass target' },
    { kind: 'text', value: '6', label: 'Weeks — Honey Box Shopify ship' },
  ],
  cybersecurity: [
    { kind: 'count', end: 48, suffix: 'h', label: 'Critical triage SLA' },
    { kind: 'count', end: 100, suffix: '%', label: 'Finding traceability' },
    { kind: 'text', value: '0', label: 'Ambiguous owners' },
    { kind: 'text', value: '24/7', label: 'Monitoring coverage' },
  ],
  'digital-transformation': [
    { kind: 'text', value: '12', label: 'Week pilot cycles' },
    { kind: 'text', value: '3', label: 'Pilot waves typical' },
    { kind: 'text', value: '1', label: 'Source of truth goal' },
    { kind: 'text', value: '48h', label: 'Written readout SLA' },
  ],
  'it-consulting': [
    { kind: 'count', end: 48, suffix: 'h', label: 'Written readouts' },
    { kind: 'text', value: '10+', label: 'Years combined judgment' },
    { kind: 'text', value: '1:1', label: 'Leadership embedding' },
    { kind: 'count', end: 0, suffix: '', label: 'Template decks' },
  ],
  'system-integration': [
    { kind: 'text', value: '30s', label: 'Quote time — R4 Automotive' },
    { kind: 'text', value: '3', label: 'Supplier APIs — R4' },
    { kind: 'text', value: '700+', label: 'Applications — R4 hiring portal' },
    { kind: 'text', value: '<50ms', label: 'API p95 target' },
  ],
}

export function getServiceMetricsBand(slug: string): ServiceMetricBandItem[] {
  return SERVICE_METRICS_BAND[slug] ?? SERVICE_METRICS_BAND['software-development']
}
