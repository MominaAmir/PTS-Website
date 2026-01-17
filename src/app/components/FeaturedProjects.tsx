'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Project {
  _id: string
  title: string
  location: string
  image?: string
  category?: string[]
  description?: string
}

interface FeaturedProjectsProps {
  projects: Project[]
  isLoading: boolean
}

export default function FeaturedProjects({ projects, isLoading }: FeaturedProjectsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse"></div>
        ))}
      </div>
    )
  }

  if (projects.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-2xl"
        >
          {project.image && (
            <div 
              className="h-64 md:h-80 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
              style={{ backgroundImage: `url(${project.image})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                  {project.category?.[0] || 'Project'}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-200 mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">
                  📍 {project.location}
                </span>
                <Link 
                  href={`/projects/${project._id}`}
                  className="flex items-center text-white hover:text-secondary transition-colors"
                >
                  View Details <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* View All Projects Button */}
      <div className="md:col-span-2 text-center mt-8">
        <Link
          href="/projects"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          View All Projects
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}