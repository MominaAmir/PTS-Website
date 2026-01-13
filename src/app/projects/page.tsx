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

  const projects: Project[] = [
    // ... (keep your projects array as is)
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

      {/* Projects Grid/List */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-16 md:pb-24">
        {/* ... rest of your projects grid/list code remains the same ... */}
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