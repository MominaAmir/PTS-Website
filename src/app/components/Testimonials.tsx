'use client'

import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ahmed Al Maktoum',
      role: 'CEO, ABC Corporation',
      company: 'Commercial Office Project',
      content: 'PTS transformed our corporate office beyond expectations. Their attention to detail and project management was exceptional. The team delivered on time and within budget.',
      rating: 5,
      image: 'A'
    },
    {
      name: 'Sarah Johnson',
      role: 'Hotel General Manager',
      company: 'Luxury Hotel Renovation',
      content: 'Working with PTS was a pleasure. They understood our vision for a luxury hotel renovation and executed it flawlessly. Our guests constantly compliment the design.',
      rating: 5,
      image: 'S'
    },
    {
      name: 'Mohammed Hassan',
      role: 'Property Developer',
      company: 'Villa Community Project',
      content: 'We hired Immersion for 50+ villas in our development. Their consistency, quality, and ability to handle large-scale projects impressed us. Will definitely work with them again.',
      rating: 5,
      image: 'M'
    }
  ]

  return (
    <section className="py-24 bg-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Hear from our satisfied clients who have transformed their spaces with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-primary">{testimonial.image}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">{testimonial.name}</h3>
                  <p className="text-neutral-600">{testimonial.role}</p>
                  <p className="text-sm text-secondary font-semibold">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-neutral-600 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials