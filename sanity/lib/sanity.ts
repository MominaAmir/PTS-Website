// lib/sanity.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityClient } from '@sanity/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

let _client: SanityClient | null = null;
let _builder: ReturnType<typeof imageUrlBuilder> | null = null;

/**
 * Build-safe Sanity client
 * Never crashes during static export
 */
export function getSanityClient(): SanityClient | null {
  if (_client) return _client;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  // During build, if env vars are missing, return null
  if (!projectId || !dataset) {
    console.warn('Sanity environment variables are missing');
    return null;
  }

  _client = createClient({
    projectId,
    dataset,
    apiVersion: '2023-10-10',
    useCdn: process.env.NODE_ENV === 'production',
  });

  return _client;
}

/**
 * Get image URL builder
 */
function getBuilder() {
  if (_builder) return _builder;
  
  const client = getSanityClient();
  if (!client) return null;
  
  _builder = imageUrlBuilder(client);
  return _builder;
}

/**
 * Safe image URL helper
 */
export function urlFor(source: SanityImageSource) {
  const builder = getBuilder();
  if (!builder) return null;
  
  return builder.image(source);
}

// GROQ Query functions (unchanged, but they'll use getSanityClient())
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