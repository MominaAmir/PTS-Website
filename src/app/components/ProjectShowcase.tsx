import { useState } from 'react';
import { motion } from 'framer-motion';
import { urlFor } from '../../../lib/sanity';  // Changed from @lib/sanity
import { SanityProject } from '@/types/sanity';  // Changed from @types/sanity
import LuxuryImage from './LuxuryImage';


interface ProjectShowcaseProps {
  projects: SanityProject[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [filter, setFilter] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Filter projects
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => 
        project.category?.includes(filter) || 
        project.designStyle === filter
      );

  // Dubai location categories
  const locations = [
    'Palm Jumeirah', 'Downtown Dubai', 'Dubai Marina', 
    'Business Bay', 'Jumeirah', 'Al Barsha', 'All'
  ];

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Villa', value: 'villa' },
    { label: 'Luxury', value: 'luxury' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Filter Bar */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#1a365d]">
              Our Dubai Portfolio
            </h2>
            <p className="text-gray-600 mt-2">
              {projects.length} premium projects across UAE
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('grid')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  view === 'grid' 
                    ? 'bg-white text-[#1a365d] shadow' 
                    : 'text-gray-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  view === 'list' 
                    ? 'bg-white text-[#1a365d] shadow' 
                    : 'text-gray-600'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.value
                  ? 'bg-[#1a365d] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Location Filters */}
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => setFilter(location)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                filter === location
                  ? 'border-[#c9a96e] bg-[#c9a96e]/10 text-[#1a365d]'
                  : 'border-gray-300 text-gray-600 hover:border-[#c9a96e]'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid/List */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  {project.mainImage && (
                    <LuxuryImage
                      src={urlFor(project.mainImage).url()}
                      alt={project.title}
                      width={400}
                      height={256}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1a365d] text-xs font-bold rounded-full">
                      {project.category?.[0] || 'Project'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#1a365d] group-hover:text-[#c9a96e] transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-1 bg-[#c9a96e]/10 text-[#c9a96e] text-xs rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    📍 {project.location}
                  </p>
                  
                  {project.budget && (
                    <p className="text-[#c9a96e] font-semibold mb-4">
                      {project.budget}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {project.duration && (
                      <span>⏱️ {project.duration}</span>
                    )}
                    {project.squareFeet && (
                      <span>📏 {project.squareFeet.toLocaleString()} sq.ft</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <div key={project._id} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  {project.mainImage && (
                    <LuxuryImage
                      src={urlFor(project.mainImage).url()}
                      alt={project.title}
                      width={300}
                      height={200}
                      className="rounded-lg"
                    />
                  )}
                </div>
                <div className="md:w-3/4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-[#1a365d]">{project.title}</h3>
                      <p className="text-gray-600 mt-1">📍 {project.location}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#1a365d]/10 text-[#1a365d] text-sm rounded-full">
                      {project.category?.[0]}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mt-3 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-4 text-sm">
                    {project.budget && (
                      <span className="font-semibold text-[#c9a96e]">
                        💰 {project.budget}
                      </span>
                    )}
                    {project.duration && (
                      <span className="text-gray-600">
                        ⏱️ {project.duration}
                      </span>
                    )}
                    {project.designStyle && (
                      <span className="text-gray-600">
                        🎨 {project.designStyle}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No projects found
          </h3>
          <p className="text-gray-500">
            Try a different filter or check back soon for new projects
          </p>
        </div>
      )}
    </div>
  );
}