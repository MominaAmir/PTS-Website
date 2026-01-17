// sanity/lib/client.ts
import { createClient } from "@sanity/client";
import type { SanityClient } from "@sanity/client";

export function getSanityClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  // HARD GUARD — build MUST NOT crash
  if (!projectId || !dataset) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: true,
  });
}

// For backward compatibility - NOT RECOMMENDED for build safety
// export const client = getSanityClient();