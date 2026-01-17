'use client'

import { X, MapPin, Calendar, Users, Ruler, DollarSign, Building } from 'lucide-react'
import { Project } from '../../../lib/types'
import { useEffect, useState } from 'react'
import { client } from '../../../lib/sanity'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [fullProject, setFullProject] = useState<Project | null>(project)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch complete project data when modal opens
  useEffect(() => {
    if (project.slug) {
      fetchFullProject()
    }
  }, [project.slug])

  const fetchFullProject = async () => {
    setIsLoading(true)
    try {
      const query = `
        *[_type == "project" && slug.current == "${project.slug}"][0] {
          _id,
          title,
          "slug": slug.current,
          category,
          "image": mainImage.asset->url,
          description,
          area,
          duration,
          client,
          year,
          location,
          status,
          services,
          designStyle,
          budget,
          "gallery": gallery[].asset->url,
          featured,
          completionDate,
          squareFeet,
          fullDescription
        }
      `
      const data = await client.fetch(query)
      setFullProject(data)
    } catch (error) {
      console.error('Error fetching project details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 p-6 border-b flex justify-between items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold capitalize mb-2">
                  {fullProject?.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                  {fullProject?.title}
                </h2>
                <p className="text-neutral-600 mt-1">{fullProject?.location}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative h-64 md:h-96">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${fullProject?.image})` }}
              />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {fullProject?.area && (
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Ruler className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500">Area</div>
                      <div className="font-semibold">{fullProject.area}</div>
                    </div>
                  </div>
                )}

                {fullProject?.duration && (
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500">Duration</div>
                      <div className="font-semibold">{fullProject.duration}</div>
                    </div>
                  </div>
                )}

                {fullProject?.client && (
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500">Client</div>
                      <div className="font-semibold">{fullProject.client}</div>
                    </div>
                  </div>
                )}

                {fullProject?.budget && (
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <DollarSign className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500">Budget</div>
                      <div className="font-semibold">{fullProject.budget}</div>
                    </div>
                  </div>
                )}

                {fullProject?.year && (
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Calendar className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500">Year</div>
                      <div className="font-semibold">{fullProject.year}</div>
                    </div>
                  </div>
                )}

                {fullProject?.designStyle && (
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Building className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500">Design Style</div>
                      <div className="font-semibold">{fullProject.designStyle}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary mb-4">Project Overview</h3>
                <p className="text-neutral-700 leading-relaxed">
                  {fullProject?.description}
                </p>
                {fullProject?.description && (
                  <div className="mt-4 prose max-w-none">
                    {/* Render rich text from Sanity */}
                    <p className="text-neutral-700">{fullProject.description}</p>
                  </div>
                )}
              </div>

              {/* Services */}
              {fullProject?.services && fullProject.services.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">Services Provided</h3>
                  <div className="flex flex-wrap gap-2">
                    {fullProject.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-medium"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Preview */}
              {fullProject?.gallery && fullProject.gallery.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {fullProject.gallery.slice(0, 6).map((img, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden"
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-300"
                          style={{ backgroundImage: `url(${img})` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}