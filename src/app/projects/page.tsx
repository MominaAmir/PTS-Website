'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Filter, 
  Grid, 
  List, 
  Search, 
  Eye, 
  Calendar, 
  MapPin, 
  Users, 
  Loader2,
  Building,
  Sparkles,
  ArrowRight,
  ChevronDown,
  X,
  Check
} from 'lucide-react'
import ProjectModal from '../components/ProjectModal'
import { Project } from '../../../lib/types'
import { getSanityClient } from '../../../lib/sanity'

// Category configuration
const CATEGORIES = [
  { id: 'all', name: 'All Projects', count: 0, color: 'from-blue-600 to-cyan-500', bgColor: 'bg-gradient-to-r from-blue-600 to-cyan-500' },
  { id: 'commercial', name: 'Commercial', count: 0, color: 'from-purple-600 to-pink-500', bgColor: 'bg-gradient-to-r from-purple-600 to-pink-500' },
  { id: 'residential', name: 'Residential', count: 0, color: 'from-emerald-600 to-teal-500', bgColor: 'bg-gradient-to-r from-emerald-600 to-teal-500' },
  { id: 'healthcare', name: 'Healthcare', count: 0, color: 'from-amber-600 to-orange-500', bgColor: 'bg-gradient-to-r from-amber-600 to-orange-500' },
  { id: 'retail', name: 'Retail', count: 0, color: 'from-red-600 to-rose-500', bgColor: 'bg-gradient-to-r from-red-600 to-rose-500' },
  { id: 'hospitality', name: 'Hospitality', count: 0, color: 'from-indigo-600 to-violet-500', bgColor: 'bg-gradient-to-r from-indigo-600 to-violet-500' },
  { id: 'educational', name: 'Educational', count: 0, color: 'from-blue-600 to-purple-500', bgColor: 'bg-gradient-to-r from-blue-600 to-purple-500' },
]

