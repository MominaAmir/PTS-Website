'use client'

import { motion } from 'framer-motion'
import { Phone, Calendar, MessageSquare } from 'lucide-react'

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-primary to-primary/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-12">
            Get a free consultation and quote for your interior design project. 
            No obligation, just expert advice.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+9714XXXXXXX"
              className="bg-white text-primary p-6 rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <Phone className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Call Now</h3>
                <p className="text-neutral-600">+971 4 XXX XXXX</p>
                <p className="text-sm text-neutral-500 mt-2">24/7 Support</p>
              </div>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/PTS-Website/contact"
              className="bg-white text-primary p-6 rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <Calendar className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Book Consultation</h3>
                <p className="text-neutral-600">Free Site Visit</p>
                <p className="text-sm text-neutral-500 mt-2">Within 48 hours</p>
              </div>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/971XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-6 rounded-2xl hover:bg-green-600 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <MessageSquare className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">WhatsApp Chat</h3>
                <p>Instant Response</p>
                <p className="text-sm opacity-90 mt-2">Quick questions</p>
              </div>
            </motion.a>
          </div>

          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">13+</div>
                <p className="text-sm opacity-90">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">500+</div>
                <p className="text-sm opacity-90">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">100%</div>
                <p className="text-sm opacity-90">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA