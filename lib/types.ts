// lib/types.ts
export interface Project {
  _id: string
  _createdAt?: string  // Add this line
  title: string
  slug?: string
  category?: string | string[]
  image?: string
  description?: string
  area?: string
  duration?: string
  client?: string
  year?: string
  location?: string
  status?: 'completed' | 'ongoing' | 'upcoming'
  featured?: boolean
  budget?: string
  gallery?: string[]
  services?: string[]
  architect?: string
}