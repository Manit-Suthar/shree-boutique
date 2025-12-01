import "./globals.css";
import Navbar from "../components/Navbar";
import WhatsAppFloat from "../components/WhatsAppFloat";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/next"
export const metadata = {
  title: "Shree Boutique",
  description: "Premium Boutique & Tailoring Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <WhatsAppFloat />
        <main>{children}</main>
        <Analytics />
        <Footer></Footer>
      </body>
    </html>
  );
}
