// lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityClient } from "@sanity/client";

let _client: SanityClient | null = null;

/**
 * Build-safe Sanity client
 * Never crashes during static export
 */
export function getSanityClient(): SanityClient | null {
  if (_client) return _client;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    return null;
  }

  _client = createClient({
    projectId,
    dataset,
    apiVersion: "2023-10-10",
    useCdn: true,
  });

  return _client;
}

/**
 * Safe image URL helper
 */
export function urlFor(source: any) {
  const client = getSanityClient();
  if (!client) return null;

  return imageUrlBuilder(client).image(source);
}
