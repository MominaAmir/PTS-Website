'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building, 
  Target, 
  Users, 
  Shield, 
  Award, 
  Globe, 
  Sparkles,
  ArrowRight,
  Calendar,
  Trophy,
  Briefcase,
  ChevronRight,
  Heart
} from 'lucide-react'
import { getSanityClient } from '../../../lib/sanity'
import PortableText from '../components/PortableText'

interface TeamMember {
  _id: string
  name: string
  title?: string
  image?: string
  bio?: string
  experience?: number
  expertise?: string[]
  displayOrder?: number
}

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      const query = `*[_type == "team"] | order(displayOrder asc)[0...3] {
        _id,
        name,
        title,
        "image": image.asset->url,
        bio,
        experience,
        expertise,
        displayOrder
      }`
      const client = getSanityClient()
if (!client) return // or throw/return early

const data = await client.fetch(query)
      setTeam(data)
    } catch (error) {
      console.error('Error fetching team:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Excellence',
      description: 'Uncompromising quality in every detail of our work.',
      color: 'from-blue-600 to-cyan-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Integrity',
      description: 'Transparent processes and honest communication.',
      color: 'from-emerald-600 to-teal-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'Working closely with clients to realize their vision.',
      color: 'from-purple-600 to-pink-500'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Incorporating latest trends and technologies.',
      color: 'from-amber-600 to-orange-500'
    }
  ]

  const milestones = [
    { 
      year: '2010', 
      title: 'Company Founded', 
      description: 'Started operations in Dubai',
      icon: <Building className="w-6 h-6" />
    },
    { 
      year: '2013', 
      title: 'First Major Project', 
      description: 'Completed 50,000 sq ft commercial project',
      icon: <Trophy className="w-6 h-6" />
    },
    { 
      year: '2016', 
      title: 'Team Expansion', 
      description: 'Grew to 30+ design professionals',
      icon: <Users className="w-6 h-6" />
    },
    { 
      year: '2020', 
      title: 'Premium Partner', 
      description: 'Became preferred vendor for luxury developments',
      icon: <Award className="w-6 h-6" />
    },
    { 
      year: '2023', 
      title: '500+ Projects', 
      description: 'Celebrated milestone of 500 completed projects',
      icon: <Briefcase className="w-6 h-6" />
    },
  ]

  const certifications = [
    { name: 'Dubai Municipality Certified', icon: <Shield className="w-12 h-12" /> },
    { name: 'DED Licensed', icon: <Award className="w-12 h-12" /> },
    { name: 'LEED Certified Partners', icon: <Globe className="w-12 h-12" /> },
    { name: 'ISO 9001 Certified', icon: <Building className="w-12 h-12" /> },
  ]

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="pt-20 bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section with Enhanced Design */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">ABOUT PTS DESIGN</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="block">Redefining Interior</span>
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Design Excellence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              With over 13 years of excellence in Dubai, PTS Design has established
              itself as a premier provider of innovative interior design and fit-out solutions,
              transforming spaces that inspire and endure.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Story with Enhanced Layout */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                <Building className="w-4 h-4" />
                <span>OUR STORY</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Crafting <span className="text-blue-600">Masterpieces</span> Since 2010
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2010 as Power Point Technical Service LLC, PTS Design began with a vision 
                  to transform Dubai's interior design landscape. What started as a small team of 
                  passionate designers has grown into a 50+ member strong organization.
                </p>
                <p>
                  Over the years, we've completed over 500 projects across residential, commercial, 
                  healthcare, and retail sectors. Our commitment to quality and innovation has made 
                  us a trusted partner for prestigious developments across the UAE.
                </p>
                <p>
                  Today, we combine traditional craftsmanship with cutting-edge technology to 
                  deliver spaces that are not only beautiful but also functional and sustainable.
                </p>
              </div>

              {/* Stats Grid */}
             
            </motion.div>

            {/* Enhanced Image/Illustration Section */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20" />
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-2 shadow-2xl">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-48 h-48 mx-auto mb-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full flex items-center justify-center"
                    >
                      <Building className="w-32 h-32 text-white/30" />
                    </motion.div>
                    <div className="space-y-4">
                      <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
                      <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
                      <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values - Enhanced Design */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" />
              <span>OUR VALUES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Principles That <span className="text-blue-600">Guide Us</span>
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide every decision and every project we undertake, ensuring excellence in everything we do.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
              >
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {value.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                
                {/* Decorative line */}
                <div className={`mt-6 w-12 h-1 bg-gradient-to-r ${value.color} rounded-full`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Milestones Timeline - Enhanced Design */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-6">
              <Trophy className="w-4 h-4" />
              <span>OUR JOURNEY</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Milestones That <span className="text-amber-600">Shaped Us</span>
            </h2>
            <p className="text-xl text-gray-600">
              Key moments that defined our journey to becoming a leader in interior design.
            </p>
          </motion.div>

          <div className="relative">
            {/* Center timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-20"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all ${index % 2 === 0 ? 'mr-6' : 'ml-6'}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <div className="text-blue-600">
                          {milestone.icon}
                        </div>
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {milestone.year}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </motion.div>
                </div>
                
                {/* Timeline dot */}
                <div className="relative w-12 h-12 flex-shrink-0">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </motion.div>
                </div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Enhanced Design */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              <span>OUR LEADERS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Leadership</span>
            </h2>
            <p className="text-xl text-gray-300">
              The experienced professionals guiding our vision and ensuring project success.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : team.length > 0 ? (
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {team.map((member, index) => (
                <motion.div
                  key={member._id}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 border border-white/20 hover:border-white/40 relative overflow-hidden group"
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                  </div>

                  {/* Profile Image or Initial */}
                  <div className="relative w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-all">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 flex items-center justify-center">
                        <span className="text-5xl font-bold text-white">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    
                    {/* Experience badge */}
                    {member.experience && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full border-2 border-white">
                        {member.experience}+ years
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="text-center relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-blue-300 mb-4 font-medium">{member.title}</p>

                    {member.bio ? (
                      <div className="text-gray-300 text-sm mb-6 line-clamp-3">
                        <PortableText value={member.bio} />
                      </div>
                    ) : (
                      <p className="text-gray-300 text-sm mb-6">
                        {member.name} is a key member of our leadership team.
                      </p>
                    )}

                    {/* Expertise Tags */}
                    {member.expertise && member.expertise.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2">
                        {member.expertise.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/10 text-white text-xs rounded-full backdrop-blur-sm border border-white/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="w-32 h-32 mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Users className="w-16 h-16 text-white/40" />
              </div>
              <p className="text-white/80 mb-6 text-xl">Team information coming soon</p>
              <motion.a
                href="/admin"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-white/90 transition-colors font-semibold"
              >
                <span>Add Team in Admin</span>
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </div>
          )}

          {/* View Full Team Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.a
              href="/PTS-Website/team"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              <span>View Full Team</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Certifications & Partnerships - Enhanced Design */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              <span>ACCreditations</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Recognized by <span className="text-emerald-600">Leaders</span>
            </h2>
            <p className="text-xl text-gray-600">
              Accredited by leading industry bodies and trusted by premium brands worldwide.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group"
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="text-emerald-600">
                      {cert.icon}
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 text-lg">{cert.name}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Space?
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Partner with Dubai's leading interior design experts to create spaces that inspire and endure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                >
                  Start Your Project
                </motion.a>
                <motion.a
                  href="/PTS-Website/projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border border-gray-300 hover:border-gray-400 hover:shadow-lg transition-all duration-300"
                >
                  View Our Work
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}