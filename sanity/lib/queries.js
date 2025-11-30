import { client } from "./client";

export async function getGalleryData() {
  return await client.fetch(`
    *[_type == "productGallery"]{
      title,
      category,
      "imageUrl": image.asset->_id,
      image
    }
  `);
}
