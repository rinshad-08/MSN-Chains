"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { useState } from "react";
import type { Post } from "../data/posts";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BlogGrid({ posts, dates }: { posts: Post[]; dates: Record<string, string> }) {
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const visible = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
        {categories.map((cat) => {
          const selected = cat === active;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={selected}
              className={`relative cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                selected ? "border-transparent text-white" : "border-[#e8dccd] bg-white text-brand-charcoal hover:border-[#2a1f18]"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="blog-filter-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-[#2a1f18]"
                  aria-hidden="true"
                />
              )}
              <span className="relative flex items-center gap-2">
                {cat}
                <span
                  className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold transition-colors duration-300 ${
                    selected ? "bg-white/15 text-[#dfb76c]" : "bg-[#f3ece3] text-gray-500"
                  }`}
                >
                  {cat === "All" ? posts.length : posts.filter((p) => p.category === cat).length}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="grid list-none gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:[&>li:nth-child(3n+2)]:mt-14">
        <AnimatePresence mode="popLayout">
          {visible.map((post, i) => (
            <motion.li
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Link href={`/blog/${post.slug}`} className="group flex h-full cursor-pointer flex-col hover:text-inherit">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#f8f3ec] to-[#efe2d1] shadow-[0_20px_40px_-28px_rgba(91,66,48,0.5)] transition-shadow duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_28px_56px_-24px_rgba(91,66,48,0.55)]">
                  <div
                    aria-hidden="true"
                    className={`absolute bg-center bg-no-repeat transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${
                      post.imageFit === "contain" ? "inset-6 bg-contain mix-blend-multiply" : "inset-0 bg-cover"
                    }`}
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  {/* Soft shade + read button revealed on hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#2a1f18]/50 via-[#2a1f18]/0 to-transparent opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-white text-[#2a1f18] opacity-0 shadow-lg transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:rotate-45 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-1">
                  <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                    <span className="font-display text-sm normal-case italic tracking-normal text-[#c9b39a]">
                      No. {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-[#e3d3bf]" aria-hidden="true" />
                    {post.category}
                  </p>
                  <p className="mb-2.5 flex items-center gap-2 text-xs font-medium text-gray-400">
                    <time dateTime={post.date}>{dates[post.slug]}</time>
                    <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden="true" />
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} aria-hidden="true" />
                      {post.readTime} min read
                    </span>
                  </p>
                  <h3 className="mb-2 text-xl font-semibold leading-snug tracking-tight text-brand-charcoal">
                    {/* Underline draws in on hover */}
                    <span className="bg-gradient-to-r from-brand-orange to-brand-orange bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px] group-hover:text-brand-orange">
                      {post.title}
                    </span>
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500">{post.excerpt}</p>
                  <div className="relative mt-auto flex items-center justify-between pt-4">
                    {/* Rule fills with brand colour on hover */}
                    <span className="absolute inset-x-0 top-0 h-px bg-[#efe5d9]" aria-hidden="true" />
                    <span
                      className="absolute left-0 top-0 h-px w-0 bg-brand-orange transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                      aria-hidden="true"
                    />
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2a1f18] font-display text-xs font-semibold text-[#dfb76c]">
                        M
                      </span>
                      <span className="text-xs font-semibold text-brand-charcoal">MSN Workshop</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-charcoal transition-colors duration-500 group-hover:text-brand-orange">
                      Read
                      <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
