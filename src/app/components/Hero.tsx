'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Award, Clock, Users, ChevronDown } from 'lucide-react'

const Hero = () => {
  const stats = [
    { number: '13+', label: 'Years Experience', icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { number: '500+', label: 'Projects Completed', icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { number: '50+', label: 'Team Members', icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { number: '100%', label: 'Client Satisfaction', icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-center lg:text-left"
            >
              <div className="mb-6 md:mb-8">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold mb-4">
                  Since 2010 • Dubai, UAE
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  Transforming Spaces,{' '}
                  <span className="text-secondary block sm:inline">Creating Experiences</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Premium interior design & fit-out solutions with 13+ years of excellence in Dubai. 
                  We bring innovation, quality, and timeless elegance to every project.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/contact"
                  className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
                <a
                  href="/projects"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-white/10 transition-all backdrop-blur-sm text-center"
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
              className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6 max-w-lg mx-auto lg:mx-0"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="bg-white/10 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-white/20 h-full"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="flex-shrink-0 text-secondary bg-white/10 p-2 sm:p-3 rounded-lg sm:rounded-xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto sm:mx-0">
                      {stat.icon}
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">{stat.number}</div>
                      <div className="text-xs sm:text-sm opacity-90 mt-1 sm:mt-2 line-clamp-2 min-h-[2.5rem] sm:min-h-auto">
                        {stat.label}
                      </div>
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
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-white/80 text-sm">Scroll to explore</span>
              <ChevronDown className="w-6 h-6 text-white/60 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero