import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gem, ShieldCheck, Sparkles } from "lucide-react";
import CountUp from "../components/CountUp";
import Reveal from "../components/Reveal";
import ValueCards from "../components/ValueCards";

export const metadata: Metadata = {
  title: "Our Heritage | MSN CHAINS",
  description: "The story behind MSN CHAINS: master craftsmanship, certified purity and jewellery made to be passed down through generations."
};

const STATS = [
  { value: 25, suffix: "+", label: "Years of craft" },
  { value: 10000, suffix: "+", label: "Happy families" },
  { value: 500, suffix: "+", label: "Signature designs" },
  { value: 100, suffix: "%", label: "BIS hallmarked gold" }
];

const PROCESS = [
  { step: "01", title: "Consult", text: "We listen to your vision, occasion and style, in store or online." },
  { step: "02", title: "Design", text: "Our designers sketch and render your piece until every detail feels right." },
  { step: "03", title: "Craft", text: "Master jewellers bring the design to life, link by link, stone by stone." },
  { step: "04", title: "Certify & Deliver", text: "Each piece is hallmarked, quality checked and delivered fully insured." }
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#fdf8f3] px-6 pb-20 pt-12 lg:px-8 lg:pt-16">
        <div className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-[#f3e3cf]/70 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#eadfd2] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange backdrop-blur-md">
              <Sparkles size={12} aria-hidden="true" />
              Our Heritage
            </span>
            <h1 className="mb-6 text-5xl font-medium leading-[1.05] tracking-tight text-brand-charcoal sm:text-6xl">
              Crafted to be <span className="italic text-brand-orange">cherished</span> for generations
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-600">
              For over two decades, MSN CHAINS has created fine jewellery that marks life&apos;s biggest moments.
              What began as a small family workshop is today a trusted name for bespoke chains, bridal sets and
              everyday diamonds, still made with the same patience and care.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#2a1f18] py-2 pl-7 pr-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-orange hover:text-white"
              >
                Visit Our Store
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1">
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
              <Link
                href="/service"
                className="inline-flex cursor-pointer items-center rounded-full border border-[#2a1f18]/20 px-7 py-3 text-sm font-semibold text-[#2a1f18] transition-colors duration-300 hover:border-[#2a1f18] hover:bg-[#2a1f18] hover:text-white"
              >
                Our Services
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="group relative mx-auto w-full max-w-[30rem] pb-10 pr-6 lg:mr-0">
            {/* Dotted pattern */}
            <div
              className="absolute -right-6 -top-8 h-40 w-40 bg-[radial-gradient(#c9a07a_1.2px,transparent_1.2px)] opacity-50 [background-size:14px_14px] [mask-image:radial-gradient(circle,black_40%,transparent_72%)]"
              aria-hidden="true"
            />
            {/* Tilted warm card behind the photo */}
            <div
              className="absolute inset-x-6 bottom-6 top-6 rotate-[4deg] rounded-[2.25rem] bg-gradient-to-br from-[#f1dfc8] to-[#dcb893] opacity-80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[6deg]"
              aria-hidden="true"
            />

            {/* Main photo */}
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-25px_rgba(91,66,48,0.5)]">
              <div
                role="img"
                aria-label="Diamond necklace, earrings, ring and bracelet displayed on a cream bust"
                className="aspect-[6/5] bg-cover bg-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                style={{ backgroundImage: "url(/images/about/necklace-set.jpg)" }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/40" aria-hidden="true" />
            </div>

            {/* Sparkles */}
            <Sparkles size={22} className="animate-twinkle absolute -top-3 left-1/3 text-[#c5a059]" aria-hidden="true" />
            <Sparkles size={14} className="animate-twinkle absolute bottom-16 -left-3 text-[#c5a059] [animation-delay:1.2s]" aria-hidden="true" />
            <Sparkles size={16} className="animate-twinkle absolute right-1 top-1/3 text-[#c5a059] [animation-delay:2.1s]" aria-hidden="true" />

            {/* Inset detail photo */}
            <div
              role="img"
              aria-label="Handcrafted gold bangles"
              className="absolute bottom-0 right-0 aspect-square w-32 -rotate-3 rounded-[1.5rem] border-[5px] border-[#fdf8f3] bg-cover bg-center shadow-[0_18px_40px_-12px_rgba(91,66,48,0.5)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:scale-105 sm:w-40"
              style={{ backgroundImage: "url(/images/about/bangles.jpg)" }}
            />

            {/* Heritage badge */}
            <div className="animate-float absolute -left-4 top-8 flex items-center gap-3 rounded-2xl bg-[#2a1f18] py-2.5 pl-2.5 pr-5 shadow-[0_14px_30px_-10px_rgba(42,31,24,0.6)] sm:-left-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#dfb76c]/30 to-white/5 text-[#dfb76c]">
                <Gem size={17} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e9dccb]/60">Since</p>
                <p className="font-display text-xl font-semibold leading-none text-white">1998</p>
              </div>
            </div>

            {/* Certification chip */}
            <div className="animate-float-delayed absolute bottom-4 left-6 flex items-center gap-1.5 rounded-full border border-white/70 bg-white/90 px-3.5 py-2 text-[11px] font-semibold text-brand-charcoal shadow-[0_8px_24px_rgba(0,0,0,0.1)] backdrop-blur-md">
              <ShieldCheck size={14} className="text-brand-green" aria-hidden="true" />
              BIS Hallmarked
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#2a1f18] px-6 py-9 lg:px-8" aria-label="MSN CHAINS in numbers">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-y-7 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="flex flex-col text-center lg:border-l lg:border-white/10 lg:first:border-l-0">
              <dt className="order-2 mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e9dccb]/60">{stat.label}</dt>
              <dd className="font-display text-3xl font-semibold text-white sm:text-4xl">
                <CountUp to={stat.value} suffix={stat.suffix} delay={i * 0.12} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Story */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div
              role="img"
              aria-label="Handcrafted gold bangles with rubies and emeralds"
              className="aspect-[4/3] rounded-[2rem] bg-cover bg-center shadow-[0_30px_60px_-25px_rgba(91,66,48,0.45)]"
              style={{ backgroundImage: "url(/images/about/bangles.jpg)" }}
            />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <span className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              Our Story
            </span>
            <h2 className="mb-6 text-4xl font-medium leading-tight tracking-tight text-brand-charcoal sm:text-5xl">
              A legacy of <span className="italic text-brand-orange">excellence</span>
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-gray-600">
              <p>
                MSN CHAINS was founded on a simple belief: a chain is never just an accessory. It is a keepsake that
                carries memories of weddings, milestones and the people we love.
              </p>
              <p>
                Our master jewellers blend traditional techniques passed down through generations with modern
                precision. Every link is hand-finished, every stone individually set, and every piece checked
                against standards we refuse to compromise on.
              </p>
              <p>
                Today we serve families who return to us across generations, from a first gold chain to a bridal
                trousseau, and that trust remains our proudest achievement.
              </p>
            </div>
            <p className="mt-8 font-display text-2xl italic text-[#4a3526]">The MSN Family</p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#fdf8f3] px-6 py-24 lg:px-8" aria-labelledby="values-heading">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-4 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              What We Stand For
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
            </span>
            <h2 id="values-heading" className="mb-4 text-4xl font-medium tracking-tight text-brand-charcoal sm:text-5xl">
              The MSN <span className="italic text-brand-orange">promise</span>
            </h2>
            <p className="text-base leading-relaxed text-gray-500">Four principles behind every piece that leaves our workshop.</p>
          </Reveal>

          <ValueCards />
        </div>
      </section>

      {/* Process */}
      <section className="bg-white px-6 py-24 lg:px-8" aria-labelledby="process-heading">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
                <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
                How We Work
              </span>
              <h2 id="process-heading" className="mb-0 text-4xl font-medium tracking-tight text-brand-charcoal sm:text-5xl">
                From sketch to <span className="italic text-brand-orange">heirloom</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500">
              A bespoke journey, guided by our designers at every step.
            </p>
          </Reveal>

          <ol className="grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESS.map((item, i) => (
              <li key={item.step}>
                <Reveal delay={i * 0.1}>
                  <div className="mb-5 flex items-center gap-4">
                    <span className="font-display text-5xl italic text-brand-orange/30">{item.step}</span>
                    <span className="h-px flex-1 bg-[#eadfd2]" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold tracking-normal text-brand-charcoal">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 pb-24 lg:px-8">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#2a1f18] px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#c5a059]/20 blur-[100px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-brand-orange/40 blur-[110px]" aria-hidden="true" />
          <div className="relative">
            <h2 className="mb-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
              Let&apos;s create something <span className="italic text-[#dfb76c]">timeless</span>
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[#e9dccb]/75">
              Book a private consultation with our designers, or visit our store to explore the collection in person.
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
                href="/#latest-heading"
                className="inline-flex cursor-pointer items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10 hover:text-white"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
