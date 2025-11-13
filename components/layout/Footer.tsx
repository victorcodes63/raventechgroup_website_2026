'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react'
import Image from 'next/image'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Playbooks', href: '/playbooks' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Software Development', href: '/services/software-development' },
    { name: 'Cloud Solutions', href: '/services/cloud-solutions' },
    { name: 'Cybersecurity', href: '/services/cybersecurity' },
    { name: 'Digital Transformation', href: '/services/digital-transformation' },
    { name: 'IT Consulting', href: '/services/it-consulting' },
    { name: 'System Integration', href: '/services/system-integration' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/raven-tech-group' },
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61567856897601' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/raventech.group?igsh=cWdvMGRiamNkZGdv&utm_source=qr' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,169,30,0.08),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_140deg_at_10%_10%,rgba(255,169,30,0.12),transparent_55%)]" />
      </div>
      <div className="relative container mx-auto px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-8 sm:gap-12 border border-white/10 bg-white/[0.03] px-4 py-8 sm:px-6 sm:py-12 backdrop-blur-sm md:grid-cols-[1.2fr_1fr_1fr_1.1fr] md:gap-10 md:rounded-3xl"
        >
          {/* Company Info */}
          <motion.div variants={fadeInUp}>
            <div className="text-sm" style={{ lineHeight: '1.25rem' }}>
              <div className="relative inline-block h-[1.25rem] w-20 sm:h-[1.5rem] sm:w-24 md:h-[1.75rem] md:w-28 align-top">
                <Image
                  src="/images/logos/raven_logo.png"
                  alt="Raven Tech Group logo"
                  fill
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-sm leading-relaxed text-white/60">
              Technology partners engineering scalable platforms, secure infrastructure, and embedded support for teams across Africa.
            </p>
            <div className="mt-4 sm:mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 transition duration-200 hover:border-brand-400 hover:bg-brand-400/20 hover:text-brand-100 touch-manipulation"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Company</h4>
            <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="block text-white/70 transition duration-200 hover:text-brand-200 py-1.5 touch-manipulation"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Services</h4>
            <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 text-sm">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="block text-white/70 transition duration-200 hover:text-brand-200 py-1.5 touch-manipulation"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Contact</h4>
            <ul className="mt-4 sm:mt-5 space-y-3 sm:space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="mt-0.5 flex-shrink-0 text-brand-300" />
                <a
                  href="mailto:hello@raventechgroup.com"
                  className="text-white/70 transition duration-200 hover:text-brand-200 break-all touch-manipulation"
                >
                  hello@raventechgroup.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="mt-0.5 flex-shrink-0 text-brand-300" />
                <a
                  href="tel:+254796349079"
                  className="text-white/70 transition duration-200 hover:text-brand-200 touch-manipulation"
                >
                  +254 796 349 079
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-brand-300" />
                <span className="text-white/65 leading-relaxed">
                  Western Heights, Karuna Road,<br />
                   Westlands, Nairobi
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={18} className="mt-0.5 flex-shrink-0 text-brand-300" />
                <span className="text-white/65 leading-relaxed">
                  Mon–Fri: 8:00 AM – 5:00 PM EAT<br />
                  Sat: 9:00 AM – 1:00 PM EAT
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mt-8 sm:mt-10 border-t border-white/10 pt-6"
        >
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/55 sm:flex-row">
            <p className="text-center sm:text-left">
              © {currentYear} Raven Tech Group. Engineering technology that grows with your business.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="transition duration-200 hover:text-brand-200 touch-manipulation py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

