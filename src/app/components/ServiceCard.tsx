'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  projects: number | string
}

const ServiceCard = ({ icon, title, description, projects }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            {icon}
          </div>
          <span className="text-2xl font-bold text-secondary">{projects}</span>
        </div>
        
        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-neutral-600 leading-relaxed">{description}</p>
        
        <div className="mt-6 pt-6 border-t">
          <button className="text-primary font-semibold hover:text-primary/80 flex items-center space-x-2 transition-colors">
            <span>Learn More</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCard