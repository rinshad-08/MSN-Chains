import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Gem,
  PenTool,
  RefreshCw,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import FaqAccordion from "../components/FaqAccordion";
import Reveal from "../components/Reveal";
import ValueCards, { type ValueItem } from "../components/ValueCards";

export const metadata: Metadata = {
  title: "Our Services | MSN CHAINS",
  description: "Bespoke chain design, restoration and polishing, diamond setting, resizing, valuation and gold exchange from MSN CHAINS."
};

const HIGHLIGHTS = ["Free design consultation", "Lifetime care & cleaning", "Fully insured delivery"];

const SERVICES = [
  {
    icon: PenTool,
    eyebrow: "Made for you",
    title: "Custom Chain Design",
    text: "Work one-on-one with our master jewellers to create a chain that is entirely yours. Choose the link style, metal, weight, length and finishing, and we bring it to life with precision.",
    points: ["Hand-drawn sketches and 3D previews", "Gold from 14Kt to 22Kt, or platinum", "Engraving and personalised clasps"],
    meta: "3–4 weeks",
    image: "/images/featured/rope-chain.jpg",
    blend: true
  },
  {
    icon: RefreshCw,
    eyebrow: "Heirloom care",
    title: "Restoration & Polishing",
    text: "Bring treasured pieces back to their original brilliance. We repair worn links, re-solder weak joints and restore lustre with professional ultrasonic cleaning and hand polishing.",
    points: ["Link and clasp repairs", "Ultrasonic cleaning and steam finish", "Rhodium and gold re-plating"],
    meta: "3–7 days",
    image: "/images/about/bangles.jpg",
    blend: false
  },
  {
    icon: Gem,
    eyebrow: "Brilliance, secured",
    title: "Diamond Setting",
    text: "Elevate any piece with precision-set diamonds. Our setters choose each stone for cut and clarity, then set it for maximum light performance and everyday security.",
    points: ["Certified natural diamonds", "Prong, bezel, pavé and channel settings", "Stone upgrades on existing jewellery"],
    meta: "1–2 weeks",
    image: "/images/featured/tennis-chain.jpg",
    blend: false
  }
];

const MORE_SERVICES: ValueItem[] = [
  { icon: "ruler", title: "Resizing & Repairs", text: "Rings resized and chains shortened or lengthened, with seamless, invisible joins.", href: "/contact?enquiry=Resizing%20%26%20Repairs" },
  { icon: "scale", title: "Valuation & Certification", text: "Accurate written valuations for insurance, backed by purity testing and gemstone grading.", href: "/contact?enquiry=Valuation%20%26%20Certification" },
  { icon: "coins", title: "Gold Exchange", text: "Transparent, same-day exchange of your old gold at today's rate towards a new piece.", href: "/contact?enquiry=Gold%20Exchange" }
];

const FAQS = [
  {
    q: "How long does a custom chain take?",
    a: "Most custom chains take 3 to 4 weeks from approved design to delivery. Complex designs or diamond work can take a little longer, and we'll give you a clear timeline at your consultation."
  },
  {
    q: "Is the design consultation really free?",
    a: "Yes. Your first consultation, in store or online, is free and comes with no obligation. We'll discuss ideas, budget and options, and share initial sketches."
  },
  {
    q: "Can you restore jewellery bought elsewhere?",
    a: "Absolutely. We restore, repair and polish pieces from any jeweller. We'll inspect the piece first and confirm the work and cost before we begin."
  },
  {
    q: "Are your diamonds and gold certified?",
    a: "Every gold piece is BIS hallmarked, and diamonds above 0.30 ct come with independent certification. You'll receive the documents with your jewellery."
  }
];

