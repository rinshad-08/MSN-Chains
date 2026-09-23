"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

const EASE_OUT_EXPO = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

// Next.js restores scroll natively on navigation; jump Lenis to the top so it doesn't animate from the old position
function ResetOnNavigate() {
  const lenis = useLenis();
  const pathname = usePathname();
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);
  return null;
}

// Site-wide smooth, interpolated scrolling (Lenis). Reduced-motion users keep native scrolling.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        easing: EASE_OUT_EXPO,
        smoothWheel: !reduceMotion,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        // In-page links (e.g. the article contents list) glide to their target below the fixed navbar
        anchors: { offset: -110 }
      }}
    >
      <ResetOnNavigate />
      {children}
    </ReactLenis>
  );
}
