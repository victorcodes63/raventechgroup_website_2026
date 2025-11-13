'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Link from 'next/link'

// Enhanced animation variants for hero text
const heroBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 0.4,
    },
  },
}

const heroTitleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.6,
    },
  },
}

const heroWordVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

const heroDescriptionVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.6, -0.05, 0.01, 0.99],
      delay: 1.4,
    },
  },
}

const heroButtonVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 1.8,
    },
  },
}

const GRID_SVG = `
  <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>
    <rect x='0.4' y='0.4' width='59.2' height='59.2' fill='none' stroke='rgba(255,169,30,0.22)' stroke-width='0.8' />
    <path d='M30 0 V60 M0 30 H60' fill='none' stroke='rgba(255,169,30,0.12)' stroke-width='0.65' />
    <circle cx='0' cy='0' r='1.8' fill='rgba(255,169,30,0.16)' />
    <circle cx='60' cy='0' r='1.8' fill='rgba(255,169,30,0.16)' />
    <circle cx='0' cy='60' r='1.8' fill='rgba(255,169,30,0.16)' />
    <circle cx='60' cy='60' r='1.8' fill='rgba(255,169,30,0.16)' />
    <circle cx='30' cy='0' r='1.2' fill='rgba(255,169,30,0.12)' />
    <circle cx='0' cy='30' r='1.2' fill='rgba(255,169,30,0.12)' />
    <circle cx='60' cy='30' r='1.2' fill='rgba(255,169,30,0.12)' />
    <circle cx='30' cy='60' r='1.2' fill='rgba(255,169,30,0.12)' />
  </svg>
`

const GRID_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(GRID_SVG)}")`

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black pt-20 sm:pt-24 md:pt-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,26,30,0.65),_rgba(0,0,0,0.92))]"
        />

        <motion.div
          aria-hidden
          className="absolute inset-0 mix-blend-screen"
          style={{
            backgroundImage: GRID_PATTERN,
            backgroundSize: '60px 60px',
            backgroundRepeat: 'repeat',
            opacity: 0.6,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 36px', '0px 0px'],
          }}
          transition={{
            backgroundPosition: {
              duration: 18,
              ease: 'easeInOut',
              repeat: Infinity,
            },
          }}
        />

        <div
          className="absolute inset-0 mix-blend-soft-light opacity-35"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundPosition: '0 0, 22px 22px',
            backgroundSize: '44px 44px',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 0.55, y: 0 }}
          transition={{ duration: 2.4, ease: 'easeOut', delay: 0.2 }}
          className="absolute bottom-[-120px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand-500/14 blur-[140px]"
        />

        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.85) 85%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span
            variants={heroBadgeVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center rounded-full border border-brand-500/50 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-300"
          >
            Trusted delivery partners
          </motion.span>

          <motion.h1
            variants={heroTitleVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white leading-tight"
          >
            {'Technology that grows with your business'.split(' ').map((word, index) => (
              <motion.span
                key={index}
                variants={heroWordVariants}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={heroDescriptionVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-white/70 leading-relaxed px-4 sm:px-0"
          >
            Building scalable applications with clean architecture, robust infrastructure, and
            industry-proven practices.
          </motion.p>

          <motion.div 
            variants={heroButtonVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-black transition-colors duration-200 hover:bg-brand-400 min-h-[44px] touch-manipulation"
            >
              Start a project
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

