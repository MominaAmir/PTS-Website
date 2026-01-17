'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { client } from '../../../lib/sanity'
import { 
  Wrench, 
  Palette, 
  Ruler, 
  Lightbulb, 
  Users, 
  Clock,
  Building2,
  Home,
  Briefcase,
  Layers,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  ChevronLeft,
  Sparkles,
  TrendingUp,
  Shield,
  Target
} from 'lucide-react'
import Link from 'next/link'

interface Service {
  _id: string
  title: string
  description?: string
  icon?: string
  features?: string[]
  process?: string[]
  benefits?: string[]
  category?: string
  projects?: number
  duration?: string
}

const iconMap: Record<string, any> = {
  'wrench': Wrench,
  'palette': Palette,
  'ruler': Ruler,
  'lightbulb': Lightbulb,
  'users': Users,
  'clock': Clock,
  'building': Building2,
  'home': Home,
  'briefcase': Briefcase,
  'layers': Layers,
  'zap': Zap,
  'sparkles': Sparkles,
  'trendingup': TrendingUp,
  'shield': Shield,
  'target': Target,
}

// Service categories with icons
const serviceCategories = [
  { 
    id: 'all', 
    label: 'All Services', 
    icon: <Sparkles className="w-4 h-4" />,
    count: 0 
  },
  { 
    id: 'residential', 
    label: 'Residential Design', 
    icon: <Home className="w-4 h-4" />,
    count: 0 
  },
  { 
    id: 'commercial', 
    label: 'Commercial Spaces', 
    icon: <Building2 className="w-4 h-4" />,
    count: 0 
  },
  { 
    id: 'management', 
    label: 'Project Management', 
    icon: <Briefcase className="w-4 h-4" />,
    count: 0 
  },
  { 
    id: 'technical', 
    label: 'Technical Services', 
    icon: <Wrench className="w-4 h-4" />,
    count: 0 
  },
  { 
    id: 'consultation', 
    label: 'Consultation', 
    icon: <Users className="w-4 h-4" />,
    count: 0 
  },
]

