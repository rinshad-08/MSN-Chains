"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Slim progress bar pinned to the top of the viewport
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#dfb76c] via-brand-orange to-[#2a1f18]"
      aria-hidden="true"
    />
  );
}

// Sticky contents list that highlights the section currently being read
export default function ArticleToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="In this article">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">In this article</p>
      <ol className="relative list-none space-y-1 border-l border-[#efe5d9]">
        {items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="toc-indicator"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute -left-px top-0 h-full w-0.5 rounded-full bg-brand-orange"
                  aria-hidden="true"
                />
              )}
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`flex cursor-pointer gap-2.5 py-1.5 pl-4 text-sm leading-snug transition-colors duration-300 hover:text-brand-orange ${
                  isActive ? "font-semibold text-brand-charcoal" : "text-gray-500"
                }`}
              >
                <span className={`font-display italic ${isActive ? "text-brand-orange" : "text-[#c9b39a]"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
