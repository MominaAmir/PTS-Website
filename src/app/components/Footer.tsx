'use client'

import { useState } from 'react'
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Clock, Send, ChevronRight, Heart } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Footer = () => {
  const [email, setEmail] = useState('')
  const currentYear = new Date().getFullYear()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribed:', email)
    setEmail('')
    alert('Thank you for subscribing!')
  }

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/projects' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const services = [
    'Interior Design',
    'Fit-Out Construction',
    'Commercial Projects',
    'Residential Projects',
    'Healthcare & Education',
    'Retail Spaces',
    'Civil Maintenance',
    'Authority Approvals'
  ]

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Visit Our Office',
      details: 'Dubai, United Arab Emirates',
      link: 'https://maps.google.com/?q=Dubai,UAE'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: 'Call Us Today',
      details: '+971 4 XXX XXXX',
      link: 'tel:+9714XXXXXXX'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Send Email',
      details: 'info@immersioninterior.ae',
      link: 'mailto:info@immersioninterior.ae'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Working Hours',
      details: 'Sun-Thu: 8AM-6PM',
      link: null
    }
  ]

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Brand & Newsletter */}
            <div>
              <div className="mb-8">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <span className="text-2xl font-bold">ID</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">PTS</h2>
                    <p className="text-white/80">Premium Design & Fit-Out</p>
                  </div>
                </Link>
              </div>

              <p className="text-white/80 mb-8 text-lg max-w-md">
                Transforming spaces in Dubai for over 13 years. We create inspiring 
                environments that reflect your vision and exceed expectations.
              </p>

              {/* Newsletter Subscription */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
                <p className="text-white/80 mb-4">Subscribe to our newsletter for design tips and updates</p>
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-r-lg font-semibold flex items-center space-x-2 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    <span>Subscribe</span>
                  </button>
                </form>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: <Facebook className="w-6 h-6" />, href: '#', label: 'Facebook' },
                    { icon: <Instagram className="w-6 h-6" />, href: '#', label: 'Instagram' },
                    { icon: <Linkedin className="w-6 h-6" />, href: '#', label: 'LinkedIn' },
                    { icon: <Twitter className="w-6 h-6" />, href: '#', label: 'Twitter' },
                    { icon: <Mail className="w-6 h-6" />, href: '#', label: 'Email' },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ y: -5 }}
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors group"
                      aria-label={social.label}
                    >
                      <div className="group-hover:scale-110 transition-transform">
                        {social.icon}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Links & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Quick Links & Services */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    Quick Links
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </h3>
                  <ul className="space-y-3">
                    {quickLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white/80 hover:text-white flex items-center group transition-colors"
                        >
                          <span className="w-2 h-2 bg-secondary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Our Services</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {services.map((service) => (
                      <li key={service} className="text-white/80 hover:text-white transition-colors">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 group"
                    >
                      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                        <div className="text-secondary">{info.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold">{info.title}</h4>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-white/80 hover:text-white transition-colors"
                          >
                            {info.details}
                          </a>
                        ) : (
                          <p className="text-white/80">{info.details}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <div className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/20">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Chat on WhatsApp</h4>
                      <p className="text-sm text-white/80">Instant response within minutes</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/971XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  >
                    <span>Start Chat</span>
                    <ChevronRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-white/80">
                  &copy; {currentYear} Power Point Technical Service LLC (PTS Design)
                </p>
                <p className="text-sm text-white/60 mt-1">
                  Dubai, UAE • License Number: XXXXXXX • VAT: XXXXXXXX
                </p>
              </div>

              {/* Made with love */}
              <div className="flex items-center space-x-2 text-white/80">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>in Dubai</span>
              </div>

              {/* Policy Links */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/privacy" className="text-white/80 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
                <span className="text-white/40">•</span>
                <Link href="/terms" className="text-white/80 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
                <span className="text-white/40">•</span>
                <Link href="/sitemap" className="text-white/80 hover:text-white transition-colors text-sm">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-secondary hover:bg-secondary/90 text-white p-3 rounded-full shadow-lg z-50 transition-all hover:scale-110"
          aria-label="Back to top"
        >
          <ChevronRight className="w-6 h-6 rotate-270" />
        </button>
      </div>
    </footer>
  )
}

export default Footer