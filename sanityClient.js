// sanityClient.js

import { createClient } from "next-sanity";
import { createImageUrlBuilder } from '@sanity/image-url';

// 1. Client Configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-11-15",
  useCdn: process.env.NODE_ENV === 'production',
});

// 2. Image URL Builder (Needed by components)
const builder = createImageUrlBuilder(client);

// Helper function: Returns the image builder object (MUST call .url() in component)
export function urlFor(source) {
  return builder.image(source);
}