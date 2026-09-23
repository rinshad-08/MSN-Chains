"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Heart, Sparkles, Tag } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { discountOf, inr, products } from "../data/products";

const BANNER_IMAGE = "/images/latest/new-arrivals.jpg";


const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const rowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

export default function LatestIntroductions() {
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  // Scroll progress bar under the product row
  const { scrollXProgress } = useScroll({ container: trackRef });
  const progress = useTransform(scrollXProgress, [0, 1], [0.18, 1]);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // Mouse drag-to-scroll (touch devices already scroll natively)
  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = { active: true, startX: e.clientX, startScroll: trackRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    if (!drag.current.active || !el) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(dx) > 5) {
      drag.current.moved = true;
      el.setPointerCapture(e.pointerId);
      el.style.scrollSnapType = "none";
    }
    if (drag.current.moved) el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = (e: PointerEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    if (!drag.current.active || !el) return;
    drag.current.active = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    el.style.scrollSnapType = "";
  };
  // Swallow the click that ends a drag so it doesn't open a product
  const onClickCapture = (e: MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const toggleWishlist = (slug: string) =>
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  return (
    <section className="relative overflow-hidden bg-[#fdf8f3] px-6 py-20 lg:px-8" aria-labelledby="latest-heading">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#f3e3cf]/70 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-brand-orange/10 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12">
        {/* New Arrivals banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <Link
            href="/service?collection=new-arrivals"
            className="group relative flex h-[30rem] cursor-pointer flex-col overflow-hidden rounded-[2rem] p-8 shadow-[0_20px_50px_-20px_rgba(91,66,48,0.45)] hover:text-inherit lg:h-full lg:min-h-[30rem]"
          >
            <div
              className="absolute inset-0 bg-[linear-gradient(170deg,#f6eadb_0%,#ecd6bb_45%,#d9b58f_100%)]"
              aria-hidden="true"
            />
            {/* Photo sits in the lower part of the card; its top edge fades into the gradient */}
            <div
              className="absolute inset-x-0 bottom-0 aspect-[870/757] bg-cover bg-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_22%)] group-hover:scale-105"
              style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
              aria-hidden="true"
            />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5b4230] backdrop-blur-md">
                  <Sparkles size={12} aria-hidden="true" />
                  Just Landed
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4a3526] text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-brand-orange">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </div>
              <h3 className="mb-2 font-display text-[2.6rem] font-semibold leading-none tracking-tight text-[#4a3526]">
                New <span className="font-normal italic">Arrivals</span>
              </h3>
              <p className="text-sm text-[#6d5340]">
                Up to <span className="font-bold text-[#4a3526]">30% off</span> &middot; festive sparkle to everyday essentials
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Products */}
        <div className="flex min-w-0 flex-col">
          <motion.div
            className="mb-8 flex flex-wrap items-end justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div>
              <span className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
                <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
                New In
              </span>
              <h2 id="latest-heading" className="mb-2 text-4xl font-medium tracking-tight text-brand-charcoal">
                Latest Introductions
              </h2>
              <p className="text-sm text-gray-500">Discover our newest diamond designs.</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/service?collection=new-arrivals"
                className="group mr-2 hidden cursor-pointer items-center gap-1.5 text-sm font-semibold text-brand-charcoal hover:text-brand-orange sm:flex"
              >
                View all
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              {([-1, 1] as const).map((dir) => {
                const enabled = dir === -1 ? canPrev : canNext;
                return (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => scrollByCards(dir)}
                    disabled={!enabled}
                    aria-label={dir === -1 ? "Previous products" : "Next products"}
                    className="hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#e8dccd] bg-white text-brand-charcoal transition-all duration-300 hover:border-[#2a1f18] hover:bg-[#2a1f18] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#e8dccd] disabled:hover:bg-white disabled:hover:text-brand-charcoal sm:flex"
                  >
                    {dir === -1 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.ul
            ref={trackRef}
            onScroll={updateArrows}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="-mx-3 -my-3 flex flex-1 cursor-grab list-none snap-x snap-mandatory gap-5 overflow-x-auto px-3 py-3 select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => {
              const liked = wishlist.has(product.slug);
              const discount = discountOf(product);
              return (
                <motion.li
                  key={product.slug}
                  variants={cardVariants}
                  className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-[31%] xl:w-[23.5%]"
                >
                  <div className="group relative h-full rounded-3xl border border-[#efe5d9] bg-white p-2.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_24px_48px_-16px_rgba(91,66,48,0.25)]">
                    <Link
                      href={`/products/${product.slug}`}
                      draggable={false}
                      className="block cursor-pointer hover:text-inherit"
                    >
                      <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#f7f3ef] to-[#efe8e0]">
                        <div
                          role="img"
                          aria-label={product.name}
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                          style={{ backgroundImage: `url(${product.image})` }}
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-brand-charcoal px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
                          -{discount}%
                        </span>
                        <span className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-1.5 rounded-full bg-white/85 py-2 text-xs font-semibold text-brand-charcoal opacity-0 shadow-sm backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                          View Details
                          <ArrowRight size={13} aria-hidden="true" />
                        </span>
                      </div>

                      <div className="px-2 pb-2">
                        <p className="mb-1.5 truncate text-sm font-medium text-brand-charcoal transition-colors group-hover:text-brand-orange">
                          {product.name}
                        </p>
                        <div className="mb-3 flex items-baseline gap-2">
                          <span className="text-lg font-bold tracking-tight text-brand-charcoal">{inr.format(product.price)}</span>
                          <span className="text-xs text-gray-400 line-through">{inr.format(product.mrp)}</span>
                        </div>
                        <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-brand-green/10 px-2.5 py-1 text-[11px] font-semibold text-brand-green">
                          <Tag size={11} className="shrink-0" aria-hidden="true" />
                          <span className="truncate">{product.offer}</span>
                        </span>
                      </div>
                    </Link>

                    <motion.button
                      type="button"
                      onClick={() => toggleWishlist(product.slug)}
                      whileTap={{ scale: 0.8 }}
                      aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                      aria-pressed={liked}
                      className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-white/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                    >
                      <motion.span
                        key={String(liked)}
                        initial={{ scale: liked ? 0.4 : 1 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="flex"
                      >
                        <Heart size={16} className={liked ? "fill-red-500 text-red-500" : "text-gray-500"} />
                      </motion.span>
                    </motion.button>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Scroll progress */}
          <div className="mt-8 h-[3px] w-full overflow-hidden rounded-full bg-[#eadfd2]" aria-hidden="true">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left rounded-full bg-brand-charcoal" />
          </div>
        </div>
      </div>
    </section>
  );
}
