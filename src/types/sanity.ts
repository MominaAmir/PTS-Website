// lib/types.ts
export interface SanityProject {
  mainImage: any
  _id: string
  title: string
  category: string
  image: string
  description: string
  area?: string
  duration?: string
  client?: string
  year?: string
  location?: string
  status?: string
  slug?: { current: string }
  isDemo?: boolean
  source?: 'demo' | 'sanity'
  // Add other fields you might have
  services?: string[]
  designStyle?: string
  budget?: string
  gallery?: string[]
  featured?: boolean
  completionDate?: string
  squareFeet?: number
}