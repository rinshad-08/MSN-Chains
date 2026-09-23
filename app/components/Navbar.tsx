"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, MessageCircle, Search, User } from "lucide-react";
import { useLenis } from "lenis/react";
import SearchOverlay from "./SearchOverlay";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/service", label: "Service" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];
const SPRING = { type: "spring", stiffness: 400, damping: 30 } as const;

const overlayVariants: Variants = {
  closed: {
    clipPath: "circle(0% at 100% 0)",
    transition: { duration: 0.7, ease: EASE_IN_OUT },
  },
  open: {
    clipPath: "circle(150% at 100% 0)",
    transition: { duration: 0.7, ease: EASE_IN_OUT },
  },
};

const mobileLinkVariants: Variants = {
  closed: { opacity: 0, y: -20 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.5, ease: EASE_OUT },
  }),
};

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 50));

  const lenis = useLenis();

  // Lock page scroll while the mobile menu or search overlay is open
  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [menuOpen, searchOpen, lenis]);

  // Close the mobile menu if the viewport grows past the lg breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // The pill is dropped while the dark mobile menu is open so the white controls read clearly
  const pill = scrolled && !menuOpen;

  const openSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          pill ? "px-4 pt-4" : "px-6 pt-6 lg:px-8"
        }`}
      >
        <div
          className={`relative mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            pill
              ? "max-w-5xl rounded-full bg-white/70 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl"
              : "max-w-7xl rounded-none bg-transparent px-0 py-2 shadow-none"
          }`}
        >
          {/* Logo */}
          <motion.div
            animate={{ scale: scrolled ? 0.9 : 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="origin-left"
          >
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              aria-label="MSN Chains home"
              className="flex cursor-pointer items-center font-display text-2xl font-bold tracking-tight hover:text-inherit"
            >
              <span className={`transition-colors duration-300 ${menuOpen ? "text-[#dfb76c] lg:text-brand-orange" : "text-brand-orange"}`}>MSN</span>
              <span
                className={`ml-1.5 transition-colors duration-300 ${
                  menuOpen ? "text-white lg:text-brand-charcoal" : "text-brand-charcoal"
                }`}
              >
                CHAINS
              </span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.6 }}
                className="ml-1 inline-block h-2 w-2 self-end rounded-full bg-brand-green mb-1.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {/* Desktop links */}
          <nav
            aria-label="Main"
            className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
          >
            <ul className="flex list-none items-center gap-1" onMouseLeave={() => setHovered(null)}>
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="relative">
                    <Link
                      href={link.href}
                      onMouseEnter={() => setHovered(link.href)}
                      onFocus={() => setHovered(link.href)}
                      onBlur={() => setHovered(null)}
                      aria-current={active ? "page" : undefined}
                      className={`relative isolate block cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:text-brand-orange ${
                        active ? "text-brand-orange" : "text-brand-charcoal"
                      }`}
                    >
                      {hovered === link.href && (
                        <motion.span
                          layoutId="nav-hover-pill"
                          transition={SPRING}
                          className="absolute inset-0 -z-10 rounded-full bg-brand-orange/10"
                        />
                      )}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <motion.button
              type="button"
              onClick={openSearch}
              aria-label="Open search"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={SPRING}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-brand-charcoal transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
            >
              <Search size={18} />
            </motion.button>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={SPRING}>
              <Link
                href="/contact"
                className="group flex cursor-pointer items-center gap-1.5 rounded-full bg-[#2a1f18] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange hover:text-white"
              >
                Enquire Now
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              aria-label="Enquire now"
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:text-brand-orange ${
                menuOpen ? "text-white" : "text-brand-charcoal"
              }`}
            >
              <MessageCircle size={20} />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent"
            >
              <span className="relative block h-3.5 w-6" aria-hidden="true">
                <motion.span
                  animate={menuOpen ? { top: "50%", y: "-50%", rotate: 45 } : { top: "0%", y: "0%", rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className={`absolute left-0 h-[1.5px] w-full rounded-full transition-colors duration-300 ${
                    menuOpen ? "bg-white" : "bg-brand-charcoal"
                  }`}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, x: 12 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full transition-colors duration-300 ${
                    menuOpen ? "bg-white" : "bg-brand-charcoal"
                  }`}
                />
                <motion.span
                  animate={menuOpen ? { top: "50%", y: "-50%", rotate: -45 } : { top: "100%", y: "-100%", rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className={`absolute left-0 h-[1.5px] w-full rounded-full transition-colors duration-300 ${
                    menuOpen ? "bg-white" : "bg-brand-charcoal"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay (outside the header so its transform/blur don't trap position: fixed) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-[#2a1f18] px-6 pb-8 pt-32 lg:hidden"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#c5a059]/25 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-orange/40 blur-[100px]" />

            <nav aria-label="Mobile" className="relative flex-1">
              <ul className="flex list-none flex-col gap-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.li key={link.href} custom={i} variants={mobileLinkVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`cursor-pointer font-display text-4xl font-bold tracking-tight transition-colors hover:text-[#dfb76c] sm:text-5xl ${
                        isActive(link.href) ? "text-[#dfb76c]" : "text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 + NAV_LINKS.length * 0.1, ease: EASE_OUT } }}
              exit={{ opacity: 0 }}
              className="relative grid grid-cols-2 gap-3 border-t border-white/10 pt-6"
            >
              <button
                type="button"
                onClick={openSearch}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-white/10 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <Search size={16} />
                Search
              </button>
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-[#dfb76c] py-3.5 text-sm font-semibold text-[#2a1f18] transition-colors hover:bg-[#e9c887]"
              >
                <User size={16} />
                Sign In
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
