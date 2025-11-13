'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { fadeInUp, staggerContainer, scrollReveal, hoverScale } from '@/lib/animations'

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with advanced analytics and inventory management.',
    category: 'Web Development',
    image: '/api/placeholder/600/400',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
  },
  {
    title: 'Healthcare Management System',
    description: 'Comprehensive healthcare management platform for clinics and hospitals.',
    category: 'Software Development',
    image: '/api/placeholder/600/400',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Financial Analytics Dashboard',
    description: 'Real-time financial analytics and reporting dashboard for investment firms.',
    category: 'Data Solutions',
    image: '/api/placeholder/600/400',
    tags: ['React', 'Python', 'PostgreSQL'],
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure and user-friendly mobile banking application with biometric authentication.',
    category: 'Mobile Development',
    image: '/api/placeholder/600/400',
    tags: ['React Native', 'Firebase', 'AWS'],
  },
  {
    title: 'Cloud Migration Project',
    description: 'Successful migration of enterprise infrastructure to AWS cloud platform.',
    category: 'Cloud Solutions',
    image: '/api/placeholder/600/400',
    tags: ['AWS', 'Docker', 'Kubernetes'],
  },
  {
    title: 'Cybersecurity Assessment',
    description: 'Comprehensive security audit and implementation for a financial services company.',
    category: 'Cybersecurity',
    image: '/api/placeholder/600/400',
    tags: ['Security', 'Compliance', 'Penetration Testing'],
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-900 mb-4">
              Our Portfolio
            </h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              Showcasing successful projects that have transformed businesses
            </p>
          </motion.div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={scrollReveal}
                whileHover={hoverScale}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-200 border border-dark-100"
              >
                <div className="relative h-64 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-bold text-primary-300 opacity-50">
                      {index + 1}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-dark-900/0 group-hover:bg-dark-900/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                      >
                        <ExternalLink className="text-dark-900" size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                      >
                        <Github className="text-dark-900" size={20} />
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm text-primary-600 font-medium">{project.category}</span>
                  <h3 className="text-xl font-semibold text-dark-900 mt-2 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-dark-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-dark-100 text-dark-700 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-dark-900 text-white rounded-lg font-semibold text-lg hover:bg-dark-800 transition-colors duration-200"
            >
              View All Projects
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

