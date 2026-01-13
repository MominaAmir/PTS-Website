'use client'

import { useState } from 'react'
import { Filter, Grid, List, Search, Eye, Calendar, MapPin, Users } from 'lucide-react'
import ProjectModal from '../components/ProjectModal'
import { Project } from '@/lib/types'

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const categories = [
    { id: 'all', name: 'All', count: 24 },
    { id: 'commercial', name: 'Commercial', count: 8 },
    { id: 'residential', name: 'Residential', count: 10 },
    { id: 'healthcare', name: 'Healthcare', count: 3 },
    { id: 'retail', name: 'Retail', count: 3 },
  ]

  // ✅ FIXED: Complete projects array
  const projects: Project[] = [
    {
      id: 1,
      title: 'Luxury Office Tower - DIFC',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      description: 'Modern office design for a financial institution in Dubai International Financial Centre.',
      area: '25,000 sq ft',
      duration: '6 Months',
      client: 'ABC Corporation',
      year: '2023',
      location: 'Dubai, UAE',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Beachfront Villa - Palm Jumeirah',
      category: 'residential',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Complete interior design for a luxury villa with panoramic sea views.',
      area: '15,000 sq ft',
      duration: '8 Months',
      client: 'Private Client',
      year: '2023',
      location: 'Palm Jumeirah, Dubai',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Medical Center - Dubai Healthcare City',
      category: 'healthcare',
      image: 'https://images.unsplash.com/photo-1516549655669-df565bc5d5e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      description: 'State-of-the-art medical facility designed for patient comfort and efficiency.',
      area: '12,000 sq ft',
      duration: '5 Months',
      client: 'MedCare Group',
      year: '2023',
      location: 'Dubai Healthcare City',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Fine Dining Restaurant - Downtown',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Upscale restaurant interior with contemporary Arabian design elements.',
      area: '8,000 sq ft',
      duration: '4 Months',
      client: 'Fine Dining Group',
      year: '2023',
      location: 'Downtown Dubai',
      status: 'completed'
    },
    {
      id: 5,
      title: 'Luxury Boutique - Dubai Mall',
      category: 'retail',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'High-end fashion boutique featuring custom display units and lighting.',
      area: '5,000 sq ft',
      duration: '3 Months',
      client: 'Luxe Fashion',
      year: '2022',
      location: 'Dubai Mall',
      status: 'completed'
    },
    {
      id: 6,
      title: 'Modern School Campus - Al Barsha',
      category: 'education',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Innovative learning environment with flexible classroom designs.',
      area: '40,000 sq ft',
      duration: '10 Months',
      client: 'Future Education',
      year: '2022',
      location: 'Al Barsha, Dubai',
      status: 'completed'
    },
    {
      id: 7,
      title: 'Corporate Headquarters - Business Bay',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      description: 'Sustainable office design with LEED certification features.',
      area: '30,000 sq ft',
      duration: '7 Months',
      client: 'Tech Solutions Inc.',
      year: '2022',
      location: 'Business Bay, Dubai',
      status: 'completed'
    },
    {
      id: 8,
      title: 'Penthouse Apartment - Marina',
      category: 'residential',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Luxury penthouse with smart home automation and custom finishes.',
      area: '7,000 sq ft',
      duration: '5 Months',
      client: 'Private Client',
      year: '2022',
      location: 'Dubai Marina',
      status: 'completed'
    },
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Our Portfolio</h1>
          <p className="text-base md:text-xl max-w-3xl opacity-90">
            Explore our completed projects across Dubai and the UAE. Each project reflects our 
            commitment to quality, innovation, and client satisfaction.
          </p>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 md:py-12">
        <div className="flex flex-col space-y-4">
          {/* Categories - Horizontal Scroll on Mobile */}
          <div className="relative">
            <div className="flex overflow-x-auto pb-2 space-x-2 md:space-x-3 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${selectedCategory === category.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
                >
                  {category.name} <span className="text-xs opacity-80">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search and Controls - Stacked on Mobile */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
            {/* Search Bar - Full width on mobile */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
              />
            </div>
            
            {/* View Toggle and Filter - Buttons on right */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex border rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 md:p-3 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white hover:bg-neutral-50'}`}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 md:p-3 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white hover:bg-neutral-50'}`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2.5 border rounded-lg hover:bg-neutral-50 whitespace-nowrap text-sm md:text-base">
                <Filter className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ FIXED: Projects Container with consistent padding */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-16 md:pb-24">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white text-primary px-3 py-2 rounded-lg font-semibold flex items-center space-x-2 text-sm">
                        <Eye className="w-3 h-3 md:w-4 md:h-4" />
                        <span>View Project</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs md:text-sm font-semibold capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-2">{project.title}</h3>
                  <p className="text-neutral-600 mb-3 md:mb-4 text-sm md:text-base line-clamp-2">{project.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 md:gap-4 pt-3 md:pt-4 border-t">
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
                      <span className="text-xs md:text-sm truncate">{project.area}</span>
                    </div>
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
                      <span className="text-xs md:text-sm truncate">{project.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <Users className="w-3 h-3 md:w-4 md:h-4 text-secondary" />
                      <span className="text-xs md:text-sm truncate">{project.client}</span>
                    </div>
                    <div className="text-xs md:text-sm text-neutral-500 truncate">{project.year}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                  </div>
                  <div className="md:w-2/3 p-4 md:p-6">
                    <div className="flex justify-between items-start mb-3 md:mb-4">
                      <div>
                        <span className="inline-block px-2 py-1 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-semibold capitalize mb-1 md:mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-lg md:text-2xl font-bold text-primary">{project.title}</h3>
                      </div>
                      <button className="text-primary hover:text-primary/80">
                        <Eye className="w-5 h-5 md:w-6 md:h-6" />
                      </button>
                    </div>
                    
                    <p className="text-neutral-600 mb-4 md:mb-6 text-sm md:text-base">{project.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      <div>
                        <div className="text-xs md:text-sm text-neutral-500">Area</div>
                        <div className="font-semibold text-sm md:text-base">{project.area}</div>
                      </div>
                      <div>
                        <div className="text-xs md:text-sm text-neutral-500">Duration</div>
                        <div className="font-semibold text-sm md:text-base">{project.duration}</div>
                      </div>
                      <div>
                        <div className="text-xs md:text-sm text-neutral-500">Client</div>
                        <div className="font-semibold text-sm md:text-base">{project.client}</div>
                      </div>
                      <div>
                        <div className="text-xs md:text-sm text-neutral-500">Year</div>
                        <div className="font-semibold text-sm md:text-base">{project.year}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredProjects.length > 0 && (
          <div className="text-center mt-8 md:mt-12">
            <button className="px-6 py-2.5 md:px-8 md:py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold text-sm md:text-base">
              Load More Projects
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 md:py-24">
            <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
              <Eye className="w-8 h-8 md:w-12 md:h-12 text-neutral-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 md:mb-3">No Projects Found</h3>
            <p className="text-neutral-600 max-w-md mx-auto text-sm md:text-base">
              Try selecting a different category or search term to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Back to Top Button - Fixed Positioning */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-4 md:bottom-8 md:right-8 bg-secondary hover:bg-secondary/90 text-white p-3 rounded-full shadow-lg z-40 transition-all hover:scale-110"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 rotate-[-90deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}