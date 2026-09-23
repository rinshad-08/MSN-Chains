import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MSN CHAINS | Premium Jewelry",
  description: "Showcasing the finest collection of luxury jewelry chains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <SmoothScroll>
          <Navbar />
          <main style={{ flexGrow: 1, marginTop: '100px' }}>
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
