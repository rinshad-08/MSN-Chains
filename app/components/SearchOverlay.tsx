"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, CornerDownLeft, FileText, Gem, Search, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { inr, products } from "../data/products";
import { posts } from "../data/posts";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Result = {
  id: string;
  type: "Products" | "Journal" | "Pages";
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  keywords: string;
};

const PAGES: Result[] = [
  { id: "p-home", type: "Pages", title: "Home", subtitle: "New arrivals, categories and featured collection", href: "/", keywords: "home shop categories new arrivals latest featured" },
  { id: "p-about", type: "Pages", title: "Our Heritage", subtitle: "Our story, values and craftsmanship", href: "/about", keywords: "about story heritage history values craftsmanship family" },
  { id: "p-service", type: "Pages", title: "Our Services", subtitle: "Custom design, restoration, diamond setting", href: "/service", keywords: "services custom design bespoke restoration polishing repair resize diamond setting valuation gold exchange" },
  { id: "p-custom", type: "Pages", title: "Custom Chain Design", subtitle: "Services · Made for you", href: "/service#services", keywords: "custom bespoke chain design engraving personalised" },
  { id: "p-restore", type: "Pages", title: "Restoration & Polishing", subtitle: "Services · Heirloom care", href: "/service#services", keywords: "restoration polishing cleaning repair heirloom" },
  { id: "p-blog", type: "Pages", title: "The Journal", subtitle: "Guides, care tips and stories", href: "/blog", keywords: "blog journal articles guides care tips" },
  { id: "p-contact", type: "Pages", title: "Contact Us", subtitle: "Enquiries, store visits and directions", href: "/contact", keywords: "contact enquiry appointment visit store boutique location map phone email hours" }
];

const INDEX: Result[] = [
  ...products.map((p) => ({
    id: `pr-${p.slug}`,
    type: "Products" as const,
    title: p.name,
    subtitle: `${p.category} · ${inr.format(p.price)}`,
    href: `/products/${p.slug}`,
    image: p.image,
    keywords: [p.category, p.offer, ...p.specs.map((s) => s.value)].join(" ")
  })),
  ...posts.map((p) => ({
    id: `po-${p.slug}`,
    type: "Journal" as const,
    title: p.title,
    subtitle: `${p.category} · ${p.readTime} min read`,
    href: `/blog/${p.slug}`,
    image: p.image,
    keywords: `${p.category} ${p.excerpt}`
  })),
  ...PAGES
];

const SUGGESTIONS = ["Diamond ring", "Gold chain", "Earrings", "Mangalsutra", "Custom design", "Care"];
const GROUP_ORDER: Result["type"][] = ["Products", "Journal", "Pages"];
const GROUP_ICON = { Products: Gem, Journal: BookOpen, Pages: FileText };

