"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Counts from 0 to `to` the first time it scrolls into view
export default function CountUp({
  to,
  suffix = "",
  duration = 2,
  delay = 0
}: {
  to: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: reduceMotion ? 0 : duration,
      delay: reduceMotion ? 0 : delay,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, to, duration, delay, reduceMotion]);

  return (
    <span ref={ref} className="inline-flex flex-col items-center">
      <span className="tabular-nums" aria-hidden="true">
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
      {/* Screen readers get the final figure straight away */}
      <span className="sr-only">
        {to.toLocaleString("en-US")}
        {suffix}
      </span>
      <motion.span
        className="mt-2 block h-px w-8 origin-center bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : undefined}
        transition={{ duration: 1, delay: delay + 0.4, ease: EASE }}
        aria-hidden="true"
      />
    </span>
  );
}
