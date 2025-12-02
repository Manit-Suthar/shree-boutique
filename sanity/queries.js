// sanity/queries.js

import { groq } from "next-sanity";
// 🎯 FIX 1: Correctly import client from its neighbor file in the root
import { client } from "../sanityClient.js"; 

// ---------------------------------
// GROQ Queries
// ---------------------------------

// Query for Gallery Data: Fetches the required raw 'image' object
export const galleryQuery = groq`
  *[_type == "productGallery" && defined(image)] | order(_createdAt desc) {
    _id,
    title,
    category,
    image, // ✅ FIX 2: Fetch the entire raw image object
  }
`;

// Query for Homepage Settings (using the schema type 'homepageSettings')
export const homepageSettingsQuery = groq`
  *[_type == "homepageSettings"][0] {
    heroTitle,
    heroSubtitle,
    // Add the specific field name from your schema:
    // 🎯 FIX 3: Change 'whatsappNumber' to 'heroButtonText' or add the actual field name from homepageSettings.js
    heroButtonText, 
  }
`;

// Query for Client Reviews (using the schema type 'reviews')
export const reviewsQuery = groq`
  *[_type == "reviews" && defined(review)] | order(rating desc) {
    _id,
    name, // Client Name
    location,
    review, // Review Text
    rating,
  }
`;

// ---------------------------------
// Fetch Functions
// ---------------------------------

export async function getProductGallery() {
  return client.fetch(galleryQuery);
}

export async function getHomepageSettings() {
  return client.fetch(homepageSettingsQuery);
}

export async function getReviews() {
  return client.fetch(reviewsQuery);
}