"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, type PanInfo, type Variants } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const slides = [
  { id: 1, image: "/images/carousal-images/h1.png" },
  { id: 2, image: "/images/carousal-images/h2.png" },
  { id: 3, image: "/images/carousal-images/h3.png" },
  { id: 4, image: "/images/carousal-images/h4.png" }
];

const AUTOPLAY_DELAY = 5000;
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const SWIPE_THRESHOLD = 80;

// `direction` is 1 (next), -1 (previous) or 0 (autoplay / dots: pure crossfade)
const slideVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, scale: 1.06, x: direction * 120 }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      opacity: { duration: 1.2, ease: EASE },
      x: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 6, ease: "easeOut" }
    }
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -200,
    transition: { duration: 1, ease: EASE }
  })
};

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const goTo = useCallback((i: number, dir = 0) => {
    setDirection(dir);
    setIndex((i + slides.length) % slides.length);
  }, []);

  const scrollPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const scrollNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  // Autoplay; restarts whenever the slide changes so manual navigation gets a full delay
  useEffect(() => {
    if (paused || dragging) return;
    const timer = setTimeout(() => goTo(index + 1), AUTOPLAY_DELAY);
    return () => clearTimeout(timer);
  }, [index, paused, dragging, goTo]);

  const onDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    setDragging(false);
    // Include flick velocity so a quick short swipe still counts
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -SWIPE_THRESHOLD) scrollNext();
    else if (swipe > SWIPE_THRESHOLD) scrollPrev();
  };

  return (
    <motion.div
      className="hero-carousel-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: EASE }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-[16/8] lg:aspect-[2076/757]"
        aria-roledescription="carousel"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={slides[index].id}
            src={slides[index].image}
            alt={`Slide ${slides[index].id}`}
            draggable={false}
            className="absolute inset-0 h-full w-full cursor-grab select-none object-cover object-[28%_center] active:cursor-grabbing lg:object-center"
            style={{ touchAction: "pan-y" }}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragStart={() => setDragging(true)}
            onDragEnd={onDragEnd}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button className="carousel-nav prev" onClick={scrollPrev} aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>
      <button className="carousel-nav next" onClick={scrollNext} aria-label="Next slide">
        <ChevronRight size={24} />
      </button>

      {/* Pagination: the active indicator fills up until the next autoplay advance */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-black/20 px-2 py-1 shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-md">
        {slides.map((slide, idx) => {
          const active = idx === index;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={active}
              className="group flex h-6 cursor-pointer items-center border-0 bg-transparent px-1"
            >
              <motion.span
                animate={{ width: active ? 36 : 6 }}
                transition={{ duration: 0.6, ease: EASE }}
                className={`relative block h-1.5 overflow-hidden rounded-full transition-colors duration-300 ${
                  active ? "bg-white/30" : "bg-white/50 group-hover:bg-white/90"
                }`}
              >
                {active && (
                  <motion.span
                    key={`${index}-${paused}`}
                    initial={{ width: paused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: paused ? 0 : AUTOPLAY_DELAY / 1000, ease: "linear" }}
                    className="absolute inset-y-0 left-0 rounded-full bg-white"
                  />
                )}
              </motion.span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
