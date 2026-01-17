import { client } from './sanity';

export const projectsQuery = `
  *[_type == "project"] | order(completionDate desc) {
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
    squareFeet
  }
`;

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