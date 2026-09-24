// News and in-store events shown on the landing page. Sample content: replace with real dates and details.

export type NewsItem = {
  slug: string;
  kind: "Event" | "News";
  title: string;
  date: string; // ISO start date
  endDate?: string; // ISO, for multi-day events
  time?: string;
  location?: string;
  summary: string;
  image: string;
  cta: { label: string; href: string };
};

const rsvp = (title: string) => `/contact?enquiry=${encodeURIComponent(`RSVP: ${title}`)}`;

export const newsItems: NewsItem[] = [
  {
    slug: "festive-collection-launch",
    kind: "Event",
    title: "Festive Collection Launch",
    date: "2026-10-17",
    time: "11:00 AM – 7:00 PM",
    location: "MSN CHAINS Boutique, Kozhikode",
    summary:
      "Be the first to see our new festive collection of temple jewellery, bangles and diamond sets, with live styling sessions and launch-day offers.",
    image: "/images/about/bangles.jpg",
    cta: { label: "Reserve your spot", href: rsvp("Festive Collection Launch") }
  },
  {
    slug: "gold-exchange-week",
    kind: "Event",
    title: "Gold Exchange Week",
    date: "2026-10-05",
    endDate: "2026-10-11",
    location: "In store",
    summary: "Bring your old gold for a free purity check and exchange it at today's rate towards any new piece.",
    image: "/images/featured/rope-chain.jpg",
    cta: { label: "Book a slot", href: rsvp("Gold Exchange Week") }
  },
  {
    slug: "bridal-showcase",
    kind: "Event",
    title: "Bridal Jewellery Showcase",
    date: "2026-11-14",
    time: "By appointment",
    location: "Private viewing room",
    summary: "A private preview of our bridal sets, with one-on-one consultations for your wedding look.",
    image: "/images/about/necklace-set.jpg",
    cta: { label: "Request an invite", href: rsvp("Bridal Jewellery Showcase") }
  },
  {
    slug: "video-consultations",
    kind: "News",
    title: "Video consultations now available",
    date: "2026-09-10",
    summary: "Design your custom piece with our jewellers from home. Book a video call for custom designs and product enquiries.",
    image: "/images/latest/new-arrivals.jpg",
    cta: { label: "Book a call", href: "/contact?enquiry=Video%20consultation" }
  }
];

export const monthDay = (iso: string) => {
  const d = new Date(`${iso}T00:00:00Z`);
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit", timeZone: "UTC" }),
    // Fixed three-letter months ("Sep", not the locale's "Sept")
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getUTCMonth()],
    weekday: d.toLocaleDateString("en-GB", { weekday: "long", timeZone: "UTC" })
  };
};

export const dateRange = (item: NewsItem) => {
  const fmt = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", timeZone: "UTC" });
  return item.endDate ? `${fmt(item.date)} – ${fmt(item.endDate)}` : fmt(item.date);
};
