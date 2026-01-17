'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Linkedin, 
  ArrowRight,
  Sparkles,
  Clock,
  Building,
  Shield,
  Zap,
  FileText,
  Heart
} from 'lucide-react'

// Import sanity client
import { client } from '../../../lib/sanity'

interface FooterData {
  phone?: string
  email?: string
  address?: string
  whatsapp?: string
  instagram?: string
  facebook?: string
  linkedin?: string
  workingHours?: string
}

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData>({})
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state to prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Fetch footer data from Sanity
  useEffect(() => {
    fetchFooterData()
  }, [])

  const fetchFooterData = async () => {
    try {
      const query = `*[_type == "settings"][0] {
        phone,
        email,
        address,
        whatsapp,
        instagram,
        facebook,
        linkedin,
        workingHours
      }`
      const data = await client.fetch(query)
      setFooterData(data || {})
    } catch (error) {
      console.error('Error fetching footer data:', error)
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      setMessage('Thank you for subscribing! 🎉')
      setEmail('')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { 
      icon: <Instagram className="w-5 h-5" />, 
      href: footerData.instagram || '#', 
      color: 'from-pink-500 to-rose-500', 
      label: 'Instagram' 
    },
    { 
      icon: <Facebook className="w-5 h-5" />, 
      href: footerData.facebook || '#', 
      color: 'from-blue-600 to-blue-800', 
      label: 'Facebook' 
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      href: footerData.linkedin || '#', 
      color: 'from-blue-500 to-cyan-500', 
      label: 'LinkedIn' 
    },
  ]

  const quickLinks = [
    { name: 'Home', href: '/PTS-Website' },
    { name: 'Projects', href: '/PTS-Website/projects' },
    { name: 'Services', href: '/PTS-Website/services' },
    { name: 'Team', href: '/PTS-Website/team' },
    { name: 'Contact', href: '/PTS-Website/contact' },
    { name: 'Blog', href: '/PTS-Website/blog' },
  ]

  const services = [
    'Residential Design',
    'Commercial Design',
    'Hospitality Design',
    'Project Management',
    'Custom Furniture',
    'Lighting Design',
    'Space Planning',
    '3D Visualization'
  ]

  // Fixed positions for animated elements to avoid hydration errors
  const fixedParticles = [
    { left: '10%', top: '10%' },
    { left: '90%', top: '90%' },
    { left: '50%', top: '50%' },
    { left: '30%', top: '70%' },
    { left: '70%', top: '30%' },
    { left: '20%', top: '40%' },
    { left: '80%', top: '60%' },
    { left: '40%', top: '20%' },
    { left: '60%', top: '80%' },
    { left: '15%', top: '85%' },
    { left: '85%', top: '15%' },
    { left: '25%', top: '25%' },
    { left: '75%', top: '75%' },
    { left: '5%', top: '95%' },
    { left: '95%', top: '5%' },
    { left: '35%', top: '65%' },
    { left: '65%', top: '35%' },
    { left: '45%', top: '45%' },
    { left: '55%', top: '55%' },
    { left: '10%', top: '60%' },
  ]

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Decorative shapes - Fixed positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Fixed position particles */}
        {fixedParticles.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/10 rounded-full"
            style={{
              left: pos.left,
              top: pos.top,
            }}
            animate={isMounted ? {
              y: [0, -20, 0],
              opacity: [0, 0.5, 0],
            } : {}}
            transition={isMounted ? {
              duration: 3 + (i % 5) * 0.3,
              repeat: Infinity,
              delay: (i % 5) * 0.1,
            } : {}}
          />
        ))}

        {/* Gradient shapes - Fixed positions */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-900/10 via-transparent to-transparent rounded-full blur-3xl opacity-30" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-purple-900/10 via-transparent to-transparent rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-to-br from-emerald-900/5 to-teal-900/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Brand & Contact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Brand Section */}
            <div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Building className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">
                    PTS <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Design</span>
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Since 2010</p>
                </div>
              </motion.div>
              
              <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
                Transforming spaces with innovative design solutions in Dubai. 
                We create environments that inspire, function beautifully, and stand the test of time.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                {footerData.phone && (
                  <motion.a
                    href={`tel:${footerData.phone}`}
                    whileHover={{ x: 5 }}
                    className="flex items-center text-gray-300 hover:text-white group"
                  >
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Phone className="w-5 h-5 text-blue-400" />
                    </motion.div>
                    <div>
                      <p className="font-medium">{footerData.phone}</p>
                      <p className="text-sm text-gray-400">Available 24/7</p>
                    </div>
                  </motion.a>
                )}

                {footerData.email && (
                  <motion.a
                    href={`mailto:${footerData.email}`}
                    whileHover={{ x: 5 }}
                    className="flex items-center text-gray-300 hover:text-white group"
                  >
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-purple-900/30 to-purple-900/10 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Mail className="w-5 h-5 text-purple-400" />
                    </motion.div>
                    <div>
                      <p className="font-medium">{footerData.email}</p>
                      <p className="text-sm text-gray-400">Response within 12 hours</p>
                    </div>
                  </motion.a>
                )}

                {footerData.address && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-gray-300 group"
                  >
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.4 }}
                    >
                      <MapPin className="w-5 h-5 text-emerald-400" />
                    </motion.div>
                    <div>
                      <p className="font-medium">{footerData.address}</p>
                      <p className="text-sm text-gray-400">Dubai Design District</p>
                    </div>
                  </motion.div>
                )}

                {footerData.workingHours && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-gray-300 group"
                  >
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-amber-900/30 to-amber-900/10 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Clock className="w-5 h-5 text-amber-400" />
                    </motion.div>
                    <div>
                      <p className="font-medium">{footerData.workingHours}</p>
                      <p className="text-sm text-gray-400">By appointment only</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    onMouseEnter={() => setHoveredSocial(social.label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center relative overflow-hidden group shadow-lg`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      animate={hoveredSocial === social.label ? { x: '100%' } : { x: '-100%' }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative z-10">
                      {social.icon}
                    </div>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-white/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Links & Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              </div>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white flex items-center gap-2 group py-2"
                    >
                      <ArrowRight className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                      <span className="border-b border-transparent group-hover:border-blue-400 transition-all duration-300">
                        {link.name}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">Our Services</h4>
              </div>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white flex items-center gap-2 py-2"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>{service}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter & CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Stay Updated</h4>
                  <p className="text-gray-300 text-sm">
                    Subscribe for design tips, project updates, and exclusive offers.
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.div 
                    className="flex-1" 
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </motion.div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </motion.button>
                </div>
                {message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-sm font-medium"
                  >
                    {message}
                  </motion.p>
                )}
              </form>
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 backdrop-blur-sm border border-green-700/50 rounded-2xl p-6 lg:p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                    Quick Support
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Get instant answers on WhatsApp
                  </p>
                </div>
                <motion.div
                  animate={isMounted ? { rotate: [0, 10, 0] } : {}}
                  transition={isMounted ? { duration: 3, repeat: Infinity } : {}}
                  className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                >
                  <MessageCircle className="w-7 h-7 text-white" />
                </motion.div>
              </div>
              
              {footerData.whatsapp && (
                <motion.a
                  href={`https://wa.me/${footerData.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl gap-3 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Chat with Us
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-gray-800/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {isMounted ? new Date().getFullYear() : '2024'} PTS Design Studio. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Dubai, United Arab Emirates | DED License: 123456789
              </p>
            </div>

            {/* Policies */}
            <div className="flex items-center gap-6">
              <motion.a
                href="/privacy"
                whileHover={{ scale: 1.05 }}
                className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors"
              >
                <Shield className="w-4 h-4" />
                Privacy Policy
              </motion.a>
              <motion.a
                href="/terms"
                whileHover={{ scale: 1.05 }}
                className="text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Terms of Service
              </motion.a>
            </div>
          </div>

          {/* Design Credit */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 pt-6 border-t border-gray-800/30"
          >
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              Crafted with passion by PTS Design Studio
              <span className="text-gray-600 mx-2">•</span>
              Transforming spaces since 2010
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}