export default function Service() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#fdf8f3] px-6 pb-20 pt-12 lg:px-8 lg:pt-16">
        <div className="pointer-events-none absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-[#f3e3cf]/80 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#eadfd2] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange backdrop-blur-md">
              <Sparkles size={12} aria-hidden="true" />
              Our Services
            </span>
            <h1 className="mb-6 text-5xl font-medium leading-[1.05] tracking-tight text-brand-charcoal sm:text-6xl">
              Bespoke creation &amp; <span className="italic text-brand-orange">lifelong</span> care
            </h1>
            <p className="mb-7 max-w-lg text-base leading-relaxed text-gray-600">
              From designing a chain that is uniquely yours to restoring a family heirloom, our master jewellers
              bring the same precision and care to every piece that passes through our workshop.
            </p>
            <ul className="mb-8 flex list-none flex-wrap gap-x-6 gap-y-2">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-brand-charcoal">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#2a1f18] py-2 pl-7 pr-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-orange hover:text-white"
              >
                Book a Consultation
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1">
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
              <a
                href="#services"
                className="inline-flex cursor-pointer items-center rounded-full border border-[#2a1f18]/20 px-7 py-3 text-sm font-semibold text-[#2a1f18] transition-colors duration-300 hover:border-[#2a1f18] hover:bg-[#2a1f18] hover:text-white"
              >
                Explore Services
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="group relative mx-auto w-full max-w-[30rem] pb-8 lg:mr-0">
            <div
              className="absolute inset-x-6 bottom-4 top-6 -rotate-[4deg] rounded-[2.25rem] bg-gradient-to-br from-[#f1dfc8] to-[#dcb893] opacity-80 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-[6deg]"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_rgba(91,66,48,0.5)]">
              <div
                role="img"
                aria-label="Gold and diamond rings displayed on marble pedestals"
                className="aspect-[6/5] bg-cover bg-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                style={{ backgroundImage: "url(/images/latest/new-arrivals.jpg)" }}
              />
            </div>
            <Sparkles size={20} className="animate-twinkle absolute -top-3 right-1/4 text-[#c5a059]" aria-hidden="true" />
            <div className="animate-float absolute -left-4 bottom-0 flex items-center gap-3 rounded-2xl bg-[#2a1f18] py-2.5 pl-2.5 pr-5 shadow-[0_14px_30px_-10px_rgba(42,31,24,0.6)] sm:-left-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#dfb76c]/30 to-white/5 text-[#dfb76c]">
                <ShieldCheck size={17} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e9dccb]/60">Every piece</p>
                <p className="font-display text-lg font-semibold leading-none text-white">Lifetime warranty</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main services */}
      <section id="services" className="scroll-mt-28 bg-white px-6 py-24 lg:px-8" aria-labelledby="services-heading">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-4 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              What We Offer
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
            </span>
            <h2 id="services-heading" className="mb-4 text-4xl font-medium tracking-tight text-brand-charcoal sm:text-5xl">
              Crafted with <span className="italic text-brand-orange">expertise</span>
            </h2>
            <p className="text-base leading-relaxed text-gray-500">Three signature services, delivered by the same hands that make our collections.</p>
          </Reveal>

          <div className="space-y-20 lg:space-y-28">
            {SERVICES.map(({ icon: Icon, ...service }, i) => {
              const flip = i % 2 === 1;
              return (
                <article key={service.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <Reveal className={flip ? "lg:order-2" : ""}>
                    <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f8f3ec] to-[#efe5d8] shadow-[0_30px_60px_-30px_rgba(91,66,48,0.45)]">
                      <div
                        role="img"
                        aria-label={service.title}
                        className={`aspect-[4/3] bg-center bg-no-repeat transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
                          service.blend ? "bg-contain mix-blend-multiply" : "bg-cover"
                        }`}
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                      <span className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1 font-display text-sm italic text-[#4a3526] shadow-sm backdrop-blur-md">
                        No. {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f6e6cf] to-[#e8cfa9] text-[#5b4230] shadow-[0_8px_20px_-8px_rgba(197,160,89,0.6)]">
                        <Icon size={21} aria-hidden="true" />
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">{service.eyebrow}</span>
                    </div>
                    <h3 className="mb-4 text-3xl font-medium tracking-tight text-brand-charcoal sm:text-4xl">{service.title}</h3>
                    <p className="mb-6 text-[15px] leading-relaxed text-gray-600">{service.text}</p>
                    <ul className="mb-8 list-none space-y-3">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm font-medium text-brand-charcoal">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2a1f18] text-[#dfb76c]">
                            <Check size={11} strokeWidth={3} aria-hidden="true" />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href={`/contact?enquiry=${encodeURIComponent(service.title)}`}
                        className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#2a1f18] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-orange hover:text-white"
                      >
                        Enquire Now
                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                        <Clock size={15} className="text-brand-orange" aria-hidden="true" />
                        Typical turnaround: <span className="font-semibold text-brand-charcoal">{service.meta}</span>
                      </span>
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* More services */}
      <section className="bg-[#fdf8f3] px-6 py-24 lg:px-8" aria-labelledby="more-heading">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
                <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
                Also Available
              </span>
              <h2 id="more-heading" className="mb-0 text-4xl font-medium tracking-tight text-brand-charcoal sm:text-5xl">
                Everyday <span className="italic text-brand-orange">essentials</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500">Quick, expert services to keep your jewellery looking its best.</p>
          </Reveal>

          <ValueCards items={MORE_SERVICES} className="md:grid-cols-3" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-24 lg:px-8" aria-labelledby="faq-heading">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <span className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              Good To Know
            </span>
            <h2 id="faq-heading" className="mb-5 text-4xl font-medium tracking-tight text-brand-charcoal sm:text-5xl">
              Frequently asked <span className="italic text-brand-orange">questions</span>
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              Can&apos;t find what you&apos;re looking for? Our team is happy to help with anything else.
            </p>
            <Link href="/contact" className="group inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-brand-charcoal hover:text-brand-orange">
              Contact our team
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <FaqAccordion faqs={FAQS} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 pb-24 lg:px-8">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#2a1f18] px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#c5a059]/20 blur-[100px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-brand-orange/40 blur-[110px]" aria-hidden="true" />
          <div className="relative">
            <h2 className="mb-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
              Have a piece in <span className="italic text-[#dfb76c]">mind?</span>
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[#e9dccb]/75">
              Tell us about your idea or the jewellery you&apos;d like restored. We&apos;ll get back to you within one business day.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#2a1f18] transition-colors duration-300 hover:bg-[#dfb76c] hover:text-[#2a1f18]"
              >
                Book a Consultation
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="inline-flex cursor-pointer items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10 hover:text-white"
              >
                Our Story
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