// Default services data
const defaultServices: Service[] = [
  {
    _id: '1',
    title: 'Luxury Villa Design',
    description: 'Complete interior design solutions for premium villas in Dubai, focusing on luxury living spaces, entertainment areas, and smart home integration.',
    icon: 'home',
    category: 'residential',
    projects: 120,
    duration: '8-12 weeks',
    features: ['Custom Furniture Design', 'Smart Home Automation', 'Premium Material Selection', 'Lighting Design'],
    process: ['Initial Consultation', 'Concept Design', 'Material Selection', 'Execution & Installation'],
    benefits: ['Increased Property Value', 'Personalized Living Spaces', 'Energy Efficient Design', 'Premium Finishes']
  },
  {
    _id: '2',
    title: 'Commercial Office Design',
    description: 'Modern office spaces that enhance productivity and brand identity with ergonomic furniture, collaborative zones, and efficient layouts.',
    icon: 'building',
    category: 'commercial',
    projects: 85,
    duration: '10-16 weeks',
    features: ['Space Planning', 'Brand Integration', 'Acoustic Solutions', 'Employee Wellness'],
    process: ['Client Briefing', 'Space Analysis', 'Design Development', 'Project Implementation'],
    benefits: ['Increased Productivity', 'Enhanced Brand Image', 'Employee Satisfaction', 'Future-proof Design']
  },
  {
    _id: '3',
    title: 'Project Management',
    description: 'End-to-end project coordination ensuring timely delivery, budget control, and quality assurance from concept to completion.',
    icon: 'briefcase',
    category: 'management',
    projects: 500,
    duration: 'Project Specific',
    features: ['Timeline Management', 'Budget Control', 'Quality Assurance', 'Vendor Coordination'],
    process: ['Planning', 'Scheduling', 'Execution', 'Monitoring', 'Closure'],
    benefits: ['On-time Delivery', 'Cost Efficiency', 'Quality Control', 'Stress-free Experience']
  },
  {
    _id: '4',
    title: 'Custom Furniture Design',
    description: 'Bespoke furniture pieces crafted with premium materials, tailored to client specifications and space requirements.',
    icon: 'palette',
    category: 'technical',
    projects: 220,
    duration: '4-8 weeks',
    features: ['3D Visualization', 'Material Selection', 'Custom Finishes', 'Quality Craftsmanship'],
    process: ['Design Concept', 'Material Selection', 'Prototyping', 'Manufacturing', 'Installation'],
    benefits: ['Unique Designs', 'Perfect Fit', 'Premium Quality', 'Long-lasting Durability']
  },
  {
    _id: '5',
    title: 'Lighting Design',
    description: 'Ambient, task, and accent lighting solutions that enhance mood, functionality, and architectural features.',
    icon: 'lightbulb',
    category: 'technical',
    projects: 180,
    duration: '3-6 weeks',
    features: ['Energy Efficiency', 'Smart Controls', 'Mood Setting', 'Architectural Highlighting'],
    process: ['Lighting Analysis', 'Concept Design', 'Fixture Selection', 'Installation Plan'],
    benefits: ['Enhanced Ambiance', 'Energy Savings', 'Increased Safety', 'Aesthetic Appeal']
  },
  {
    _id: '6',
    title: 'Design Consultation',
    description: 'Expert advice and creative solutions for interior design projects, providing guidance on style, materials, and layout.',
    icon: 'users',
    category: 'consultation',
    projects: 350,
    duration: '1-2 sessions',
    features: ['Style Assessment', 'Space Analysis', 'Material Guidance', 'Budget Planning'],
    process: ['Initial Meeting', 'Site Assessment', 'Recommendations', 'Follow-up'],
    benefits: ['Expert Guidance', 'Cost Savings', 'Informed Decisions', 'Peace of Mind']
  }
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredServices, setFilteredServices] = useState<Service[]>([])

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    // Filter services based on active filter
    if (activeFilter === 'all') {
      setFilteredServices(services)
    } else {
      setFilteredServices(services.filter(service => 
        service.category?.toLowerCase() === activeFilter.toLowerCase()
      ))
    }
  }, [activeFilter, services])

  const fetchServices = async () => {
    try {
      const query = `*[_type == "service"] | order(_createdAt asc) {
        _id,
        title,
        description,
        icon,
        features,
        process,
        benefits,
        category,
        projects,
        duration
      }`
      const data = await client.fetch(query)
      
      // Use Sanity data if available, otherwise use defaults
      const displayServices = data.length > 0 ? data : defaultServices
      setServices(displayServices)
      setFilteredServices(displayServices)
      
    } catch (error) {
      console.error('Error fetching services:', error)
      // Fallback to default services
      setServices(defaultServices)
      setFilteredServices(defaultServices)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85 text-white py-20 md:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center" />
        </div>
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary/30"
          animate={{
            opacity: [0.9, 0.95, 0.9],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-8"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wider">COMPREHENSIVE SERVICES</span>
              <div className="w-1 h-1 bg-secondary rounded-full" />
            </motion.div>
            
            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block">Premium Interior</span>
              <span className="block text-secondary">Design Services</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
              Transform your space with our comprehensive interior design solutions, 
              combining innovative design, expert craftsmanship, and attention to detail 
              for Dubai's most discerning clients.
            </p>
            
            {/* Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { value: '500+', label: 'Projects Completed', icon: <Target className="w-5 h-5" /> },
                { value: '13+', label: 'Years Experience', icon: <TrendingUp className="w-5 h-5" /> },
                { value: '100%', label: 'Client Satisfaction', icon: <Star className="w-5 h-5" /> },
                { value: '50+', label: 'Team Experts', icon: <Shield className="w-5 h-5" /> },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {stat.icon}
                    <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  </div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group"
          >
            <motion.div
              animate={{ x: [-3, 0, -3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
            </motion.div>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Services Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select a category to explore our specialized interior design services
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {serviceCategories.map((category) => {
              const serviceCount = category.id === 'all' 
                ? services.length 
                : services.filter(s => s.category === category.id).length
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`group flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200'
                  }`}
                >
                  <span className={activeFilter === category.id ? 'text-white' : 'text-primary'}>
                    {category.icon}
                  </span>
                  <span>{category.label}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeFilter === category.id 
                      ? 'bg-white/20' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {serviceCount}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-100 rounded-2xl h-96 animate-pulse"
              />
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          <>
            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => {
                const Icon = iconMap[service.icon?.toLowerCase() || 'palette'] || Palette
                
                return (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                    }}
                    className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                  >
                    {/* Card content */}
                    <div className="p-8">
                      {/* Icon and stats */}
                      <div className="flex items-start justify-between mb-6">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </motion.div>
                        
                        {/* Project stats */}
                        <div className="text-right">
                          {service.projects && (
                            <div className="text-2xl font-bold text-primary mb-1">
                              {service.projects}+
                            </div>
                          )}
                          <div className="text-xs text-gray-500">Projects</div>
                          {service.duration && (
                            <div className="text-xs text-secondary font-medium mt-2">
                              {service.duration}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Features */}
                      {service.features && service.features.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-secondary" />
                            KEY FEATURES
                          </h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Process Preview */}
                      {service.process && service.process.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-primary" />
                            PROCESS
                          </h4>
                          <div className="flex items-center gap-2">
                            {service.process.slice(0, 3).map((step, idx) => (
                              <div key={idx} className="flex items-center">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                                  {idx + 1}
                                </div>
                                <span className="text-xs text-gray-500 ml-2">{step.split(' ')[0]}</span>
                                {idx < 2 && <div className="w-4 h-0.5 bg-gray-200 mx-2" />}
                              </div>
                            ))}
                            {service.process.length > 3 && (
                              <div className="text-xs text-gray-400 ml-2">
                                +{service.process.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Benefits */}
                      {service.benefits && service.benefits.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                            <Award className="w-4 h-4 text-green-500" />
                            BENEFITS
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.benefits.slice(0, 3).map((benefit, idx) => (
                              <span 
                                key={idx}
                                className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-full"
                              >
                                {benefit}
                              </span>
                            ))}
                            {service.benefits.length > 3 && (
                              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                +{service.benefits.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Category badge */}
                    {service.category && (
                      <div className="px-6 py-3 bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-gray-100">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                          {service.category.replace('_', ' ')} SERVICE
                        </span>
                      </div>
                    )}
                    
                    {/* Corner accents */}
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/20 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-secondary/20 rounded-bl-lg" />
                  </motion.div>
                )
              })}
            </div>

            {/* Filter Results Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12 mb-16"
            >
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl">
                <span className="text-primary font-semibold">
                  Showing {filteredServices.length} of {services.length} services
                </span>
                {activeFilter !== 'all' && (
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="text-sm text-secondary hover:text-secondary/80 underline"
                  >
                    View All Services
                  </button>
                )}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-3xl p-12 overflow-hidden"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
              <div 
  className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`}
/> </div>
              
              <div className="relative text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Ready to Start Your Project?
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                  Contact us today for a personalized consultation and let our experts 
                  bring your vision to life with premium interior design solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span>Book Free Consultation</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Link>
                  <Link
                    href="/projects"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/5 transition-colors duration-300"
                  >
                    View Our Portfolio
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
              <Palette className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              No Services Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              {activeFilter !== 'all' 
                ? `No services found in the ${activeFilter} category. Try selecting a different category.`
                : 'Our premium services will be available soon. Check back later or contact us for more information.'}
            </p>
            {activeFilter !== 'all' && (
              <button
                onClick={() => setActiveFilter('all')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mr-4"
              >
                View All Services
              </button>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}