// Journal articles shared by the blog index and the article pages.
// Body blocks: plain strings are paragraphs; { h } is a subheading.

export type PostBlock = string | { h: string };

export type Post = {
  slug: string;
  title: string;
  category: "Guides" | "Care" | "Heritage" | "Trends";
  date: string; // ISO date
  readTime: number; // minutes
  excerpt: string;
  image: string;
  // "contain" shows the whole piece on a warm tile (for tall studio shots on white)
  imageFit?: "cover" | "contain";
  body: PostBlock[];
};

const allPosts: Post[] = [
  {
    slug: "white-gold-vs-platinum",
    title: "White Gold vs Platinum: Making the Choice",
    category: "Guides",
    date: "2026-09-18",
    readTime: 5,
    excerpt: "Understanding the differences in durability, maintenance and appearance between these two premium white metals.",
    image: "/images/blog/featured-story.jpg",
    body: [
      "White gold and platinum look similar at first glance, yet they behave very differently over years of wear. Here's how to choose the right one for you.",
      { h: "Appearance" },
      "White gold is an alloy of yellow gold and white metals, finished with a bright rhodium plating. Platinum is naturally white and develops a soft, satin patina over time that many people love.",
      { h: "Durability" },
      "Platinum is denser and more resistant to wear, making it ideal for settings that hold precious stones. White gold is harder to scratch but loses a tiny amount of metal with wear, so its rhodium finish needs refreshing every year or two.",
      { h: "Price and weight" },
      "Platinum is heavier and generally more expensive for the same design. White gold offers the same bright look at a more accessible price.",
      "Still unsure? Visit our store to try both side by side and our jewellers will help you decide."
    ]
  },
  {
    slug: "history-of-the-miami-cuban-link",
    title: "The History of the Miami Cuban Link",
    category: "Heritage",
    date: "2026-08-21",
    readTime: 6,
    excerpt:
      "Explore the origins of one of the most iconic chain styles in modern jewellery and why it remains a staple of luxury today.",
    image: "/images/blog/gold-heritage.jpg",
    body: [
      "Few chains are as instantly recognisable as the Miami Cuban link. Its thick, interlocking oval links lie flat against the skin, creating a bold yet surprisingly comfortable piece that has become a symbol of confidence and success.",
      { h: "Born in Miami" },
      "The style emerged in Miami in the late 1970s, where local jewellers refined the traditional curb chain by tightening the links and rounding their edges. The result was a denser, heavier chain with a smooth, rope-like feel that caught the light from every angle.",
      { h: "From the streets to the runway" },
      "Through the 1980s and 1990s the Cuban link became closely tied to music and street culture, worn as a statement of achievement. Today it appears everywhere from red carpets to luxury runways, and in finer, more delicate widths for everyday wear.",
      { h: "What makes a quality Cuban link" },
      "A well-made Cuban link should feel solid, never hollow, with links that are tightly and evenly interlocked. Look for a secure box clasp with a safety latch, a consistent polish across every link and a hallmark confirming the purity of the gold.",
      "At MSN CHAINS, every Cuban link is assembled and finished by hand, with each joint soldered for strength so the chain can be worn, and passed down, for decades."
    ]
  },
  {
    slug: "how-to-care-for-solid-gold-chains",
    title: "How to Care for Solid Gold Chains",
    category: "Care",
    date: "2026-09-04",
    readTime: 4,
    excerpt: "Expert tips on cleaning, storing and maintaining the lustre of your solid gold chains so they shine for generations.",
    image: "/images/blog/gold-care.jpg",
    body: [
      "Solid gold is one of the most durable materials in fine jewellery, but a little regular care keeps it looking its absolute best.",
      { h: "Clean gently, clean often" },
      "Soak your chain for 10 minutes in warm water with a few drops of mild dish soap. Use a soft baby toothbrush to gently clean between the links, rinse in clean water and pat dry with a lint-free cloth.",
      { h: "Store chains separately" },
      "Gold is soft and can scratch against harder gemstones or other metals. Store each chain on its own in a soft pouch or a lined jewellery box, and fasten the clasp to prevent tangles.",
      { h: "Know when to take it off" },
      "Remove your chain before swimming, exercising or using household cleaners. Chlorine and harsh chemicals can dull the finish and weaken solder joints over time.",
      { h: "Book a professional check-up" },
      "Once a year, bring your jewellery in for a free inspection and ultrasonic clean. We'll check the clasp and joints and restore the original shine."
    ]
  },
  {
    slug: "choosing-the-perfect-engagement-ring",
    title: "Choosing the Perfect Engagement Ring",
    category: "Guides",
    date: "2026-08-07",
    readTime: 7,
    excerpt: "From the 4Cs to setting styles, everything you need to know before choosing a ring they'll treasure forever.",
    image: "/images/latest/new-arrivals.jpg",
    body: [
      "An engagement ring is one of the most meaningful pieces of jewellery you'll ever buy. A little knowledge goes a long way towards finding the one.",
      { h: "Understand the 4Cs" },
      "Cut, colour, clarity and carat weight together determine a diamond's beauty and value. Of the four, cut has the biggest impact on sparkle, so prioritise an excellent cut over sheer size.",
      { h: "Pick a setting that suits their lifestyle" },
      "A classic prong setting lets in the most light, while a bezel setting protects the stone and suits an active lifestyle. Halo and pavé designs add extra sparkle around the centre stone.",
      { h: "Get the size right" },
      "Borrow a ring they already wear on the right finger, or bring it to us for sizing. Every MSN CHAINS engagement ring includes one free resize."
    ]
  },
  {
    slug: "the-art-of-temple-jewellery",
    title: "The Art of Traditional Temple Jewellery",
    category: "Heritage",
    date: "2026-07-24",
    readTime: 6,
    excerpt: "Discover the centuries-old craft behind temple jewellery and the artisans keeping its intricate techniques alive.",
    image: "/images/about/bangles.jpg",
    body: [
      "Temple jewellery traces its roots to the adornments once offered to deities in South Indian temples. Rich in symbolism and detail, it remains a treasured part of weddings and festivals today.",
      { h: "Motifs with meaning" },
      "Designs often feature lotus flowers, peacocks and depictions of gods and goddesses, each carrying its own blessing. Rubies and emeralds are set to bring colour and auspicious energy to the gold.",
      { h: "Handcrafted, piece by piece" },
      "Our artisans use traditional techniques such as repoussé and granulation, shaping each motif by hand. A single bangle can take several days to complete.",
      "Every piece is a small work of art, made to be worn at life's most important celebrations and passed down with its story."
    ]
  },
  {
    slug: "layering-necklaces-like-a-stylist",
    title: "How to Layer Necklaces Like a Stylist",
    category: "Trends",
    date: "2026-07-10",
    readTime: 3,
    excerpt: "Simple rules for mixing lengths, textures and pendants to create an effortless, polished layered look.",
    image: "/images/latest/majestic-pendant.jpg",
    body: [
      "Layered necklaces add instant polish to any outfit. The secret is balance: mix enough variety to be interesting, while keeping a common thread.",
      { h: "Vary the lengths" },
      "Start with a short 16-inch chain, then add pieces at 18 and 20 inches. Leaving about 2 inches between layers keeps them from tangling and lets each one shine.",
      { h: "Mix textures, not too many metals" },
      "Combine a fine cable chain with a rope or Cuban link for contrast. Sticking to one or two metal tones keeps the look cohesive.",
      { h: "Let one piece lead" },
      "Choose a single statement pendant as the focal point and keep the other layers simple around it."
    ]
  }
];

// Newest first; the first post is the Journal's featured story
export const posts = [...allPosts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
