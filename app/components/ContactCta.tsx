import Link from "next/link";
import { ArrowRight, CalendarCheck, Gem, MapPin, MessageCircle, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const HIGHLIGHTS = [
  { icon: MapPin, label: "Kozhikode boutique" },
  { icon: CalendarCheck, label: "Private viewings" },
  { icon: MessageCircle, label: "Reply within a day" }
];

const PHOTO = "/images/latest/new-arrivals.jpg";

// Closing invitation on the landing page, leading visitors to the contact page
export default function ContactCta() {
  return (
    <section className="bg-[#fdf8f3] px-6 pb-24 lg:px-8" aria-labelledby="contact-cta-heading">
      <Reveal className="mx-auto max-w-6xl">
        <div className="group relative overflow-hidden rounded-[2rem] bg-[#2a1f18] shadow-[0_40px_80px_-40px_rgba(42,31,24,0.7)]">
          {/* Desktop photo: fills the right side and fades seamlessly into the panel */}
          <div className="absolute inset-y-0 right-0 hidden w-[60%] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_40%)] lg:block">
            <div
              role="img"
              aria-label="Gold and diamond rings displayed on marble pedestals"
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              style={{ backgroundImage: `url(${PHOTO})` }}
            />
          </div>

          {/* Warm glows */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#c5a059]/20 blur-[110px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-brand-orange/40 blur-[110px]" aria-hidden="true" />
          <Sparkles size={18} className="animate-twinkle pointer-events-none absolute left-[52%] top-10 hidden text-[#dfb76c] lg:block" aria-hidden="true" />
          <Sparkles size={12} className="animate-twinkle pointer-events-none absolute bottom-14 left-[46%] hidden text-[#dfb76c] [animation-delay:1.4s] lg:block" aria-hidden="true" />

          <div className="relative grid lg:grid-cols-[1.1fr_1fr]">
            {/* Copy */}
            <div className="p-8 sm:p-12">
              <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#dfb76c]/25 bg-[#dfb76c]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#dfb76c]">
                <Sparkles size={12} aria-hidden="true" />
                Visit or get in touch
              </span>
              <h2 id="contact-cta-heading" className="mb-4 text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-[2.75rem]">
                Find the piece that&apos;s <span className="italic text-[#dfb76c]">truly yours</span>
              </h2>
              <p className="mb-8 max-w-md text-[15px] leading-relaxed text-[#e9dccb]/75">
                Book a private consultation, ask about a design or visit our boutique. Our jewellers are here to help.
              </p>

              <div className="mb-9 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group/btn inline-flex cursor-pointer items-center gap-3 rounded-full bg-gradient-to-r from-[#e9c887] to-[#dfb76c] py-2 pl-7 pr-2 text-sm font-semibold text-[#2a1f18] shadow-[0_10px_30px_-10px_rgba(223,183,108,0.7)] transition-all duration-300 hover:from-white hover:to-white hover:text-[#2a1f18]"
                >
                  Contact Us
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2a1f18] text-white transition-transform duration-500 group-hover/btn:translate-x-1">
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
                <Link
                  href="/contact?enquiry=Book%20a%20store%20visit"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white"
                >
                  <CalendarCheck size={16} className="text-[#dfb76c]" aria-hidden="true" />
                  Book a Visit
                </Link>
              </div>

              {/* Highlights */}
              <ul className="flex list-none flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
                {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-xs font-medium text-[#e9dccb]/70">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-[#dfb76c] ring-1 ring-inset ring-white/10">
                      <Icon size={13} aria-hidden="true" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo column: mobile photo + floating chip */}
            <div className="relative min-h-[15rem] lg:min-h-0">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center [mask-image:linear-gradient(to_bottom,transparent,black_35%)] lg:hidden"
                style={{ backgroundImage: `url(${PHOTO})` }}
              />
              <div className="animate-float absolute bottom-6 right-6 flex items-center gap-3 rounded-2xl border border-white/20 bg-[#2a1f18]/55 py-2.5 pl-2.5 pr-5 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#dfb76c] to-[#c5a059] text-[#2a1f18]">
                  <Gem size={17} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e9dccb]/60">Bespoke design</span>
                  <span className="block font-display text-base font-semibold leading-tight text-white">Consultations open</span>
                </span>
              </div>
            </div>
          </div>

          {/* Fine gold edge */}
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[#dfb76c]/15" aria-hidden="true" />
        </div>
      </Reveal>
    </section>
  );
}
