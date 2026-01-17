import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-10-10', // Use current date
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Query functions
export const queries = {
  // Get all projects
  allProjects: `*[_type == "project"] | order(completionDate desc) {
    _id,
    title,
    slug,
    location,
    client,
    budget,
    duration,
    category,
    services,
    description,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    featured,
    completionDate,
    squareFeet,
    designStyle,
    testimonial
  }`,

  // Get featured projects
  featuredProjects: `*[_type == "project" && featured == true] | order(completionDate desc)[0...6] {
    _id,
    title,
    slug,
    location,
    "mainImage": mainImage.asset->url,
    category,
    budget,
    duration
  }`,

  // Get single project by slug
  projectBySlug: (slug: string) => `*[_type == "project" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    location,
    client,
    budget,
    duration,
    category,
    services,
    description,
    fullDescription,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    beforeAfter,
    testimonial,
    completionDate,
    squareFeet,
    designStyle,
    tags
  }`,

  // Get all services
  allServices: `*[_type == "service"] | order(_createdAt asc) {
    _id,
    title,
    slug,
    description,
    icon,
    startingPrice,
    duration,
    includes,
    process,
    featured
  }`,
};