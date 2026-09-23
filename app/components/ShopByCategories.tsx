"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Each card falls back to its gradient if the photo fails to load
const categories = [
  { name: "Rings", image: "/images/2nd_120_x_150_Pix_Ring_1.jpg", fallback: "linear-gradient(135deg, #cfd8e3, #8a9bb0)", featured: true },
  { name: "Earrings", image: "/images/850_x_415_Pix_Earring.jpg", fallback: "linear-gradient(135deg, #efe2cf, #b99a74)", featured: true },
  { name: "Pendants", image: "/images/6th_120_x_150_Pix_Pendent.jpg", fallback: "linear-gradient(135deg, #f1d9bd, #c9a07a)" },
  { name: "Necklaces", image: "/images/4th_120_x_150_Pix_Necklace.jpg", fallback: "linear-gradient(135deg, #1e3f8a, #0b1d4d)" },
  { name: "Bracelets", image: "/images/5th_120_x_150_Pix_Bracelet.jpg", fallback: "linear-gradient(135deg, #f5eee6, #cbb9a6)" },
  { name: "Mangalsutra", image: "/images/3rd_120_x_150_Pix_Mangalsutra.jpg", fallback: "linear-gradient(135deg, #bfeede, #7cc9ad)" }
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
};

export default function ShopByCategories() {
  return (
    <section className="px-6 py-16 lg:px-8" aria-labelledby="categories-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 id="categories-heading" className="mb-1 text-3xl text-brand-charcoal">
            Shop By Categories
          </h2>
          <p className="text-sm text-gray-500">Find your perfect sparkle across every category</p>
        </motion.div>

        <motion.ul
          className="grid list-none grid-cols-2 gap-4 lg:grid-cols-4"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category) => (
            <motion.li
              key={category.name}
              variants={cardVariants}
              className={category.featured ? "col-span-2" : "col-span-1"}
            >
              <Link
                href={`/service?category=${category.name.toLowerCase()}`}
                className={`group relative block cursor-pointer overflow-hidden rounded-2xl ${
                  category.featured ? "h-64 sm:h-80 lg:h-[22rem]" : "h-64 sm:h-72 lg:h-80"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  style={{ backgroundImage: `url(${category.image}), ${category.fallback}` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent transition-opacity duration-500 group-hover:from-black/60"
                  aria-hidden="true"
                />

                <div className="absolute bottom-5 left-6 text-white">
                  <h3 className="mb-1 text-lg font-semibold tracking-normal text-white">
                    {category.name}
                  </h3>
                  <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90">
                    Explore
                    <ChevronRight
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
