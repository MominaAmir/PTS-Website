'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Eye, MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'

interface Project {
  _id: string
  title: string
  location: string
  image?: string
  category?: string[]
  description?: string
  client?: string
  year?: string
}

interface ProjectGalleryProps {
  projects: Project[]
  isLoading: boolean
}

export default function ProjectGallery({ projects, isLoading }: ProjectGalleryProps) {
  // Default projects if none from Sanity
  const defaultProjects = [
    
    {
      _id: '1',
      title: 'Corporate Office - DIFC',
      location: 'DIFC, Dubai',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      category: ['Commercial'],
      description: 'Modern office design for financial institution.',
      client: 'ABC Corporation',
      year: '2023'
    }
  ]

  const displayProjects = projects.length > 0 ? projects : defaultProjects

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our premium interior design projects across Dubai
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
            >
              {/* Image with hover effect */}
              <div className="relative h-96 overflow-hidden">
                {project.image ? (
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
                )}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Category badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="absolute top-6 left-6"
                >
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                    {project.category?.[0] || 'Project'}
                  </span>
                </motion.div>
                
                {/* View button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                  className="absolute top-6 right-6"
                >
                  <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Eye className="w-5 h-5 text-white" />
                  </button>
                </motion.div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    className="text-2xl md:text-3xl font-bold text-white mb-3"
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.6 }}
                    className="text-gray-200 mb-6 line-clamp-2"
                  >
                    {project.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.7 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-white/80">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{project.location}</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{project.year}</span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/projects/${project._id}`}
                      className="flex items-center text-white hover:text-secondary transition-colors font-semibold"
                    >
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 group"
          >
            View All Projects
            <motion.div
              className="ml-3"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>

        {isLoading && projects.length === 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-lg">
              <div className="w-4 h-4 bg-secondary rounded-full animate-pulse mr-2" />
              <span className="text-gray-600">Loading featured projects...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}