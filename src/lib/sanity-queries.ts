import { getSanityClient } from '../../lib/sanity'

// lib/sanity-queries.ts
export const projectsQuery = `
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
    budget
  }
`

export const projectBySlugQuery = (slug: string) => `
  *[_type == "project" && slug.current == "${slug}"][0] {
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
    services,
    designStyle,
    budget,
    "gallery": gallery[].asset->url,
    featured,
    completionDate,
    squareFeet,
    fullDescription
  }
`;

export const searchProjectsQuery = (searchTerm: string) => `
  *[_type == "project" && 
    (title match "${searchTerm}*" || 
     description match "${searchTerm}*" ||
     location match "${searchTerm}*" ||
     client match "${searchTerm}*")] | order(completionDate desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    "image": mainImage.asset->url,
    description,
    location,
    client,
    year,
    featured
  }
`;

export const getCategoriesCount = async () => {
  const client = getSanityClient();
  if (!client) {
    console.warn('Sanity client not available');
    return {
      all: 0,
      commercial: 0,
      residential: 0,
      healthcare: 0,
      retail: 0,
      education: 0
    };
  }

  const query = `
    {
      "all": count(*[_type == "project"]),
      "commercial": count(*[_type == "project" && "commercial" in category]),
      "residential": count(*[_type == "project" && "residential" in category]),
      "healthcare": count(*[_type == "project" && category == "healthcare"]),
      "retail": count(*[_type == "project" && category == "retail"]),
      "education": count(*[_type == "project" && category == "education"])
    }
  `;
  
  return await client.fetch(query);
};

// Helper function to fetch projects
export const fetchProjects = async () => {
  const client = getSanityClient();
  if (!client) {
    console.warn('Sanity client not available');
    return [];
  }
  
  return await client.fetch(projectsQuery);
};

// Helper function to fetch project by slug
export const fetchProjectBySlug = async (slug: string) => {
  const client = getSanityClient();
  if (!client) {
    console.warn('Sanity client not available');
    return null;
  }
  
  return await client.fetch(projectBySlugQuery(slug));
};

// Helper function to search projects
export const searchProjects = async (searchTerm: string) => {
  const client = getSanityClient();
  if (!client) {
    console.warn('Sanity client not available');
    return [];
  }
  
  return await client.fetch(searchProjectsQuery(searchTerm));
};