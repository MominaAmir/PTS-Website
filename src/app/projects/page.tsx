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
    { id: 'all', name: 'All Projects', count: 24 },
    { id: 'commercial', name: 'Commercial', count: 8 },
    { id: 'residential', name: 'Residential', count: 10 },
    { id: 'healthcare', name: 'Healthcare', count: 3 },
    { id: 'retail', name: 'Retail', count: 3 },
  ]

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
      year: '2023'
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
      year: '2023'
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
      year: '2023'
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
      year: '2023'
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
      year: '2022'
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
      year: '2022'
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
      year: '2022'
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
      year: '2022'
    },
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
          <p className="text-xl max-w-3xl opacity-90">
            Explore our completed projects across Dubai and the UAE. Each project reflects our 
            commitment to quality, innovation, and client satisfaction.
          </p>
        </div>
      </div>

      {/* Filters & Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category.id 
                  ? 'bg-primary text-white' 
                  : 'bg-neutral-light text-neutral-700 hover:bg-neutral-200'}`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* View Controls & Search */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-neutral-50">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4">
                      <button className="bg-white text-primary px-4 py-2 rounded-lg font-semibold flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>View Project</span>
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                  <p className="text-neutral-600 mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span className="text-sm">{project.area}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <span className="text-sm">{project.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-secondary" />
                      <span className="text-sm">{project.client}</span>
                    </div>
                    <div className="text-sm text-neutral-500">{project.year}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative h-64 md:h-auto">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold capitalize mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-2xl font-bold text-primary">{project.title}</h3>
                      </div>
                      <button className="text-primary hover:text-primary/80">
                        <Eye className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <p className="text-neutral-600 mb-6">{project.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-neutral-500">Area</div>
                        <div className="font-semibold">{project.area}</div>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500">Duration</div>
                        <div className="font-semibold">{project.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500">Client</div>
                        <div className="font-semibold">{project.client}</div>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500">Year</div>
                        <div className="font-semibold">{project.year}</div>
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
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold">
              Load More Projects
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto mb-6 bg-neutral-light rounded-full flex items-center justify-center">
              <Eye className="w-12 h-12 text-neutral-400" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3">No Projects Found</h3>
            <p className="text-neutral-600 max-w-md mx-auto">
              Try selecting a different category or search term to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}