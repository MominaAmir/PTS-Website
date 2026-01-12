'use client'

import { X, MapPin, Calendar } from 'lucide-react'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/lib/types'


interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Image Gallery */}
            <div className="relative h-64 lg:h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Project Details */}
            <div className="p-8 lg:p-12 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold">
                    {project.category}
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-primary mt-4">
                    {project.title}
                  </h2>
                  <p className="text-neutral-600 text-lg mt-4">{project.description}</p>
                </div>

                {/* Project Details Grid */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-neutral-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Location</span>
                    </div>
                    <p className="font-medium">Dubai, UAE</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-neutral-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Completed</span>
                    </div>
                    <p className="font-medium">{project.year || '2023'}</p>
                  </div>
                </div>

                {/* Project Features */}
                <div className="pt-6 border-t">
                  <h4 className="text-xl font-semibold text-primary mb-4">Project Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Custom Furniture', 'Smart Home Integration', 'Energy Efficient Lighting', 'Premium Materials', '3D Visualization', 'Warranty Included'].map((feature) => (
                      <li key={feature} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        <span className="text-neutral-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Client Testimonial */}
                <div className="pt-6 border-t">
                  <h4 className="text-xl font-semibold text-primary mb-4">Client Feedback</h4>
                  <div className="bg-neutral-light p-6 rounded-xl">
                    <p className="italic text-neutral-600">
                      "PTS transformed our office space beyond expectations. Their attention to detail and professionalism was outstanding."
                    </p>
                    <div className="flex items-center space-x-3 mt-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-bold text-primary">A</span>
                      </div>
                      <div>
                        <p className="font-semibold">Ahmed Al Maktoum</p>
                        <p className="text-sm text-neutral-500">CEO, ABC Corporation</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-6">
                  <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                    Request Similar Project
                  </button>
                  <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-semibold">
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectModal