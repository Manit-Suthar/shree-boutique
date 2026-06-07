"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./gallery.module.css";

// 🎯 FIX: Import only the client and urlFor helper from your client file
import { client, urlFor } from "../../sanityClient.js";
import { getProductGallery } from "../../sanity/queries.js"; 
// Note: Assumed the path is correct for queries.js (../queries.js)

// ❌ REMOVED: Redundant local builder setup that caused the TypeError
// import { createImageUrlBuilder } from "@sanity/image-url";
// const builder = createImageUrlBuilder(client);
// const urlFor = (src) => builder.image(src).url(); // <-- This line caused the conflict

// Front-end gallery categories
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

// Map Sanity values → UI filter names
const categoryMap = {
  blouse: "Blouse",
  chaniyaCholi: "Chaniya Choli",
  kurtis: "Kurti",
  western: "Western",
  kids: "Kids Wear",
  alterations: "Alterations",
  dress: "Dress",
  frock: "Frock",
};

const convertSanityCategory = (value) => categoryMap[value] || "Other";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filter, setFilter] = useState("All");
  const [modalImg, setModalImg] = useState(null);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------
  //  Fetch Gallery Data from Sanity on Load
  // ---------------------------------------
  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await getProductGallery();

        const formatted = data.map((item) => {
          // ✅ Use the raw Sanity image object (item.image)
          const imageSource = item.image; 

          if (!imageSource) {
            // Check for missing image source
            console.warn(`Skipping gallery item with title: ${item.title} (No image found)`);
            return null;
          }

          return {
            // ✅ FIX: Call the global 'urlFor' helper and then call .url() once
            src: urlFor(imageSource).url(),
            category: convertSanityCategory(item.category),
          };
        }).filter(Boolean); // Filter out any null entries

        setImages(formatted);
      } catch (error) {
        console.error("SANITY FETCH ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  // Filter Logic
  const filteredImages =
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
            className={`${styles.filterBtn} ${activeFilter === cat ? styles.activeBtn : ""
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
      {loading && <p className={styles.loading}>Loading…</p>}

      {/* IMAGE GRID */}
      {!loading && (
        <div className={styles.grid}>
          {filteredImages.map((img, i) => (
            <div key={i} className={styles.imageWrapper}>
              <Image
                src={img.src}
                className={styles.image}
                alt={img.category || "Gallery item"}
                width={500}
                height={500}
                style={{ objectFit: 'contain' }}
                onClick={() => setModalImg(img.src)}
              />
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modalImg && (
        <div className={styles.modal} onClick={() => setModalImg(null)}>
          <Image src={modalImg} alt="Full screen preview" className={styles.modalImg} width={1200} height={1200} style={{ objectFit: 'contain' }} unoptimized />
        </div>
      )}
    </section>
  );
}