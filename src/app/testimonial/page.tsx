'use client'

import { useEffect, useState } from 'react'
import { getSanityClient } from '../../../lib/sanity'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  _id: string
  clientName: string
  clientTitle?: string
  testimonial: string
  rating?: number
  location?: string
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const query = `*[_type == "testimonial"] | order(_createdAt desc)[0...6] {
        _id,
        clientName,
        clientTitle,
        testimonial,
        rating,
        location
      }`
      const data = await client.fetch(query)
      setTestimonials(data)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse"></div>
      ))}
    </div>
  )

  if (testimonials.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Quote className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Client Testimonials
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            What our clients in Dubai say about our interior design services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial._id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Rating */}
              {testimonial.rating && (
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating! 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              {/* Testimonial Text */}
              <p className="text-gray-700 italic mb-6 line-clamp-4">
                "{testimonial.testimonial}"
              </p>
              
              {/* Client Info */}
              <div className="pt-6 border-t">
                <div className="font-bold text-primary">
                  {testimonial.clientName}
                </div>
                <div className="text-sm text-gray-600">
                  {testimonial.clientTitle}
                  {testimonial.location && ` • ${testimonial.location}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}