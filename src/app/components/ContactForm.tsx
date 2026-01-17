'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Send, Phone, Mail, Clock, MessageSquare, Building, User, Sparkles, ArrowRight, Zap } from 'lucide-react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    projectType: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const services = [
    'Luxury Residential Design',
    'Commercial Office Spaces',
    'Hospitality & Retail',
    'Healthcare Facilities',
    'Custom Furniture Design',
    'Project Management',
    'Lighting Design',
    'Space Planning'
  ]

  const projectTypes = [
    'New Construction',
    'Renovation',
    'Complete Redesign',
    'Partial Update',
    'Commercial Fit-out',
    'Consultation Only'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        projectType: ''
      })
    }, 2000)
  }

  const contactInfo = [
    {
      icon: <Phone className="w-7 h-7" />,
      title: 'Call Us',
      details: '+971 4 123 4567',
      subtitle: 'Available 24/7 for emergencies',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: <Mail className="w-7 h-7" />,
      title: 'Email Us',
      details: 'contact@ptsdesign.com',
      subtitle: 'Response within 12 hours',
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: 'Working Hours',
      details: 'Sun - Thu: 8AM - 6PM',
      subtitle: 'Friday: 9AM - 1PM',
      color: 'from-emerald-500 to-teal-400'
    }
  ]

  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    color: [
      'bg-gradient-to-br from-blue-300/20 to-cyan-300/20',
      'bg-gradient-to-br from-purple-300/20 to-pink-300/20',
      'bg-gradient-to-br from-yellow-300/20 to-orange-300/20',
      'bg-gradient-to-br from-emerald-300/20 to-teal-300/20'
    ][Math.floor(Math.random() * 4)]
  }))

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated Colorful Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-50/30 via-transparent to-emerald-50/30" />
        
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-300 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-300 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-transparent" />
        </div>

        {/* Animated floating shapes */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className={`absolute ${element.color} rounded-full blur-xl`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: element.size,
              height: element.size,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay,
            }}
          />
        ))}

        {/* Mouse follower effect */}
        <motion.div
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x - 250,
            y: mousePosition.y - 250,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
        />
      </motion.div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, #6366f1 1px, transparent 1px),
                              linear-gradient(to bottom, #6366f1 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full mb-8 shadow-lg"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-blue-500" />
            </motion.div>
            <span className="text-sm font-semibold tracking-wider bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GET IN TOUCH
            </span>
            <motion.div 
              className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            <span className="block">Start Your</span>
            <motion.span 
              className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              style={{ backgroundSize: '200% 100%' }}
            >
              Design Journey
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Contact us for a complimentary consultation and let our experts guide you through 
            transforming your space into something extraordinary.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
            
            <div className="relative bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl">
              <motion.div 
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Send className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Project Inquiry</h3>
                  <p className="text-gray-600 text-sm">Fill out the form below</p>
                </div>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Phone Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[{
                    label: 'Full Name *',
                    icon: <User className="w-4 h-4" />,
                    type: 'text',
                    value: formData.name,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value}),
                    placeholder: 'Enter your name'
                  }, {
                    label: 'Phone Number *',
                    icon: <Phone className="w-4 h-4" />,
                    type: 'tel',
                    value: formData.phone,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, phone: e.target.value}),
                    placeholder: '+971 XXX XXX XXX'
                  }].map((field, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="group"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        {field.icon}
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type={field.type}
                          required
                          className="w-full px-4 py-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-blue-300"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={field.placeholder}
                        />
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"
                          whileHover={{ scaleX: 1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 hover:border-blue-300"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"
                      whileHover={{ scaleX: 1 }}
                    />
                  </div>
                </motion.div>

                {/* Service and Project Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[{
                    label: 'Service Required *',
                    value: formData.service,
                    options: services,
                    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, service: e.target.value})
                  }, {
                    label: 'Project Type *',
                    value: formData.projectType,
                    options: projectTypes,
                    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, projectType: e.target.value})
                  }].map((field, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="group"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                      </label>
                      <div className="relative">
                        <select
                          required
                          className="w-full px-4 py-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 text-gray-900 appearance-none cursor-pointer hover:border-blue-300"
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <option value="" className="bg-white">Select option</option>
                          {field.options.map((option) => (
                            <option key={option} value={option} className="bg-white">
                              {option}
                            </option>
                          ))}
                        </select>
                        <motion.div 
                          className="absolute inset-y-0 right-4 flex items-center pointer-events-none"
                          animate={{ y: [0, 2, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="w-2 h-2 border-r-2 border-b-2 border-blue-500 transform rotate-45" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="group"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Project Details *
                  </label>
                  <div className="relative">
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-4 bg-white/60 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 resize-none hover:border-blue-300"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your project vision, timeline, budget, and any specific requirements..."
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"
                      whileHover={{ scaleX: 1 }}
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-5 px-8 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Send Message</span>
                      <ArrowRight className="w-5 h-5 relative z-10 ml-2" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Cards with stagger animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.03,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="group relative bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
                >
                  {/* Background gradient animation */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%'] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-white">
                        {info.icon}
                      </div>
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="font-semibold text-lg text-gray-900 mb-1"
                        whileHover={{ x: 5 }}
                      >
                        {info.title}
                      </motion.h3>
                      <motion.p 
                        className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1"
                        animate={{ backgroundPosition: ['0%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                        style={{ backgroundSize: '200% 100%' }}
                      >
                        {info.details}
                      </motion.p>
                      <p className="text-sm text-gray-600">{info.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring" }}
              whileHover={{ y: -5 }}
              className="group relative bg-gradient-to-br from-green-50 to-emerald-100 backdrop-blur-md border border-green-200 rounded-2xl p-8 overflow-hidden shadow-lg hover:shadow-xl"
            >
              {/* Animated background */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-green-300/20 rounded-full -translate-y-16 translate-x-16"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <motion.h3
                      className="font-bold text-2xl text-gray-900 mb-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Instant WhatsApp Support
                    </motion.h3>
                    <p className="text-green-700">
                      Get quick answers to your questions
                    </p>
                  </div>
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
                
                <motion.a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                >
                  {/* Button animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-600"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Chat with Our Design Expert
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </motion.a>
              </div>
            </motion.div>

            {/* Additional Information Card with animations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl"
            >
              <motion.div 
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center"
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">Additional Information</h3>
                  <p className="text-gray-600">Important details for your convenience</p>
                </div>
              </motion.div>
              
              <div className="space-y-4">
                {[
                  {
                    title: 'Response Time',
                    desc: 'We guarantee a response within 12 hours during business days',
                    color: 'blue'
                  },
                  {
                    title: 'Consultation',
                    desc: 'First consultation is always complimentary and obligation-free',
                    color: 'green'
                  },
                  {
                    title: 'Privacy',
                    desc: 'Your information is secure and never shared with third parties',
                    color: 'purple'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-3 group"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className={`w-6 h-6 rounded-full bg-${item.color}-100 flex items-center justify-center flex-shrink-0 mt-1`}
                      whileHover={{ scale: 1.2 }}
                    >
                      <motion.div 
                        className={`w-2 h-2 rounded-full bg-${item.color}-600`}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Note with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-gray-300"
        >
          <motion.p 
            className="text-gray-600 text-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            We respect your privacy. Your information will never be shared with third parties.
          </motion.p>
          <motion.p 
            className="text-gray-600 text-sm mt-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            Expect a response within 12 hours during business days.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactForm