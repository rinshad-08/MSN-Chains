import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { formatDate, posts, type Post } from "../data/posts";
import Reveal from "./Reveal";

// Photo tile shared by both card sizes; tall studio shots on white are shown whole
function Cover({ post, className }: { post: Post; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#f8f3ec] to-[#efe2d1] ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute bg-center bg-no-repeat transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${
          post.imageFit === "contain" ? "inset-5 bg-contain mix-blend-multiply" : "inset-0 bg-cover"
        }`}
        style={{ backgroundImage: `url(${post.image})` }}
      />
    </div>
  );
}

function Meta({ post }: { post: Post }) {
  return (
    <p className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-400">
      <span className="font-semibold uppercase tracking-[0.14em] text-brand-orange">{post.category}</span>
      <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden="true" />
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden="true" />
      <span className="inline-flex items-center gap-1">
        <Clock size={12} aria-hidden="true" />
        {post.readTime} min
      </span>
    </p>
  );
}

export default function JournalShowcase() {
  const [lead, ...others] = posts.slice(0, 3);

  return (
    <section className="bg-[#fdf8f3] px-6 py-20 lg:px-8" aria-labelledby="journal-showcase-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              From the Journal
            </span>
            <h2 id="journal-showcase-heading" className="mb-0 text-4xl font-medium tracking-tight text-brand-charcoal sm:text-5xl">
              Stories &amp; <span className="italic text-brand-orange">guides</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#2a1f18]/20 px-5 py-2.5 text-sm font-semibold text-[#2a1f18] transition-colors duration-300 hover:border-[#2a1f18] hover:bg-[#2a1f18] hover:text-white"
          >
            View all articles
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* Lead story */}
          <Reveal>
            <Link
              href={`/blog/${lead.slug}`}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-[#efe5d9] bg-white p-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-transparent hover:text-inherit hover:shadow-[0_30px_60px_-28px_rgba(91,66,48,0.45)]"
            >
              <div className="relative">
                <Cover post={lead} className="aspect-[16/10] rounded-[1.5rem]" />
                <span className="absolute left-4 top-4 rounded-full bg-[#2a1f18]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#dfb76c] backdrop-blur-md">
                  Latest story
                </span>
                <span
                  className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-white text-[#2a1f18] opacity-0 shadow-lg transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:rotate-45 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <ArrowUpRight size={17} />
                </span>
              </div>
              <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                <Meta post={lead} />
                <h3 className="mb-3 text-2xl font-medium leading-snug tracking-tight text-brand-charcoal transition-colors duration-500 group-hover:text-brand-orange sm:text-3xl">
                  {lead.title}
                </h3>
                <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-gray-500">{lead.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-charcoal transition-colors duration-500 group-hover:text-brand-orange">
                  Read the story
                  <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Two more stories */}
          <div className="flex flex-col gap-6">
            {others.map((post, i) => (
              <Reveal key={post.slug} delay={0.1 + i * 0.08} className="flex-1">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid h-full cursor-pointer grid-cols-[40%_1fr] gap-1 overflow-hidden rounded-[1.75rem] border border-[#efe5d9] bg-white p-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-transparent hover:text-inherit hover:shadow-[0_24px_48px_-20px_rgba(91,66,48,0.4)]"
                >
                  {/* Photo fills the full height of the card */}
                  <div className="relative min-h-[11rem] overflow-hidden rounded-[1.35rem]">
                    <div className="absolute inset-0">
                      <Cover post={post} className="h-full w-full" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f18]/35 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-[#2a1f18]/75 px-2.5 py-0.5 font-display text-xs italic text-[#dfb76c] backdrop-blur-md">
                      No. {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-col px-4 pb-3 pt-4 sm:px-5 sm:pt-5">
                    <Meta post={post} />
                    <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-brand-charcoal sm:text-xl">
                      <span className="bg-gradient-to-r from-brand-orange to-brand-orange bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px] group-hover:text-brand-orange">
                        {post.title}
                      </span>
                    </h3>
                    <div className="hidden sm:block">
                      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500">{post.excerpt}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between border-t border-[#efe5d9] pt-3.5 transition-colors duration-700 group-hover:border-[#e3d3bf]">
                      <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-charcoal transition-colors duration-500 group-hover:text-brand-orange">
                        Read article
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e8dccd] text-brand-charcoal transition-all duration-500 group-hover:rotate-45 group-hover:border-[#2a1f18] group-hover:bg-[#2a1f18] group-hover:text-white">
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
