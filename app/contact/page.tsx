import type { Metadata } from "next";
import { ArrowUpRight, CalendarCheck, Clock, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import ContactForm from "../components/ContactForm";
import FaqAccordion from "../components/FaqAccordion";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "Contact Us | MSN CHAINS",
  description: "Book a private consultation, visit our boutique or send an enquiry about a piece. Our jewellers reply within one business day."
};

const ADDRESS = "Kozhikode, Kerala, India";
// Exact boutique location (from the Google Maps link); drives the map embed and direction links
const COORDS = "11.2488425,75.783921";
const MAP_QUERY = encodeURIComponent(COORDS);

const QUICK_CONTACT = [
  { icon: Phone, label: "Call us", value: "+1 (555) 123-4567", href: "tel:+15551234567", note: "Mon–Sat, during opening hours" },
  { icon: Mail, label: "Email us", value: "info@msnchains.com", href: "mailto:info@msnchains.com", note: "Reply within one business day" },
  { icon: MapPin, label: "Visit us", value: "Kozhikode", href: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`, note: "Kerala, India" }
];

const HOURS = [
  { day: "Monday – Friday", time: "10:00 AM – 7:00 PM" },
  { day: "Saturday", time: "11:00 AM – 5:00 PM" },
  { day: "Sunday", time: "By appointment" }
];

const FAQS = [
  {
    q: "Do I need an appointment to visit?",
    a: "Walk-ins are welcome during opening hours. For private viewings, bespoke design consultations or Sunday visits, please book ahead so a jeweller can dedicate time to you."
  },
  {
    q: "Can I get a consultation online?",
    a: "Yes. We offer video consultations for custom designs and product enquiries. Choose \"Book a store visit\" or \"Custom design\" in the form and mention that you'd prefer a video call."
  },
  {
    q: "How quickly will you reply?",
    a: "We reply to every enquiry within one business day, usually much sooner. For urgent questions, please call us during opening hours."
  },
  {
    q: "Do you ship outside the city?",
    a: "We deliver nationwide with fully insured, signature-on-delivery shipping. Contact us about international orders and we'll arrange the best option."
  }
];

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#fdf8f3] px-6 pb-16 pt-12 lg:px-8 lg:pt-16">
        <div className="pointer-events-none absolute -left-40 -top-10 h-[26rem] w-[26rem] rounded-full bg-[#f3e3cf]/80 blur-[120px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-brand-orange/10 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#eadfd2] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-orange backdrop-blur-md">
              <Sparkles size={12} aria-hidden="true" />
              Contact Us
            </span>
            <h1 className="mb-5 text-5xl font-medium leading-[1.05] tracking-tight text-brand-charcoal sm:text-6xl">
              Let&apos;s create something <span className="italic text-brand-orange">beautiful</span>
            </h1>
            <p className="text-base leading-relaxed text-gray-600">
              Book a private consultation, ask about a piece or simply say hello. Our jewellers would love to hear from you.
            </p>
          </Reveal>

          <ul className="mx-auto grid max-w-5xl list-none gap-3 md:grid-cols-3">
            {QUICK_CONTACT.map(({ icon: Icon, label, value, href, note }, i) => (
              <li key={label}>
                <Reveal delay={i * 0.08} className="h-full">
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex h-full cursor-pointer items-center gap-3 rounded-2xl border border-[#efe5d9] bg-white px-4 py-3.5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#2a1f18] hover:bg-[#2a1f18] hover:text-inherit hover:shadow-[0_24px_48px_-20px_rgba(42,31,24,0.55)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f6e6cf] to-[#e8cfa9] text-[#5b4230] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:from-[#dfb76c] group-hover:to-[#c5a059] group-hover:text-[#2a1f18]">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400 transition-colors duration-700 group-hover:text-[#dfb76c]">
                        {label}
                      </span>
                      <span className="block truncate text-sm font-semibold text-brand-charcoal transition-colors duration-700 group-hover:text-white">
                        {value}
                      </span>
                      <span className="block text-[11px] text-gray-500 transition-colors duration-700 group-hover:text-[#e9dccb]/70">{note}</span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-gray-300 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#dfb76c]"
                      aria-hidden="true"
                    />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form + boutique */}
      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="rounded-[2rem] border border-[#efe5d9] bg-white p-7 shadow-[0_30px_60px_-40px_rgba(91,66,48,0.45)] sm:p-10">
            <span className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              Send an Enquiry
            </span>
            <h2 className="mb-2 text-3xl font-medium tracking-tight text-brand-charcoal sm:text-4xl">
              Tell us about your <span className="italic text-brand-orange">piece</span>
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-gray-500">Share a few details and a jeweller will get back to you personally.</p>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            {/* Boutique photo card */}
            <div className="group relative overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(91,66,48,0.5)]">
              <div
                role="img"
                aria-label="Diamond jewellery displayed in the MSN CHAINS boutique"
                className="aspect-[4/3] bg-cover bg-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                style={{ backgroundImage: "url(/images/about/necklace-set.jpg)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f18]/80 via-[#2a1f18]/10 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="mb-1 font-display text-2xl text-white">Visit our boutique</p>
                <p className="mb-4 text-sm text-[#e9dccb]/80">Private viewings available by appointment.</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#2a1f18] backdrop-blur-md transition-colors duration-300 hover:bg-[#dfb76c] hover:text-[#2a1f18]"
                >
                  <MapPin size={13} aria-hidden="true" />
                  Get directions
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="rounded-[2rem] bg-[#2a1f18] p-7 text-white">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#dfb76c]/30 to-white/5 text-[#dfb76c]">
                  <Clock size={18} aria-hidden="true" />
                </span>
                <h3 className="mb-0 text-xl font-medium tracking-tight text-white">Opening hours</h3>
              </div>
              <dl className="space-y-3">
                {HOURS.map((h) => (
                  <div key={h.day} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm last:border-0 last:pb-0">
                    <dt className="text-[#e9dccb]/70">{h.day}</dt>
                    <dd className="font-semibold text-white">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#cf-name"
                className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#dfb76c] hover:text-white"
              >
                <CalendarCheck size={16} aria-hidden="true" />
                Book a private viewing
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white px-6 pb-20 lg:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div data-lenis-prevent className="relative overflow-hidden rounded-[2rem] border border-[#efe5d9] shadow-[0_30px_60px_-40px_rgba(91,66,48,0.45)]">
            <iframe
              title="Map showing the MSN CHAINS boutique"
              src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`}
              className="block h-[22rem] w-full border-0 [filter:grayscale(0.6)_sepia(0.25)_contrast(0.95)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute left-5 top-5 flex items-center gap-3 rounded-2xl bg-white/90 p-3 pr-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2a1f18] text-[#dfb76c]">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-charcoal">MSN CHAINS Boutique</p>
                <p className="text-xs text-gray-500">{ADDRESS}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-[#fdf8f3] px-6 py-24 lg:px-8" aria-labelledby="contact-faq-heading">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <span className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-orange">
              <span className="h-px w-8 bg-brand-orange" aria-hidden="true" />
              Before You Visit
            </span>
            <h2 id="contact-faq-heading" className="mb-5 text-4xl font-medium tracking-tight text-brand-charcoal sm:text-5xl">
              Common <span className="italic text-brand-orange">questions</span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">Everything you need to know about visits, consultations and delivery.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion faqs={FAQS} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
