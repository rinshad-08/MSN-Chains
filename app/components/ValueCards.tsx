"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Coins, Hammer, Leaf, PenTool, Ruler, Scale, ShieldCheck, type LucideIcon } from "lucide-react";
import type { PointerEvent } from "react";

// Icons are passed by name so server-rendered pages can supply their own cards
const ICONS = {
  hammer: Hammer,
  shieldcheck: ShieldCheck,
  leaf: Leaf,
  pentool: PenTool,
  ruler: Ruler,
  scale: Scale,
  coins: Coins
} satisfies Record<string, LucideIcon>;

export type ValueItem = { icon: keyof typeof ICONS; title: string; text: string; href?: string };

const DEFAULT_ITEMS: ValueItem[] = [
  {
    icon: "hammer",
    title: "Master Craftsmanship",
    text: "Every link is shaped, soldered and hand-finished by artisans with decades at the bench."
  },
  {
    icon: "shieldcheck",
    title: "Certified Purity",
    text: "BIS hallmarked gold and independently certified diamonds, with full transparency on every piece."
  },
  {
    icon: "leaf",
    title: "Responsible Sourcing",
    text: "Conflict-free diamonds and responsibly sourced metals, because true luxury leaves no trace of harm."
  },
  {
    icon: "pentool",
    title: "Bespoke Design",
    text: "From a family heirloom reimagined to a chain made to your measure, we design around your story."
  }
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const TILT_SPRING = { stiffness: 110, damping: 20, mass: 0.9 };
const SPOT_SPRING = { stiffness: 160, damping: 26, mass: 0.6 };

function ValueCard({ icon, title, text, href, index }: ValueItem & { index: number }) {
  const Icon = ICONS[icon];
  const reduceMotion = useReducedMotion();
  // Pointer position within the card, 0..1 on each axis
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), TILT_SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-4, 4]), TILT_SPRING);
  const spotX = useTransform(useSpring(px, SPOT_SPRING), (v) => `${v * 100}%`);
  const spotY = useTransform(useSpring(py, SPOT_SPRING), (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${spotX} ${spotY}, rgba(223,183,108,0.18), transparent 75%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
      className="h-full [perspective:1000px]"
    >
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full rounded-3xl bg-[#efe5d9] p-px will-change-transform transition-shadow duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_28px_56px_-20px_rgba(42,31,24,0.55)]"
      >
        {/* Gold border, faded in on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#dfb76c] via-[#5b4230] to-[#dfb76c] opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
          aria-hidden="true"
        />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-white p-7 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[#2a1f18]">
          {/* Pointer-following spotlight */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
            style={{ background: spotlight }}
            aria-hidden="true"
          />
          {/* Fine diagonal texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_10px)] group-hover:opacity-100"
            aria-hidden="true"
          />

          <span
            className="absolute right-6 top-5 font-display text-5xl italic leading-none text-[#efe5d9] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:text-[#dfb76c]/25"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="relative mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f6e6cf] to-[#e8cfa9] text-[#5b4230] shadow-[0_8px_20px_-8px_rgba(197,160,89,0.6)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-110 group-hover:from-[#dfb76c] group-hover:to-[#c5a059] group-hover:text-[#2a1f18] group-hover:shadow-[0_10px_30px_-6px_rgba(223,183,108,0.7)]">
            <Icon size={21} aria-hidden="true" />
          </span>

          <h3 className="relative mb-3 text-xl font-semibold leading-snug tracking-tight text-brand-charcoal transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white">
            {title}
          </h3>
          <span
            className="relative mb-4 block h-px w-10 bg-gradient-to-r from-[#c5a059] to-transparent transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-20"
            aria-hidden="true"
          />
          <p className="relative text-sm leading-relaxed text-gray-500 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-[#e9dccb]/75">
            {text}
          </p>
          {href && (
            <Link
              href={href}
              className="relative mt-auto inline-flex w-fit cursor-pointer items-center gap-1.5 pt-6 text-sm font-semibold text-brand-orange transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#dfb76c] group-hover:text-[#dfb76c]"
            >
              Learn more
              <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          )}
        </div>
      </motion.div>
    </motion.li>
  );
}

export default function ValueCards({
  items = DEFAULT_ITEMS,
  className = "sm:grid-cols-2 lg:grid-cols-4"
}: {
  items?: ValueItem[];
  className?: string;
}) {
  return (
    <ul className={`grid list-none gap-5 ${className}`}>
      {items.map((item, i) => (
        <ValueCard key={item.title} {...item} index={i} />
      ))}
    </ul>
  );
}
