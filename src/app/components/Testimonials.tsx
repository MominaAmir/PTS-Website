'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Testimonial {
  _id: string
  clientName: string
  clientTitle?: string
  testimonial: string
  rating?: number
  location?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  isLoading: boolean
}

export default function Testimonials({ testimonials, isLoading }: TestimonialsProps) {
  // Default testimonials if none from Sanity
  const defaultTestimonials = [
    {
      _id: '1',
      clientName: 'Ahmed Al Maktoum',
      clientTitle: 'Business Owner',
      testimonial: 'PTS Design transformed our office space beyond expectations. Their attention to detail and understanding of Dubai luxury standards is exceptional.',
      rating: 5,
      location: 'Business Bay, Dubai'
    },
    {
      _id: '2',
      clientName: 'Sarah Johnson',
      clientTitle: 'Villa Owner',
      testimonial: 'The team at PTS Design created our dream home on Palm Jumeirah. Professional, creative, and delivered on time.',
      rating: 5,
      location: 'Palm Jumeirah, Dubai'
    },
    {
      _id: '3',
      clientName: 'Mohammed Hassan',
      clientTitle: 'Hotel General Manager',
      testimonial: 'Our hotel renovation was handled perfectly. PTS Design understands hospitality design like no one else in Dubai.',
      rating: 5,
      location: 'Downtown Dubai'
    }
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials
  
  // Fixed positions for animated elements to avoid hydration errors
  const fixedPositions = [
    { left: '10%', top: '20%' },
    { left: '90%', top: '10%' },
    { left: '15%', top: '80%' },
    { left: '85%', top: '70%' },
    { left: '50%', top: '40%' },
    { left: '30%', top: '30%' },
    { left: '70%', top: '50%' },
    { left: '40%', top: '90%' }
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
            <Quote className="w-10 h-10" />
          </div>
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
            Client Love
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from Dubai's most discerning clients about their experience with PTS Design
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Animated background elements with fixed positions */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {fixedPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/10 rounded-full"
                style={{
                  left: pos.left,
                  top: pos.top,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                {/* Rating stars */}
                {testimonial.rating && (
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating! 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
                
                {/* Quote */}
                <div className="relative mb-8">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/20" />
                  <p className="text-lg italic text-gray-200 pl-6">
                    "{testimonial.testimonial}"
                  </p>
                </div>
                
                {/* Client info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">
                      {testimonial.clientName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-white">
                      {testimonial.clientName}
                    </div>
                    <div className="text-sm text-gray-300">
                      {testimonial.clientTitle}
                      {testimonial.location && (
                        <span className="ml-2">• {testimonial.location}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
              </motion.div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-12 space-x-2">
            {displayTestimonials.map((_, index) => (
              <motion.button
                key={index}
                className="w-2 h-2 bg-white/30 rounded-full"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>

          {isLoading && testimonials.length === 0 && (
            <div className="text-center mt-12">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-lg">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse mr-2" />
                <span className="text-gray-300">Loading client testimonials...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}