// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { getSanityClient } from './client'

// Create a wrapper that provides a client or throws in development
const getLiveClient = () => {
  const client = getSanityClient();
  if (!client) {
    // During build, we can't use live features anyway
    // Return a mock client that won't crash
    return {
      fetch: () => Promise.resolve(null),
      withConfig: () => ({
        fetch: () => Promise.resolve(null)
      }),
      config: () => ({})
    } as any; // Type assertion for build safety
  }
  return client;
};

export const { sanityFetch, SanityLive } = defineLive({
  client: getLiveClient(),
});