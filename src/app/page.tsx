'use client'

import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import ProjectGallery from './components/ProjectGallery'
import ContactForm from './components/ContactForm'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Process from './components/Process'

// Create a simple client for fetching
import { createClient } from 'next-sanity'

// Initialize Sanity client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'y3t0y4ex',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-10-10',
  useCdn: true,
})

// Define types
interface SanityProject {
  _id: string
  title: string
  location: string
  image?: string
  category?: string[]
  description?: string
  client?: string
  year?: string
}

interface SanityService {
  _id: string
  title: string
  description?: string
  icon?: string
}

interface SanityTestimonial {
  _id: string
  clientName: string
  clientTitle?: string
  testimonial: string
  rating?: number
  location?: string
}

export default function Home() {
  const [homeData, setHomeData] = useState({
    stats: {
      years: 13,
      projects: 0,
      team: 50,
      satisfaction: 100
    },
    featuredProjects: [] as SanityProject[],
    services: [] as SanityService[],
    testimonials: [] as SanityTestimonial[],
    isLoading: true
  })

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      // Fetch total project count
      const projectCount = await sanityClient.fetch(`count(*[_type == "project"])`)
      
      // Fetch featured projects (only 2 for the gallery)
      const featuredProjects = await sanityClient.fetch(`
        *[_type == "project"] | order(_createdAt desc)[0...2] {
          _id,
          title,
          location,
          "image": mainImage.asset->url,
          category,
          description,
          client,
          year
        }
      `)
      
      // Fetch services
      const services = await sanityClient.fetch(`
        *[_type == "service"] | order(_createdAt asc)[0...6] {
          _id,
          title,
          description,
          icon
        }
      `)
      
      // Fetch testimonials
      const testimonials = await sanityClient.fetch(`
        *[_type == "testimonial"] | order(_createdAt desc)[0...3] {
          _id,
          clientName,
          clientTitle,
          testimonial,
          rating,
          location
        }
      `)

      setHomeData({
        stats: {
          years: 13,
          projects: projectCount || 0,
          team: 50,
          satisfaction: 100
        },
        featuredProjects: featuredProjects || [],
        services: services || [],
        testimonials: testimonials || [],
        isLoading: false
      })
    } catch (error) {
      console.error('Error fetching home data:', error)
      // If error, use empty data (will show default content in components)
      setHomeData(prev => ({ ...prev, isLoading: false }))
    }
  }

  return (
    <>
      {/* Hero with dynamic stats */}
      <Hero stats={homeData.stats} />
      
      {/* Services with Sanity data */}
      <Services 
        services={homeData.services} 
        isLoading={homeData.isLoading} 
      />
      
      {/* Process section (static) */}
      <Process />
      
      {/* Project Gallery with Sanity projects */}
      <ProjectGallery 
        projects={homeData.featuredProjects} 
        isLoading={homeData.isLoading}
      />
      
      {/* Testimonials with Sanity data */}
      <Testimonials 
        testimonials={homeData.testimonials}
        isLoading={homeData.isLoading}
      />
      
      {/* Contact Form (static) */}
      <ContactForm />
      
      {/* CTA (static) */}
      <CTA />
    </>
  )
}