"use client";

import { useState, useEffect } from "react";
import styles from "./gallery.module.css";

// --- Import Sanity Functions ---
import { client } from "@/lib/sanity.client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { getGalleryData } from "@/lib/sanity.queries"; // ⬅️ Assuming you exported this

// Create a builder for generating Sanity image URLs
const builder = createImageUrlBuilder(client);

// Helper function to convert Sanity image source to URL
function urlFor(src) {
  return builder.image(src).url();
}

const categories = [
  "All",
  "Blouse",
  "Chaniya Choli",
  "Kurti",
  "Western",
  "Kids Wear",
  "Alterations",
  "Dress",
  "Frock",
];

// Helper to map Sanity category → display category
function convertSanityCategory(category) {
  const map = {
    blouse: "Blouse",
    chaniyaCholi: "Chaniya Choli",
    kurtis: "Kurti",
    // Ensure all categories you added in Sanity are mapped here!
    // Example: If Sanity value is 'alterations' the display is 'Alterations'
    alterations: "Alterations",
    western: "Western",
    kids: "Kids Wear",
    // Add missing mappings here if needed
  };
  return map[category] || "Other";
}


export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalImg, setModalImg] = useState(null);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // 1️⃣ Fetch Gallery Items from Sanity
  // -----------------------------
  useEffect(() => {
    async function fetchGallery() {
      try {
        // ✅ Call the function from the queries file
        const data = await getGalleryData(); 

        const formatted = data.map(item => ({
          // Use item.imageUrl which we defined in the GROQ query
          src: item.imageUrl ? urlFor(item.imageUrl) : urlFor(item.image), 
          category: convertSanityCategory(item.category)
        }));

        setImages(formatted);
        setLoading(false);
      } catch (error) {
        console.error("SANITY FETCH ERROR:", error);
        setLoading(false);
      }
    }

    fetchGallery();
  }, []); // Run only once on mount


  // Correct filtering logic
  const filtered =
    filter === "All"
      ? images
      : images.filter((img) => img.category === filter);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Our Work Gallery</h2>

      {/* FILTER BUTTONS */}
      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${
              activeFilter === cat ? styles.activeBtn : ""
            }`}
            onClick={() => {
              setActiveFilter(cat);
              setFilter(cat);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LOADING STATE */}
      {loading && <p className={styles.loading}>Loading...</p>}

      {/* IMAGE GRID */}
      {!loading && (
        <div className={styles.grid}>
          {filtered.map((img, index) => (
            <div key={index} className={styles.imageWrapper}>
              <img
                src={img.src}
                alt="Gallery item"
                className={styles.image}
                onClick={() => setModalImg(img.src)}
              />
            </div>
          ))}
        </div>
      )}

      {/* FULLSCREEN MODAL */}
      {modalImg && (
        <div className={styles.modal} onClick={() => setModalImg(null)}>
          <img src={modalImg} alt="" className={styles.modalImg} />
        </div>
      )}
    </section>
  );
}