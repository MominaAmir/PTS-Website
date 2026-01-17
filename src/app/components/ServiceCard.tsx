'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  projects: number | string
  features?: string[]
  index: number
}

const ServiceCard = ({ icon, title, description, projects, features, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring" }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      className="group relative bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-transparent via-gray-200 to-transparent">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Icon and projects */}
      <div className="relative mb-8">
        <div className="flex items-center justify-between">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-lg opacity-30 group-hover:opacity-50" />
            <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
              <div className="text-white">
                {icon}
              </div>
            </div>
          </div>
          <span className="text-3xl font-bold text-secondary">{projects}</span>
        </div>
      </div>
      
      {/* Content */}
      <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-primary/80 transition-colors">
        {title}
      </h3>
      <p className="text-neutral-600 leading-relaxed mb-6">
        {description}
      </p>
      
      {/* Features */}
      {features && (
        <div className="mb-6 space-y-2">
          {features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
              <span className="text-sm text-neutral-500">{feature}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Learn More */}
      {/* <div className="pt-6 border-t border-gray-100">
        <button className="group flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
          <span className="relative">
            Explore Service
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300" />
          </span>
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </button>
      </div> */}

      {/* Corner accents */}
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/20 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-secondary/20 rounded-bl-lg" />
    </motion.div>
  )
}

export default ServiceCard