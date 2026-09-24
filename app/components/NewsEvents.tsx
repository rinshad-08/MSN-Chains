import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, MapPin, Megaphone, Sparkles } from "lucide-react";
import { dateRange, monthDay, newsItems } from "../data/events";
import Reveal from "./Reveal";

export default function NewsEvents() {
  // The first event in the data file is the headline; the rest are listed beside it by date
  const featured = newsItems.find((n) => n.kind === "Event") ?? newsItems[0];
  const rest = newsItems.filter((n) => n.slug !== featured.slug).sort((a, b) => a.date.localeCompare(b.date));
  const fd = monthDay(featured.date);

  return (
    <section className="bg-white px-6 py-16 lg:px-8" aria-labelledby="news-events-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              What&apos;s Happening
            </span>
            <h2 id="news-events-heading" className="mb-0 text-3xl font-medium tracking-tight text-brand-charcoal sm:text-4xl">
              News &amp; <span className="italic text-brand-orange">events</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-gray-500">
            Launches, in-store events and updates from our boutique. Join us, we&apos;d love to see you.
          </p>
        </Reveal>

        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Featured event */}
          <Reveal>
            <Link
              href={featured.cta.href}
              className="group relative flex min-h-[21rem] cursor-pointer flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 text-white shadow-[0_30px_60px_-30px_rgba(42,31,24,0.6)] hover:text-white sm:p-7"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                style={{ backgroundImage: `url(${featured.image})` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f18] via-[#2a1f18]/70 to-[#2a1f18]/20" aria-hidden="true" />

              <div className="relative flex items-start justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md">
                  <Sparkles size={11} className="text-[#dfb76c]" aria-hidden="true" />
                  Featured event
                </span>
                <span className="flex flex-col items-center rounded-xl bg-white px-3 py-1.5 text-center text-[#2a1f18] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]">
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-brand-orange">{fd.month}</span>
                  <span className="font-display text-2xl font-semibold leading-none">{fd.day}</span>
                </span>
              </div>

              <div className="relative">
                <h3 className="mb-2 text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl">{featured.title}</h3>
                <p className="mb-4 line-clamp-2 max-w-md text-[13px] leading-relaxed text-[#e9dccb]/85">{featured.summary}</p>
                <ul className="mb-5 flex list-none flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-medium text-[#e9dccb]/90">
                  <li className="inline-flex items-center gap-1.5">
                    <CalendarDays size={13} className="text-[#dfb76c]" aria-hidden="true" />
                    {fd.weekday}, {dateRange(featured)}
                  </li>
                  {featured.time && (
                    <li className="inline-flex items-center gap-1.5">
                      <Clock size={13} className="text-[#dfb76c]" aria-hidden="true" />
                      {featured.time}
                    </li>
                  )}
                  {featured.location && (
                    <li className="inline-flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#dfb76c]" aria-hidden="true" />
                      {featured.location}
                    </li>
                  )}
                </ul>
                <span className="inline-flex items-center gap-2.5 rounded-full bg-[#dfb76c] py-1.5 pl-5 pr-1.5 text-[13px] font-semibold text-[#2a1f18] transition-colors duration-500 group-hover:bg-white">
                  {featured.cta.label}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2a1f18] text-white transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>

          {/* More news & events, grouped in one panel */}
          <Reveal delay={0.1} className="rounded-[1.75rem] border border-[#efe5d9] bg-[#fdf8f3] p-2">
            <p className="flex items-center justify-between px-4 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
              Coming up &amp; latest
              <span className="text-gray-300">{rest.length} items</span>
            </p>
            <ul className="list-none space-y-1.5">
              {rest.map((item) => {
                const d = monthDay(item.date);
                const isEvent = item.kind === "Event";
                return (
                  <li key={item.slug}>
                    <Link
                      href={item.cta.href}
                      className="group flex cursor-pointer items-center gap-4 rounded-[1.25rem] p-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white hover:text-inherit hover:shadow-[0_16px_36px_-20px_rgba(91,66,48,0.45)]"
                    >
                      {/* Date tile */}
                      <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-[#efe5d9] bg-white text-[#2a1f18] transition-colors duration-500 group-hover:border-transparent group-hover:bg-[#2a1f18] group-hover:text-white">
                        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-brand-orange transition-colors duration-500 group-hover:text-[#dfb76c]">
                          {d.month}
                        </span>
                        <span className="font-display text-xl font-semibold leading-none">{d.day}</span>
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`mb-1 inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[9px] font-bold uppercase tracking-[0.14em] ${
                            isEvent ? "bg-brand-orange/10 text-brand-orange" : "bg-brand-green/10 text-brand-green"
                          }`}
                        >
                          {isEvent ? <CalendarDays size={9} aria-hidden="true" /> : <Megaphone size={9} aria-hidden="true" />}
                          {item.kind}
                        </span>
                        <span className="block truncate text-[15px] font-semibold text-brand-charcoal transition-colors duration-500 group-hover:text-brand-orange">
                          {item.title}
                        </span>
                        <span className="block truncate text-xs text-gray-500">
                          {isEvent ? [dateRange(item), item.location].filter(Boolean).join(" · ") : item.summary}
                        </span>
                      </span>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e8dccd] text-brand-charcoal transition-all duration-500 group-hover:rotate-45 group-hover:border-[#2a1f18] group-hover:bg-[#2a1f18] group-hover:text-white">
                        <ArrowUpRight size={15} aria-hidden="true" />
                        <span className="sr-only">{item.cta.label}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
