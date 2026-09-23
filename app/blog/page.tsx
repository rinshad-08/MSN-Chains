import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock, Sparkles } from "lucide-react";
import BlogGrid from "../components/BlogGrid";
import Reveal from "../components/Reveal";
import { formatDate, posts } from "../data/posts";

export const metadata: Metadata = {
  title: "Journal | MSN CHAINS",
  description: "Guides, care tips and stories from the MSN CHAINS workshop: chain styles, gold care, diamonds and jewellery heritage."
};

export default function Blog() {
  const [featured, ...rest] = posts;
  // Format dates on the server so client rendering matches exactly
  const dates = Object.fromEntries(posts.map((p) => [p.slug, formatDate(p.date)]));

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-[#fdf8f3] px-6 pb-16 pt-12 lg:px-8 lg:pt-16">
        <div className="pointer-events-none absolute -left-40 -top-10 h-[26rem] w-[26rem] rounded-full bg-[#f3e3cf]/80 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#eadfd2] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange backdrop-blur-md">
                <Sparkles size={12} aria-hidden="true" />
                The Journal
              </span>
              <h1 className="mb-0 text-5xl font-medium leading-[1.05] tracking-tight text-brand-charcoal sm:text-6xl">
                Stories, guides &amp; <span className="italic text-brand-orange">jewellery wisdom</span>
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500">
              Insights from our master jewellers on chain styles, caring for fine jewellery and the heritage behind every design.
            </p>
          </Reveal>

          {/* Featured article */}
          <Reveal delay={0.1}>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid cursor-pointer gap-3 rounded-[2.25rem] border border-[#efe5d9] bg-white p-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-transparent hover:text-inherit hover:shadow-[0_34px_70px_-30px_rgba(91,66,48,0.45)] lg:grid-cols-[1.2fr_1fr]"
            >
              {/* Photo, inset with its own rounded frame */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] lg:aspect-auto lg:min-h-[26rem]">
                <div
                  role="img"
                  aria-label={featured.title}
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  style={{ backgroundImage: `url(${featured.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f18]/45 via-transparent to-transparent" aria-hidden="true" />
                <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[#2a1f18]/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#dfb76c] backdrop-blur-md">
                  <BookOpen size={12} aria-hidden="true" />
                  Featured Story
                </span>
                <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                  <Sparkles size={12} aria-hidden="true" />
                  Editor&apos;s pick
                </span>
              </div>

              {/* Text panel */}
              <div className="relative flex flex-col justify-center overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#fdf8f3] to-[#f6ecdf] p-8 sm:p-10">
                <span
                  className="pointer-events-none absolute -right-2 -top-10 select-none font-display text-[12rem] leading-none text-[#eadcc9] transition-transform duration-700 group-hover:-translate-y-2"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="relative mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500">
                  <span className="rounded-full bg-white px-2.5 py-1 font-semibold uppercase tracking-[0.14em] text-brand-orange shadow-sm">
                    {featured.category}
                  </span>
                  <time dateTime={featured.date}>{dates[featured.slug]}</time>
                  <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} aria-hidden="true" />
                    {featured.readTime} min read
                  </span>
                </p>
                <h2 className="relative mb-4 text-3xl font-medium leading-[1.15] tracking-tight text-brand-charcoal transition-colors duration-500 group-hover:text-brand-orange sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="relative mb-8 text-[15px] leading-relaxed text-gray-600">{featured.excerpt}</p>

                <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-[#e8dccd] pt-6">
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a1f18] font-display text-base font-semibold text-[#dfb76c]">
                      M
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-brand-charcoal">MSN Workshop</span>
                      <span className="block text-xs text-gray-500">Master jewellers</span>
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-3 rounded-full bg-[#2a1f18] py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors duration-500 group-hover:bg-brand-orange">
                    Read the story
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* All articles */}
      <section className="bg-white px-6 py-20 lg:px-8" aria-labelledby="latest-articles-heading">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8">
            <span className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              Latest Articles
            </span>
            <h2 id="latest-articles-heading" className="mb-0 text-4xl font-medium tracking-tight text-brand-charcoal">
              From the <span className="italic text-brand-orange">workshop</span>
            </h2>
          </Reveal>
          <BlogGrid posts={rest} dates={dates} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 pb-24 lg:px-8">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#2a1f18] px-8 py-14 sm:px-14">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#c5a059]/20 blur-[100px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-brand-orange/40 blur-[110px]" aria-hidden="true" />
          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="mb-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Need <span className="italic text-[#dfb76c]">personal</span> advice?
              </h2>
              <p className="text-sm leading-relaxed text-[#e9dccb]/75">
                Our jewellers are happy to help you choose, style or care for your pieces, in store or online.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#2a1f18] transition-colors duration-300 hover:bg-[#dfb76c] hover:text-[#2a1f18]"
            >
              Talk to an Expert
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
