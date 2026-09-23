"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// Photos live in public/images/featured/ (attribution in CREDITS.md there).
// `blend` multiplies white studio backdrops into the warm tile colour.
const chains = [
  { id: 1, title: "18k Gold Miami Cuban", detail: "18K Solid Gold", image: "/images/featured/miami-cuban.jpg", blend: true },
  { id: 2, title: "Diamond Tennis Chain", detail: "Natural Diamonds", image: "/images/featured/tennis-chain.jpg", blend: false },
  { id: 3, title: "Rope Chain (Solid Gold)", detail: "22K Solid Gold", image: "/images/featured/rope-chain.jpg", blend: true }
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } }
};

export default function FeaturedCollection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-8" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="mb-4 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
            <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
            Signature Chains
            <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
          </span>
          <h2 id="featured-heading" className="mb-4 text-4xl font-medium tracking-tight text-brand-charcoal sm:text-5xl">
            Featured <span className="italic text-brand-orange">Collection</span>
          </h2>
          <p className="text-base leading-relaxed text-gray-500">
            A curated selection of our finest chains, showcasing impeccable detail and premium materials.
          </p>
        </motion.div>

        <motion.ul
          className="mx-auto grid max-w-5xl list-none gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {chains.map((chain, i) => (
            <motion.li key={chain.id} variants={cardVariants} className={i === 2 ? "sm:col-span-2 sm:mx-auto sm:w-1/2 lg:col-span-1 lg:w-full" : ""}>
              <Link
                href={`/contact?enquiry=${encodeURIComponent(chain.title)}`}
                className="group block h-full cursor-pointer rounded-[1.75rem] border border-[#efe5d9] bg-white p-2.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-transparent hover:text-inherit hover:shadow-[0_24px_48px_-16px_rgba(91,66,48,0.25)]"
              >
                <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-[#f8f3ec] to-[#efe5d8]">
                  <div
                    role="img"
                    aria-label={chain.title}
                    className={`absolute bg-center bg-no-repeat transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
                      chain.blend ? "inset-6 bg-contain mix-blend-multiply" : "inset-0 bg-cover"
                    }`}
                    style={{ backgroundImage: `url(${chain.image})` }}
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 font-display text-xs italic text-[#4a3526] shadow-sm backdrop-blur-md">
                    No. {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-4">
                  <div className="min-w-0">
                    <h3 className="mb-1 truncate text-lg font-semibold tracking-normal text-brand-charcoal transition-colors group-hover:text-brand-orange">
                      {chain.title}
                    </h3>
                    <p className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      {chain.detail}
                      <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden="true" />
                      <span className="text-brand-orange">Custom Inquiry</span>
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e8dccd] text-brand-charcoal transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-charcoal group-hover:bg-brand-charcoal group-hover:text-white">
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Link
            href="/service"
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#2a1f18] py-2 pl-7 pr-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-orange hover:text-white"
          >
            View Custom Services
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1">
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
