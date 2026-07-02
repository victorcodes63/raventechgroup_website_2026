/** Three credibility stats shown under the service hero CTAs (left-aligned, divided). */
export const SERVICE_HERO_STATS: Record<string, readonly [string, string, string]> = {
  'software-development': ['8–12 weeks to production', '6+ shipped platforms', 'Westlands, Nairobi'],
  'cloud-solutions': ['Landing zones in weeks', 'IaC-first delivery', 'Westlands, Nairobi'],
  cybersecurity: ['CBK-aligned reviews', 'Findings you can act on', 'Westlands, Nairobi'],
  'digital-transformation': ['12-week pilots', 'KPI-led governance', 'Westlands, Nairobi'],
  'it-consulting': ['48-hour readouts', 'Embedded with leadership', 'Westlands, Nairobi'],
  'system-integration': ['API-first builds', 'Observable pipelines', 'Westlands, Nairobi'],
  'web-development': ['90+ Lighthouse targets', 'Shipped on cadence', 'Westlands, Nairobi'],
}

export function getServiceHeroStats(slug: string): readonly [string, string, string] {
  return SERVICE_HERO_STATS[slug] ?? ['Discovery-first delivery', 'Documented handovers', 'Westlands, Nairobi']
}
