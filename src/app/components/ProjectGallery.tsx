'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Maximize2 } from 'lucide-react'
import ProjectModal from './ProjectModal'
import { Project } from '@/lib/types'

const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: 'Luxury Office Tower',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      description: 'Modern office design for a financial institution in DIFC',
      area: '25,000 sq ft',
      duration: '6 Months',
      client: 'ABC Corporation',
      year: '2023'
    },
    {
      id: 2,
      title: 'Beachfront Villa',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Complete interior design for a Palm Jumeirah villa',
      area: '15,000 sq ft',
      duration: '8 Months',
      client: 'Private Client',
      year: '2023'
    },
    {
      id: 3,
      title: 'Medical Clinic',
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1516549655669-df565bc5d5e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      description: 'Healthcare facility designed for patient comfort',
      area: '12,000 sq ft',
      duration: '5 Months',
      client: 'MedCare Group',
      year: '2023'
    },
    {
      id: 4,
      title: 'Fine Dining Restaurant',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Upscale restaurant interior in Downtown Dubai',
      area: '8,000 sq ft',
      duration: '4 Months',
      client: 'Fine Dining Group',
      year: '2023'
    },
    {
      id: 5,
      title: 'Retail Boutique',
      category: 'Retail',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Luxury fashion boutique in Dubai Mall',
      area: '5,000 sq ft',
      duration: '3 Months',
      client: 'Luxe Fashion',
      year: '2022'
    },
    {
      id: 6,
      title: 'School Campus',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Modern learning environment design',
      area: '40,000 sq ft',
      duration: '10 Months',
      client: 'Future Education',
      year: '2022'
    }
  ]

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Showcasing our finest interior design projects across Dubai and the UAE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-square relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-black/70 backdrop-blur-sm p-4 rounded-lg">
                  <span className="text-secondary text-sm font-semibold">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold mt-1">{project.title}</h3>
                  <p className="text-sm opacity-90 mt-2">{project.description}</p>
                  <button className="mt-4 text-secondary hover:text-secondary/80 flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              <div className="absolute top-4 right-4">
                <div className="bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-5 h-5 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All Projects
          </a>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

export default ProjectGallery