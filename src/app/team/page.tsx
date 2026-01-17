'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  ArrowLeft, 
  Sparkles, 
  Award, 
  Briefcase, 
  Mail,
  Linkedin,
  Globe,
  Star,
  Calendar
} from 'lucide-react'
import { getSanityClient } from '../../../lib/sanity'
import Link from 'next/link'
import PortableText from '../components/PortableText'

interface TeamMember {
  _id: string
  name: string
  title?: string
  image?: string
  bio?: string
  experience?: number
  expertise?: string[]
  linkedin?: string
  email?: string
  displayOrder?: number
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      const query = `*[_type == "team"] | order(displayOrder asc) {
        _id,
        name,
        title,
        "image": image.asset->url,
        bio,
        experience,
        expertise,
        linkedin,
        email,
        displayOrder
      }`
     
const client = getSanityClient();
if (!client) return; // or handle appropriately

const data = await client.fetch(query);
      setTeam(data)
    } catch (error) {
      console.error('Error fetching team:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const departments = [
    { id: 'all', label: 'All Team' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'design', label: 'Design Team' },
    { id: 'project', label: 'Project Management' },
    { id: 'technical', label: 'Technical Team' }
  ]

  const filteredTeam = filter === 'all' 
    ? team 
    : team.filter(member => 
        member.expertise?.some(skill => 
          skill.toLowerCase().includes(filter.toLowerCase())
        ) || 
        member.title?.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <div className="pt-20 bg-gradient-to-b from-white via-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
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
            <Link href="/about" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to About</span>
            </Link>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8"
            >
              <Users className="w-4 h-4" />
              <span className="text-sm font-semibold">OUR TEAM</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="block">Meet Our</span>
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Design Experts
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A team of passionate designers, architects, and project managers dedicated to 
              transforming spaces across Dubai with innovation and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Team Members', icon: <Users className="w-6 h-6" /> },
              { value: '13+', label: 'Years Experience', icon: <Calendar className="w-6 h-6" /> },
              { value: '25+', label: 'Awards Won', icon: <Award className="w-6 h-6" /> },
              { value: '500+', label: 'Projects', icon: <Briefcase className="w-6 h-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Team Filter */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setFilter(dept.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === dept.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
                }`}
              >
                {dept.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredTeam.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTeam.map((member, index) => (
                <motion.div
                  key={member._id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden group"
                >
                  {/* Profile Image */}
                  <div className="h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 relative">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-5xl font-bold text-white">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Experience Badge */}
                    {member.experience && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                        {member.experience}+ years
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-4">{member.title}</p>
                    
                    {/* Bio Preview */}
                    <div className="text-gray-600 mb-6 line-clamp-3">
  {member.bio ? (
    typeof member.bio === 'string' ? (
      member.bio
    ) : (
      <PortableText value={member.bio} />
    )
  ) : (
    `${member.name} is a key member of our team with expertise in interior design.`
  )}
</div>

                    {/* Expertise */}
                    {member.expertise && member.expertise.length > 0 && (
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Links */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                          title="Email"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-16 h-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No team members found</h3>
              <p className="text-gray-600 mb-8">
                {filter !== 'all' ? `No team members in the ${filter} department yet.` : 'Team information coming soon.'}
              </p>
              <button
                onClick={() => setFilter('all')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                View All Team
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4" />
              <span>JOIN OUR TEAM</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Want to Join Our Creative Team?
            </h2>
            
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              We're always looking for talented designers, architects, and project managers 
              who share our passion for excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/careers"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
              >
                View Careers
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Send Resume
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  )
}