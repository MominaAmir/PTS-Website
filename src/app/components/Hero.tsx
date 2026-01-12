'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Award, Clock, Users, ChevronDown } from 'lucide-react'

const Hero = () => {
  const stats = [
    { number: '13+', label: 'Years Experience', icon: <Clock className="w-6 h-6" /> },
    { number: '500+', label: 'Projects Completed', icon: <Award className="w-6 h-6" /> },
    { number: '50+', label: 'Team Members', icon: <Users className="w-6 h-6" /> },
    { number: '100%', label: 'Client Satisfaction', icon: <Award className="w-6 h-6" /> },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ 
  backgroundImage: 'url(https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)' 
}}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                Since 2010 • Dubai, UAE
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Transforming Spaces, <span className="text-secondary">Creating</span> Experiences
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                Premium interior design & fit-out solutions with 13+ years of excellence in Dubai. 
                We bring innovation, quality, and timeless elegance to every project.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-all shadow-lg"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <a
                href="/projects"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                View Our Portfolio
              </a>
            </div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-secondary bg-white/10 p-3 rounded-xl">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stat.number}</div>
                    <div className="text-sm opacity-90 mt-1">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white/80 text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero