"use client";

import { useState, useEffect } from "react";
import styles from "./gallery.module.css";

// Sanity Tools
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { getGalleryData } from "@/sanity/lib/queries";


// Create builder for image URLs
const builder = createImageUrlBuilder(client);
const urlFor = (src) => builder.image(src).url();

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
        const data = await getGalleryData();

        const formatted = data.map((item) => ({
          src: item.imageUrl ? urlFor(item.imageUrl) : urlFor(item.image),
          category: convertSanityCategory(item.category),
        }));

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
      {loading && <p className={styles.loading}>Loading…</p>}

      {/* IMAGE GRID */}
      {!loading && (
        <div className={styles.grid}>
          {filteredImages.map((img, i) => (
            <div key={i} className={styles.imageWrapper}>
              <img
                src={img.src}
                className={styles.image}
                alt=""
                onClick={() => setModalImg(img.src)}
              />
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modalImg && (
        <div className={styles.modal} onClick={() => setModalImg(null)}>
          <img src={modalImg} alt="" className={styles.modalImg} />
        </div>
      )}
    </section>
  );
}