// Every word must match somewhere; title matches rank higher
function search(query: string): Result[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return INDEX.map((r) => {
    const title = r.title.toLowerCase();
    const hay = `${title} ${r.subtitle.toLowerCase()} ${r.keywords.toLowerCase()}`;
    let score = 0;
    for (const t of terms) {
      if (!hay.includes(t)) return null;
      score += title.startsWith(t) ? 6 : title.includes(t) ? 4 : 1;
    }
    return { r, score };
  })
    .filter((x): x is { r: Result; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((x) => x.r);
}

function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query.trim().split(/\s+/).filter(Boolean).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!terms.length) return <>{text}</>;
  const parts = text.split(new RegExp(`(${terms.join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-[#dfb76c]/30 px-0.5 text-inherit">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => search(query), [query]);
  const featured = useMemo(() => INDEX.filter((r) => r.type === "Products").slice(0, 4), []);
  const list = query.trim() ? results : featured;
  // Grouped for display, but keyboard order follows this flat list
  const ordered = useMemo(
    () => (query.trim() ? GROUP_ORDER.flatMap((g) => list.filter((r) => r.type === g)) : list),
    [list, query]
  );

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const close = () => {
    onClose();
    setQuery("");
    setActive(0);
  };

  const go = (href: string) => {
    router.push(href);
    close();
  };

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!ordered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % ordered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + ordered.length) % ordered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(ordered[Math.min(active, ordered.length - 1)].href);
    }
  };

  const renderItem = (r: Result) => {
    const index = ordered.indexOf(r);
    const isActive = index === active;
    const Icon = GROUP_ICON[r.type];
    return (
      <li key={r.id} id={`${listId}-${index}`} role="option" aria-selected={isActive}>
        <button
          type="button"
          onClick={() => go(r.href)}
          onMouseEnter={() => setActive(index)}
          className={`group flex w-full cursor-pointer items-center gap-3 rounded-2xl border-0 px-3 py-2.5 text-left transition-colors duration-200 ${
            isActive ? "bg-[#f6ecdf]" : "bg-transparent"
          }`}
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#f8f3ec] to-[#efe5d8] text-[#5b4230]">
            {r.image ? (
              <span
                className="absolute inset-0 bg-cover bg-center mix-blend-multiply"
                style={{ backgroundImage: `url(${r.image})` }}
                aria-hidden="true"
              />
            ) : (
              <Icon size={17} aria-hidden="true" />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-brand-charcoal">
              <Highlight text={r.title} query={query} />
            </span>
            <span className="block truncate text-xs text-gray-500">{r.subtitle}</span>
          </span>
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
              isActive ? "bg-[#2a1f18] text-white" : "text-gray-300"
            }`}
            aria-hidden="true"
          >
            {isActive ? <CornerDownLeft size={13} /> : <ArrowRight size={14} />}
          </span>
        </button>
      </li>
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          className="fixed inset-0 z-[60] flex items-start justify-center bg-[#2a1f18]/45 px-4 pt-24 backdrop-blur-sm sm:pt-28"
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_80px_-20px_rgba(42,31,24,0.5)]"
          >
            {/* Input */}
            <form role="search" onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3 border-b border-[#efe5d9] px-5 py-4">
              <Search size={20} className="shrink-0 text-brand-orange" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search rings, chains, guides…"
                aria-label="Search the site"
                role="combobox"
                aria-expanded={ordered.length > 0}
                aria-controls={listId}
                aria-activedescendant={ordered.length ? `${listId}-${active}` : undefined}
                autoComplete="off"
                className="w-full border-0 bg-transparent text-base text-brand-charcoal outline-none placeholder:text-gray-400 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="shrink-0 cursor-pointer rounded-full border-0 bg-[#f3ece3] px-2.5 py-1 text-[11px] font-semibold text-gray-500 hover:text-brand-charcoal"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-brand-charcoal transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
              >
                <X size={18} />
              </button>
            </form>

            {/* Body */}
            <div data-lenis-prevent className="max-h-[60vh] overflow-y-auto overscroll-contain p-3">
              {!query.trim() ? (
                <>
                  <p className="mb-2.5 flex items-center gap-1.5 px-3 pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                    <Sparkles size={12} aria-hidden="true" />
                    Popular searches
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2 px-3">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setQuery(s);
                          setActive(0);
                          inputRef.current?.focus();
                        }}
                        className="cursor-pointer rounded-full border border-[#e8dccd] bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-charcoal transition-colors duration-300 hover:border-[#2a1f18] hover:bg-[#2a1f18] hover:text-white"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">New arrivals</p>
                  <ul id={listId} role="listbox" className="list-none">
                    {ordered.map(renderItem)}
                  </ul>
                </>
              ) : ordered.length ? (
                <ul id={listId} role="listbox" className="list-none space-y-3">
                  {GROUP_ORDER.map((group) => {
                    const items = ordered.filter((r) => r.type === group);
                    if (!items.length) return null;
                    return (
                      <li key={group} role="presentation">
                        <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                          {group} <span className="text-gray-300">· {items.length}</span>
                        </p>
                        <ul role="group" aria-label={group} className="list-none">
                          {items.map(renderItem)}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="px-6 py-10 text-center">
                  <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6ecdf] text-[#5b4230]">
                    <Search size={20} aria-hidden="true" />
                  </span>
                  <p className="mb-1 text-sm font-semibold text-brand-charcoal">No results for &ldquo;{query}&rdquo;</p>
                  <p className="mb-5 text-xs text-gray-500">Try a different word, or ask our jewellers directly.</p>
                  <button
                    type="button"
                    onClick={() => go(`/contact?enquiry=${encodeURIComponent(query)}`)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-[#2a1f18] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-orange"
                  >
                    Ask about &ldquo;{query}&rdquo;
                    <ArrowRight size={13} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="hidden items-center gap-4 border-t border-[#efe5d9] bg-[#fdf8f3] px-5 py-2.5 text-[11px] text-gray-400 sm:flex">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-md border border-[#e8dccd] bg-white px-1.5 py-0.5 font-sans text-[10px] text-gray-500">↑</kbd>
                <kbd className="rounded-md border border-[#e8dccd] bg-white px-1.5 py-0.5 font-sans text-[10px] text-gray-500">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-md border border-[#e8dccd] bg-white px-1.5 py-0.5 font-sans text-[10px] text-gray-500">Enter</kbd>
                to open
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-md border border-[#e8dccd] bg-white px-1.5 py-0.5 font-sans text-[10px] text-gray-500">Esc</kbd>
                to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
