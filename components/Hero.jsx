// components/Hero.jsx

import styles from "./Hero.module.css";
// NOTE: Removed 'useState' and 'useEffect' as data is fetched on the server
// NOTE: Removed 'motion' if you were using framer-motion (re-add if needed for client effects)

// 1. Correct Import Name and Path (Assuming you fixed the alias)
import { getHomepageSettings } from "@/sanity/queries"; 
// You may need to adjust the path alias here if it's not configured globally: 
// import { getHomepageSettings } from "../sanity/queries"; 


export default async function Hero() {
  
  // 2. Fetch data directly on the server
  const data = await getHomepageSettings();

  // Guard clause: If data fetch failed or is empty, don't render the section
  if (!data || !data.heroTitle) {
    return null;
  }
  
  // Clean up WhatsApp number (remove spaces, symbols)
  const whatsAppNumber = data.whatsappNumber ? data.whatsappNumber.replace(/\s+/g, '') : '';
  
  // 3. Render the dynamic content
  return (
    <section className={styles.hero}>
      {/* Dynamic Title */}
      <h1 className={styles.title}>
        {data.heroTitle}
      </h1>
      
      {/* Dynamic Subtitle */}
      <p className={styles.subtitle}>
        {data.heroSubtitle}
      </p>
      
      {/* Dynamic Button */}
      <a
        className={styles.button}
        href={`https://wa.me/${whatsAppNumber}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Chat on WhatsApp
        {/* NOTE: If your 'homepageSettings' schema includes a buttonText field, use it: */}
        {/* {data.heroButtonText} */}
      </a>
    </section>
  );
}