"use client";

import { useEffect, useState } from "react";
import { getHomepageData } from "@/sanity/lib/queries";

export default function Hero() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getHomepageData();
      setData(res);
    }
    load();
  }, []);

  if (!data) return null;

  return (
    <section className="hero">
      <h1>{data.heroTitle}</h1>
      <p>{data.heroSubtitle}</p>
      <a
        href={`https://wa.me/${data.whatsappNumber}`}
        target="_blank"
      >
        {data.heroButtonText}
      </a>
    </section>
  );
}
