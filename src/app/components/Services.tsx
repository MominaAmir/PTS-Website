'use client'

import { motion } from 'framer-motion'
import { 
  Palette, 
  Building2, 
  Home, 
  Briefcase, 
  Lightbulb,
  Users,
  ArrowRight,
  Sparkles,
  CheckCircle,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

interface Service {
  _id: string
  title: string
  description?: string
  icon?: string
  projects?: number
  features?: string[]
}

interface ServicesProps {
  services: Service[]
  isLoading: boolean
}

const iconMap: Record<string, any> = {
  'palette': Palette,
  'building': Building2,
  'home': Home,
  'briefcase': Briefcase,
  'lightbulb': Lightbulb,
  'users': Users,
  'sparkles': Sparkles,
}

export default function Services({ services, isLoading }: ServicesProps) {
  // Default services if none from Sanity
  const defaultServices: Service[] = [
    {
      _id: '1',
      title: 'Residential Design',
      description: 'Luxury villas, apartments, and penthouses tailored to Dubai lifestyle with bespoke interior solutions.',
      icon: 'home',
      projects: 250,
      features: ['Custom Furniture', 'Smart Home Integration', 'Space Optimization']
    },
    {
      _id: '2',
      title: 'Commercial Spaces',
      description: 'Premium office interiors, retail stores, and hospitality venues that enhance business productivity.',
      icon: 'building',
      projects: 150,
      features: ['Brand Integration', 'Employee Wellness', 'Client Experience']
    },
    {
      _id: '3',
      title: 'Custom Furniture',
      description: 'Bespoke furniture design and manufacturing using premium materials and craftsmanship.',
      icon: 'palette',
      projects: 180,
      features: ['Premium Materials', 'Custom Finishes', 'Ergonomic Design']
    }
  ]

  const allServices = services.length > 0 ? services : defaultServices
  const homePageServices = allServices.slice(0, 3)

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold tracking-wider text-primary">
              PREMIUM SERVICES
            </span>
            <div className="w-1 h-1 bg-secondary rounded-full" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="block">Our Premium</span>
            <span className="block text-primary">Design Services</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our signature interior design services that transform spaces into masterpieces
            of luxury and functionality.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {homePageServices.map((service, index) => {
            const iconName = service.icon?.toLowerCase() || 'palette'
            const Icon = iconMap[iconName] || Palette
            
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 mx-auto"
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed text-sm text-center">
                  {service.description}
                </p>

                {/* Features list */}
                {service.features && (
                  <div className="mb-6 space-y-3">
                    {service.features.slice(0, 2).map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 * idx }}
                        className="flex items-center gap-3"
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0"
                        >
                          <CheckCircle className="w-3 h-3 text-secondary" />
                        </motion.div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Project count */}
                {service.projects && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 pt-6 border-t border-gray-200 text-center"
                  >
                    <div className="text-2xl font-bold text-primary mb-1">
                      {service.projects}+
                    </div>
                    <div className="text-xs text-gray-500">Projects Completed</div>
                  </motion.div>
                )}

                {/* Hover border effect - SAFE: uses scale not opacity */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/10 transition-all duration-300 pointer-events-none" />
              </motion.div>
            )
          })}
        </div>

        {/* View All Services Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/services"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg overflow-hidden"
          >
            {/* Background animation on hover */}
            <motion.div
              className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            
            {/* Text content */}
            <span className="relative z-10">View All {allServices.length} Services</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.div>
            
            {/* Hover scale effect */}
            <motion.div
              className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
              initial={false}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
          
          <p className="mt-4 text-gray-600 text-sm">
            Explore our complete range of interior design solutions
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && services.length === 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary font-medium">Loading premium services...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}