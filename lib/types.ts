// lib/types.ts
export interface Project {
  _id: string;
  title?: string;
  slug?: string;
  category?: string | string[];
  image?: string;
  description?: string;
  area?: string;
  duration?: string;
  client?: string; // Add this line
  year?: string;
  location?: string;
  status?: string;
  featured?: boolean;
  budget?: string;
  _createdAt?: string;
  gallery?: string[];
  services?: string[];
  architect?: string;
}