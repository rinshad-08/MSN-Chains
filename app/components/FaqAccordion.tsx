"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="list-none space-y-2.5">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li
            key={faq.q}
            className={`rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isOpen
                ? "border-[#e3d3bf] bg-white shadow-[0_14px_36px_-22px_rgba(91,66,48,0.4)]"
                : "border-[#efe5d9] bg-[#fdf8f3] hover:border-[#e3d3bf] hover:bg-white"
            }`}
          >
            <h3 className="m-0 text-inherit">
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-5 py-3.5 text-left font-[family-name:var(--font-inter)] text-[15px] font-semibold tracking-normal text-brand-charcoal"
              >
                <span className="transition-colors duration-300 group-hover:text-brand-orange">{faq.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-400 ${
                    isOpen ? "border-[#2a1f18] bg-[#2a1f18] text-white" : "border-[#e8dccd] text-brand-charcoal"
                  }`}
                >
                  <Plus size={13} aria-hidden="true" />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1, transition: { height: { duration: 0.45, ease: EASE }, opacity: { duration: 0.35, delay: 0.1 } } }}
                  exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.35, ease: EASE }, opacity: { duration: 0.2 } } }}
                  className="overflow-hidden"
                >
                  <motion.p
                    initial={{ y: -6 }}
                    animate={{ y: 0 }}
                    exit={{ y: -6 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="px-5 pb-4 text-sm leading-relaxed text-gray-600"
                  >
                    {faq.a}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
