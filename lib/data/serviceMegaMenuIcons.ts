import type { Icon } from '@phosphor-icons/react'
import {
  Briefcase,
  Cloud,
  Code,
  Globe,
  PlugsConnected,
  RocketLaunch,
  ShieldCheck,
} from '@phosphor-icons/react'

/** Phosphor icons for mega menu + services index cards (slug → icon). */
export const SERVICE_MEGA_MENU_ICONS: Record<string, Icon> = {
  'software-development': Code,
  'system-integration': PlugsConnected,
  'cloud-solutions': Cloud,
  cybersecurity: ShieldCheck,
  'digital-transformation': RocketLaunch,
  'it-consulting': Briefcase,
  'web-development': Globe,
}
