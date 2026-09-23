import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronRight, Gem, RefreshCw, ShieldCheck, Tag, Truck } from "lucide-react";
import { discountOf, getProduct, inr, products } from "../../data/products";

const ASSURANCES = [
  { icon: ShieldCheck, label: "BIS Hallmarked" },
  { icon: Gem, label: "Certified Diamonds" },
  { icon: RefreshCw, label: "Lifetime Exchange" },
  { icon: Truck, label: "Free Insured Shipping" }
];

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: `${product.name} | MSN CHAINS`, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const discount = discountOf(product);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="bg-[#fdf8f3] px-6 pb-20 pt-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex list-none flex-wrap items-center gap-1.5 text-xs font-medium text-gray-500">
            <li className="flex items-center gap-1.5">
              <Link href="/" className="cursor-pointer hover:text-brand-orange">Home</Link>
              <ChevronRight size={12} aria-hidden="true" />
            </li>
            <li className="flex items-center gap-1.5">
              <Link href="/#latest-heading" className="cursor-pointer hover:text-brand-orange">{product.category}</Link>
              <ChevronRight size={12} aria-hidden="true" />
            </li>
            <li aria-current="page" className="truncate text-brand-charcoal">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-[#efe5d9] bg-gradient-to-br from-[#f8f3ec] to-[#efe5d8] shadow-[0_24px_48px_-24px_rgba(91,66,48,0.3)]">
            <div
              role="img"
              aria-label={product.name}
              className="absolute inset-0 bg-cover bg-center mix-blend-multiply"
              style={{ backgroundImage: `url(${product.image})` }}
            />
            <span className="absolute left-5 top-5 rounded-full bg-[#2a1f18] px-3 py-1.5 text-xs font-bold tracking-wide text-white">
              -{discount}%
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              {product.category}
            </span>
            <h1 className="mb-5 text-4xl font-medium leading-tight tracking-tight text-brand-charcoal sm:text-5xl">
              {product.name}
            </h1>

            <div className="mb-1 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold tracking-tight text-brand-charcoal">{inr.format(product.price)}</span>
              <span className="text-lg text-gray-400 line-through">{inr.format(product.mrp)}</span>
              <span className="rounded-full bg-brand-orange/10 px-2.5 py-1 text-xs font-bold text-brand-orange">
                Save {inr.format(product.mrp - product.price)}
              </span>
            </div>
            <p className="mb-5 text-xs text-gray-500">Inclusive of all taxes</p>

            <span className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-green/10 px-3 py-1.5 text-xs font-semibold text-brand-green">
              <Tag size={13} aria-hidden="true" />
              {product.offer}
            </span>

            <p className="mb-8 max-w-prose text-[15px] leading-relaxed text-gray-600">{product.description}</p>

            {/* Specs */}
            <dl className="mb-8 grid grid-cols-2 gap-3">
              {product.specs.map((spec) => (
                <div key={spec.label} className="rounded-2xl border border-[#efe5d9] bg-white px-4 py-3">
                  <dt className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">{spec.label}</dt>
                  <dd className="text-sm font-semibold text-brand-charcoal">{spec.value}</dd>
                </div>
              ))}
            </dl>

            {/* Actions */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/contact?enquiry=${encodeURIComponent(product.name)}`}
                className="group inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#2a1f18] px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-orange hover:text-white"
              >
                Enquire Now
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-full border border-[#2a1f18] px-7 py-4 text-sm font-semibold text-[#2a1f18] transition-colors duration-300 hover:bg-[#2a1f18] hover:text-white"
              >
                Book a Store Visit
              </Link>
            </div>

            {/* Assurances */}
            <ul className="grid list-none grid-cols-2 gap-4 border-t border-[#eadfd2] pt-6 sm:grid-cols-4">
              {ASSURANCES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-2 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-orange shadow-sm">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-semibold leading-tight text-gray-600">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related */}
        <section className="mt-20" aria-labelledby="related-heading">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 id="related-heading" className="mb-0 text-3xl font-medium tracking-tight text-brand-charcoal">
              You may also <span className="italic text-brand-orange">like</span>
            </h2>
            <Link href="/#latest-heading" className="group hidden cursor-pointer items-center gap-1.5 text-sm font-semibold text-brand-charcoal hover:text-brand-orange sm:flex">
              View all
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid list-none grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group block cursor-pointer rounded-3xl border border-[#efe5d9] bg-white p-2.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-transparent hover:text-inherit hover:shadow-[0_24px_48px_-16px_rgba(91,66,48,0.25)]"
                >
                  <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#f7f3ef] to-[#efe8e0]">
                    <div
                      role="img"
                      aria-label={p.name}
                      className="absolute inset-0 bg-cover bg-center mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      style={{ backgroundImage: `url(${p.image})` }}
                    />
                  </div>
                  <div className="px-2 pb-2">
                    <p className="mb-1 truncate text-sm font-medium text-brand-charcoal transition-colors group-hover:text-brand-orange">{p.name}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold tracking-tight text-brand-charcoal">{inr.format(p.price)}</span>
                      <span className="text-xs text-gray-400 line-through">{inr.format(p.mrp)}</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