// Helper function to safely get gradient colors
const getGradientStyle = (colorString: string) => {
  if (!colorString || typeof colorString !== 'string') {
    return {
      background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' // Default blue gradient
    }
  }
  
  try {
    const parts = colorString.split(' ')
    if (parts.length >= 3) {
      const fromColor = parts[0].replace('from-', '').replace(/(\d+)$/, '-$1') || 'blue-600'
      const toColor = parts[2].replace('to-', '').replace(/(\d+)$/, '-$1') || 'cyan-500'
      
      // Convert Tailwind colors to hex for CSS
      const colorMap: Record<string, string> = {
        'blue-600': '#2563eb',
        'cyan-500': '#06b6d4',
        'purple-600': '#9333ea',
        'pink-500': '#ec4899',
        'emerald-600': '#059669',
        'teal-500': '#14b8a6',
        'amber-600': '#d97706',
        'orange-500': '#f97316',
        'red-600': '#dc2626',
        'rose-500': '#f43f5e',
        'indigo-600': '#4f46e5',
        'violet-500': '#8b5cf6',
      }
      
      const fromHex = colorMap[fromColor] || '#2563eb'
      const toHex = colorMap[toColor] || '#06b6d4'
      
      return {
        background: `linear-gradient(135deg, ${fromHex} 0%, ${toHex} 100%)`
      }
    }
  } catch (error) {
    console.warn('Error parsing gradient color:', error)
  }
  
  return {
    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
  }
}

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'a-z' | 'z-a'>('newest')
  const [categories, setCategories] = useState(CATEGORIES)

  // Fetch projects from Sanity
  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterAndSortProjects()
  }, [projects, selectedCategory, searchTerm, sortBy])

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const client = getSanityClient()
      if (!client) {
        console.error('Sanity client not available')
        setProjects([])
        return
      }

      const query = `
        *[_type == "project"] | order(_createdAt desc) {
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
          featured,
          budget,
          _createdAt,
          "gallery": gallery[].asset->url,
          services,
          "architect": architect->name
        }
      `
      const data = await client.fetch(query)
      setProjects(data)
      updateCategoryCounts(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }

  const updateCategoryCounts = (projects: Project[]) => {
    const updatedCategories = CATEGORIES.map(category => {
      if (category.id === 'all') {
        return { ...category, count: projects.length }
      }
      
      const count = projects.filter(p => {
        if (!p.category) return false
        if (Array.isArray(p.category)) {
          return p.category.includes(category.id)
        }
        return p.category === category.id
      }).length
      
      return { ...category, count }
    })
    
    setCategories(updatedCategories)
  }

  const filterAndSortProjects = () => {
    let filtered = [...projects]

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => {
        if (!project.category) return false
        if (Array.isArray(project.category)) {
          return project.category.includes(selectedCategory)
        }
        return project.category === selectedCategory
      })
    }

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(project =>
        project.title?.toLowerCase().includes(term) ||
        (project.description && project.description.toLowerCase().includes(term)) ||
        (project.location && project.location.toLowerCase().includes(term)) ||
        (project.client && project.client.toLowerCase().includes(term)) ||
        (Array.isArray(project.services) && project.services.some((s: string) => 
          s.toLowerCase().includes(term)
        ))
      )
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          const dateA = a._createdAt || a.year || '0'
          const dateB = b._createdAt || b.year || '0'
          return new Date(dateB).getTime() - new Date(dateA).getTime()
        case 'oldest':
          const dateAOld = a._createdAt || a.year || '0'
          const dateBOld = b._createdAt || b.year || '0'
          return new Date(dateAOld).getTime() - new Date(dateBOld).getTime()
        case 'a-z':
          return (a.title || '').localeCompare(b.title || '')
        case 'z-a':
          return (b.title || '').localeCompare(a.title || '')
        default:
          return 0
      }
    })

    setFilteredProjects(filtered)
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setSearchTerm('')
    setSortBy('newest')
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category?.bgColor || 'bg-gradient-to-r from-blue-600 to-cyan-500'
  }

  return (
    <div className="pt-20 bg-gradient-to-b from-white via-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
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
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8"
            >
              <Building className="w-4 h-4" />
              <span className="text-sm font-semibold">OUR PORTFOLIO</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="block">Featured</span>
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore our collection of premium projects across Dubai and the UAE.
              Each project reflects our commitment to quality, innovation, and client satisfaction.
            </p>

          </motion.div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Categories */}
            <div className="flex-1 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                      selectedCategory === category.id
                        ? `text-white shadow-lg ${getCategoryColor(category.id)}`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    disabled={isLoading || category.count === 0}
                  >
                    {category.name}
                    <span className={`ml-2 text-xs ${
                      selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      ({category.count})
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full md:w-64 pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  disabled={isLoading}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </motion.div>

              {/* View Toggle */}
              <motion.div 
                className="flex border border-gray-300 rounded-xl overflow-hidden bg-white"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 ${viewMode === 'grid' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'hover:bg-gray-50'}`}
                  disabled={isLoading}
                >
                  <Grid className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 ${viewMode === 'list' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'hover:bg-gray-50'}`}
                  disabled={isLoading}
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Filter Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden md:inline">Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: 'newest', label: 'Newest First' },
                          { id: 'oldest', label: 'Oldest First' },
                          { id: 'a-z', label: 'A → Z' },
                          { id: 'z-a', label: 'Z → A' }
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setSortBy(option.id as any)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              sortBy === option.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {(selectedCategory !== 'all' || searchTerm || sortBy !== 'newest') && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={clearFilters}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Clear Filters
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mb-6"
              >
                <Loader2 className="w-full h-full text-blue-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Projects</h3>
              <p className="text-gray-500">Fetching our portfolio from the database...</p>
            </motion.div>
          ) : filteredProjects.length > 0 ? (
            <>
              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">
                      Showing <span className="font-semibold text-gray-900">{filteredProjects.length}</span> of{' '}
                      <span className="font-semibold text-gray-900">{projects.length}</span> projects
                    </p>
                    {(selectedCategory !== 'all' || searchTerm) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedCategory !== 'all' && `Filtered by: ${categories.find(c => c.id === selectedCategory)?.name}`}
                        {searchTerm && ` • Searching: "${searchTerm}"`}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Projects Grid/List */}
              <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  >
                    {filteredProjects.map((project, index) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        viewMode="grid"
                        index={index}
                        onClick={() => setSelectedProject(project)}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {filteredProjects.map((project, index) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        viewMode="list"
                        index={index}
                        onClick={() => setSelectedProject(project)}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <Eye className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {projects.length === 0 ? 'No Projects Yet' : 'No Projects Found'}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                {projects.length === 0
                  ? 'Add your first project in Sanity Studio to get started.'
                  : `No projects match your search criteria. Try a different category or search term.`
                }
              </p>
              {(selectedCategory !== 'all' || searchTerm) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Clear Filters
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ProjectCard Component
interface ProjectCardProps {
  project: Project
  viewMode: 'grid' | 'list'
  index: number
  onClick: () => void
}

function ProjectCard({ project, viewMode, index, onClick }: ProjectCardProps) {
  const categoryDisplay = Array.isArray(project.category)
    ? project.category[0]
    : project.category

  const getCategoryColor = () => {
    if (!categoryDisplay) return 'from-blue-600 to-cyan-500'
    
    const colorMap: Record<string, string> = {
      commercial: 'from-purple-600 to-pink-500',
      residential: 'from-emerald-600 to-teal-500',
      healthcare: 'from-amber-600 to-orange-500',
      retail: 'from-red-600 to-rose-500',
      hospitality: 'from-indigo-600 to-violet-500',
      educational: 'from-blue-600 to-cyan-500'
    }
    
    return colorMap[categoryDisplay.toLowerCase()] || 'from-blue-600 to-purple-500'
  }

  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200"
        onClick={onClick}
      >
        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`px-3 py-1.5 bg-gradient-to-r ${getCategoryColor()} text-white text-xs font-semibold rounded-full shadow-lg`}>
            {categoryDisplay || 'Project'}
          </span>
        </div>

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          {project.image ? (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Building className="w-16 h-16 text-gray-400" />
            </div>
          )}
          
          {/* View Button */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 text-sm">
              <Eye className="w-4 h-4" />
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
            {project.title || 'Untitled Project'}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
            {project.description || 'No description available.'}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate">{project.location || 'Dubai, UAE'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{project.year || '2023'}</span>
            </div>
            {project.area && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate">{project.area}</span>
              </div>
            )}
            {project.duration && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate">{project.duration}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // List View
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 5 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 overflow-hidden"
      onClick={onClick}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        <div className="lg:w-2/5 relative h-64 lg:h-auto">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Building className="w-24 h-24 text-gray-400" />
            </div>
          )}
          <div className={`absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r ${getCategoryColor()} text-white text-xs font-semibold rounded-full shadow-lg`}>
            {categoryDisplay || 'Project'}
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-3/5 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {project.title || 'Untitled Project'}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {project.description || 'No description available.'}
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:rotate-180 transition-transform duration-500"
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 pt-6 border-t border-gray-200">
            {project.area && (
              <div className="space-y-1">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Area</div>
                <div className="font-semibold text-gray-900">{project.area}</div>
              </div>
            )}
            {project.duration && (
              <div className="space-y-1">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Duration</div>
                <div className="font-semibold text-gray-900">{project.duration}</div>
              </div>
            )}
            <div className="space-y-1">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Client</div>
              <div className="font-semibold text-gray-900">{project.client || 'Confidential'}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Year</div>
              <div className="font-semibold text-gray-900">{project.year || '2023'}</div>
            </div>
          </div>

          {/* Location */}
          {project.location && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">{project.location}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}