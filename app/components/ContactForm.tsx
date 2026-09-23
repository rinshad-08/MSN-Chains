"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Check, Gem, Mail, MessageCircle, PenTool, ShoppingBag, Wrench, type LucideIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";

// No mail backend yet: submitting opens the visitor's email app with the enquiry filled in.
const TO_EMAIL = "info@msnchains.com";

const TOPICS: { label: string; icon: LucideIcon }[] = [
  { label: "Product enquiry", icon: ShoppingBag },
  { label: "Custom design", icon: PenTool },
  { label: "Restoration & repairs", icon: Wrench },
  { label: "Diamond setting", icon: Gem },
  { label: "Book a store visit", icon: CalendarCheck },
  { label: "Something else", icon: MessageCircle }
];

const inputClass =
  "w-full rounded-xl border border-[#e8dccd] bg-[#fdf8f3] px-4 py-3 text-sm text-brand-charcoal outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-[#d9c7b0] focus:border-brand-orange focus:bg-white focus:shadow-[0_0_0_4px_rgba(116,87,61,0.12)]";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-gray-500";

function Fields({ initialPiece }: { initialPiece: string }) {
  const [topic, setTopic] = useState(initialPiece ? TOPICS[0].label : TOPICS[1].label);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const piece = String(data.get("piece") || "");
    const subject = `${topic}${piece ? `: ${piece}` : ""}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Topic: ${topic}`,
      piece ? `Piece: ${piece}` : null,
      "",
      String(data.get("message") || "")
    ]
      .filter((line) => line !== null)
      .join("\n");
    window.location.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Topic tiles */}
      <fieldset className="m-0 p-0">
        <legend className={`${labelClass} mb-3 p-0`}>What can we help with?</legend>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {TOPICS.map(({ label, icon: Icon }) => {
            const selected = label === topic;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setTopic(label)}
                aria-pressed={selected}
                className={`group relative flex cursor-pointer items-center gap-2.5 rounded-2xl border px-3 py-3 text-left text-[13px] font-semibold leading-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  selected
                    ? "border-transparent text-white shadow-[0_12px_28px_-14px_rgba(42,31,24,0.7)]"
                    : "border-[#efe5d9] bg-[#fdf8f3] text-brand-charcoal hover:-translate-y-0.5 hover:border-[#d9c7b0] hover:bg-white"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="contact-topic"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-2xl bg-[#2a1f18]"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${
                    selected ? "bg-gradient-to-br from-[#dfb76c] to-[#c5a059] text-[#2a1f18]" : "bg-white text-[#5b4230] shadow-sm"
                  }`}
                >
                  <Icon size={15} aria-hidden="true" />
                </span>
                <span className="relative flex-1">{label}</span>
                <AnimatePresence>
                  {selected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#dfb76c] text-[#2a1f18]"
                      aria-hidden="true"
                    >
                      <Check size={10} strokeWidth={3.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>Full name</label>
          <input id="cf-name" name="name" required autoComplete="name" placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>Phone <span className="normal-case tracking-normal text-gray-400">(optional)</span></label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className={labelClass}>Email address</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
      </div>

      <div>
        <label htmlFor="cf-piece" className={labelClass}>Piece or service <span className="normal-case tracking-normal text-gray-400">(optional)</span></label>
        <input id="cf-piece" name="piece" defaultValue={initialPiece} placeholder="e.g. Radiant 14Kt Diamond Ring" className={inputClass} />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>Message</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your idea, occasion or budget…"
          className={`${inputClass} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="text-xs text-gray-400">We usually reply within one business day.</p>
        <button
          type="submit"
          className="group inline-flex cursor-pointer items-center gap-3 rounded-full border-0 bg-[#2a1f18] py-2 pl-7 pr-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-orange"
        >
          Send Enquiry
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1">
            <ArrowRight size={16} aria-hidden="true" />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-2.5 rounded-xl bg-brand-green/10 px-4 py-3 text-sm text-brand-green"
          >
            <Check size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              Your email app should now open with your enquiry ready to send. If it doesn&apos;t, email us directly at{" "}
              <a href={`mailto:${TO_EMAIL}`} className="inline-flex items-center gap-1 font-semibold underline">
                <Mail size={13} aria-hidden="true" />
                {TO_EMAIL}
              </a>
              .
            </span>
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

// Prefills the piece from links such as /contact?enquiry=Radiant%2014Kt%20Diamond%20Ring
function FieldsFromUrl() {
  const params = useSearchParams();
  const piece = params.get("enquiry") ?? "";
  return <Fields key={piece} initialPiece={piece} />;
}

export default function ContactForm() {
  return (
    <Suspense fallback={<Fields initialPiece="" />}>
      <FieldsFromUrl />
    </Suspense>
  );
}
