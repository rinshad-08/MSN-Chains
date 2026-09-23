import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import ArticleToc, { ReadingProgress } from "../../components/ArticleToc";
import Reveal from "../../components/Reveal";
import { formatDate, getPost, posts } from "../../data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} | MSN CHAINS Journal`, description: post.excerpt };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const toId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const toc = post.body.flatMap((b) => (typeof b === "string" ? [] : [{ id: toId(b.h), label: b.h }]));

  return (
    <article>
      <ReadingProgress />
      {/* Header */}
      <header className="relative overflow-hidden bg-[#fdf8f3] px-6 pb-12 pt-10 lg:px-8">
        <div className="pointer-events-none absolute -right-40 -top-10 h-[26rem] w-[26rem] rounded-full bg-[#f3e3cf]/80 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto mb-8 max-w-5xl">
          <Link href="/blog" className="group inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-orange">
            <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
            Back to Journal
          </Link>
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-gray-500">
            <span className="rounded-full bg-[#2a1f18] px-3 py-1 font-semibold uppercase tracking-[0.14em] text-[#dfb76c]">{post.category}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden="true" />
            <span className="inline-flex items-center gap-1">
              <Clock size={12} aria-hidden="true" />
              {post.readTime} min read
            </span>
          </p>
          <h1 className="mb-5 text-4xl font-medium leading-[1.1] tracking-tight text-brand-charcoal sm:text-5xl">{post.title}</h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600">{post.excerpt}</p>
        </div>
      </header>

      {/* Cover */}
      <div className="bg-gradient-to-b from-[#fdf8f3] to-white px-6 lg:px-8">
        <Reveal className="mx-auto max-w-5xl">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f8f3ec] to-[#efe5d8] shadow-[0_30px_60px_-30px_rgba(91,66,48,0.45)]">
            <div
              role="img"
              aria-label={post.title}
              className={`absolute bg-center bg-no-repeat ${post.imageFit === "contain" ? "inset-8 bg-contain mix-blend-multiply" : "inset-0 bg-cover"}`}
              style={{ backgroundImage: `url(${post.image})` }}
            />
          </div>
        </Reveal>
      </div>

      {/* Body */}
      <div className="bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-8">
              {toc.length > 0 && <ArticleToc items={toc} />}
              <div className="rounded-2xl bg-[#2a1f18] p-5 text-white">
                <p className="mb-1 font-display text-lg leading-snug">Need expert advice?</p>
                <p className="mb-4 text-xs leading-relaxed text-[#e9dccb]/70">Our jewellers are happy to help, in store or online.</p>
                <Link
                  href="/contact"
                  className="group inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#dfb76c] hover:text-white"
                >
                  Book a consultation
                  <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Article text */}
          <div className="min-w-0">
            {post.body.map((block, i) => {
                if (typeof block !== "string") {
                  const id = toId(block.h);
                  const section = toc.findIndex((t) => t.id === id) + 1;
                  return (
                    <h2
                      key={i}
                      id={id}
                      className="mb-5 mt-14 flex scroll-mt-32 items-baseline gap-4 border-t border-[#efe5d9] pt-10 text-2xl font-medium tracking-tight text-brand-charcoal sm:text-3xl"
                    >
                      <span className="font-display text-lg italic text-brand-orange/60">{String(section).padStart(2, "0")}</span>
                      {block.h}
                    </h2>
                  );
                }
                return i === 0 ? (
                  <p
                    key={i}
                    className="mb-8 text-xl leading-[1.7] text-brand-charcoal first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-brand-orange sm:text-[22px]"
                  >
                    {block}
                  </p>
                ) : (
                  <p key={i} className="mb-6 text-[17px] leading-[1.85] text-gray-600">
                    {block}
                  </p>
                );
              })}

            {/* Author note */}
            <div className="mt-14 flex items-center gap-4 rounded-2xl border border-[#efe5d9] bg-gradient-to-br from-[#fdf8f3] to-[#f6ecdf] p-5 sm:p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2a1f18] font-display text-lg font-semibold text-[#dfb76c]">
                M
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-brand-charcoal">Written by the MSN CHAINS workshop</p>
                <p className="text-xs text-gray-500">Questions about this article? Our jewellers are happy to help.</p>
              </div>
              <Link
                href="/contact"
                className="hidden cursor-pointer items-center gap-1.5 rounded-full bg-[#2a1f18] px-4 py-2 text-xs font-semibold text-white transition-colors duration-300 hover:bg-brand-orange hover:text-white sm:inline-flex"
              >
                Ask an expert
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="bg-[#fdf8f3] px-6 py-20 lg:px-8" aria-labelledby="related-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="related-heading" className="mb-8 text-3xl font-medium tracking-tight text-brand-charcoal">
            Keep <span className="italic text-brand-orange">reading</span>
          </h2>
          <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full cursor-pointer flex-col rounded-3xl border border-[#efe5d9] bg-white p-2.5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-transparent hover:text-inherit hover:shadow-[0_24px_48px_-16px_rgba(91,66,48,0.25)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#f8f3ec] to-[#efe5d8]">
                    <div
                      aria-hidden="true"
                      className={`absolute bg-center bg-no-repeat transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${
                        p.imageFit === "contain" ? "inset-5 bg-contain mix-blend-multiply" : "inset-0 bg-cover"
                      }`}
                      style={{ backgroundImage: `url(${p.image})` }}
                    />
                  </div>
                  <div className="px-3 pb-3 pt-5">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-orange">{p.category}</p>
                    <h3 className="mb-0 text-lg font-semibold leading-snug tracking-tight text-brand-charcoal transition-colors duration-300 group-hover:text-brand-orange">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
