import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
// If this is in a different file, update it like this:
export const urlFor = (source: SanityImageSource) => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  
  if (!projectId || !dataset) {
    // Return a mock builder during build
    return {
      url: () => '',
      width: () => ({ url: () => '' }),
      height: () => ({ url: () => '' }),
      size: () => ({ url: () => '' }),
      format: () => ({ url: () => '' }),
    } as any;
  }
  
  const builder = createImageUrlBuilder({ projectId, dataset });
  return builder.image(source);
}