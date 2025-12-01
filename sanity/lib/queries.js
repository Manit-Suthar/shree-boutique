import { client } from "./client";

export async function getGalleryData() {
  return await client.fetch(galleryQuery);
}

export async function getHomepageData() {
  return await client.fetch(homepageQuery);
}

export const galleryQuery = `
  *[_type == "productGallery"]{
    title,
    category,
    "imageUrl": image.asset->url
  }
`;

export const homepageQuery = `
  *[_type == "homepageSettings"][0]{
    heroTitle,
    heroSubtitle,
    heroButtonText,
    whatsappNumber
  }
`;
