// uploadLocalImages.mjs
// Run with: node uploadLocalImages.mjs
import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace these with your actual Project ID and Dataset (from .env.local)
const projectId = 'YOUR_PROJECT_ID'; // e.g. "x1y2z3"
const dataset = 'production';
// You MUST create a token with Write access in sanity.io/manage
const token = 'YOUR_WRITE_TOKEN'; 

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-11-15',
  token,
  useCdn: false,
});

async function uploadImages() {
  const galleryDir = path.join(__dirname, 'public', 'gallery');
  
  if (!fs.existsSync(galleryDir)) {
    console.error(`Directory not found: ${galleryDir}`);
    return;
  }

  const files = fs.readdirSync(galleryDir);

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;
    
    const filePath = path.join(galleryDir, file);
    const category = file.replace(/[0-9.]/g, '').replace('jpg', '').toLowerCase(); // basic categorizer

    console.log(`Uploading ${file}...`);
    try {
      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: file
      });

      console.log(`Asset uploaded! Creating document...`);
      
      const doc = {
        _type: 'productGallery',
        title: file.split('.')[0],
        category: category,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
      };

      await client.create(doc);
      console.log(`Document created for ${file}`);
    } catch (err) {
      console.error(`Failed to process ${file}:`, err.message);
    }
  }
  
  console.log('All local images have been uploaded to Sanity!');
}

uploadImages();
