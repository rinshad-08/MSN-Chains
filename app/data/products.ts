// Sample catalogue shared by the Latest Introductions row and the product detail pages.
// Photos live in public/images/latest/ (attribution in CREDITS.md there).

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  offer: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: "radiant-14kt-diamond-ring",
    name: "Radiant 14Kt Diamond Ring",
    category: "Rings",
    price: 44968,
    mrp: 60036,
    offer: "Flat 20% Off Diamond Value",
    image: "/images/latest/radiant-ring.jpg",
    description:
      "A brilliant round centre stone framed by a twisting halo of pavé diamonds. The Radiant ring catches light from every angle, made for proposals and everyday sparkle alike.",
    specs: [
      { label: "Metal", value: "14Kt White Gold" },
      { label: "Diamond", value: "0.52 ct, SI-IJ" },
      { label: "Gross Weight", value: "3.24 g" },
      { label: "Ring Size", value: "Customisable" }
    ]
  },
  {
    slug: "shine-14kt-diamond-ring",
    name: "Shine 14Kt Diamond Ring",
    category: "Rings",
    price: 51006,
    mrp: 56510,
    offer: "Flat 20% Off Diamond Value",
    image: "/images/latest/shine-ring.jpg",
    description:
      "A timeless six-prong solitaire on a softly tapered yellow gold band. Clean, classic and designed to let the diamond do the talking.",
    specs: [
      { label: "Metal", value: "14Kt Yellow Gold" },
      { label: "Diamond", value: "0.60 ct, VS-GH" },
      { label: "Gross Weight", value: "2.98 g" },
      { label: "Ring Size", value: "Customisable" }
    ]
  },
  {
    slug: "majestic-mahalakshmi-pendant",
    name: "14KT Majestic Mahalakshmi Pendant",
    category: "Pendants",
    price: 25143,
    mrp: 30190,
    offer: "Flat 100% Off Making",
    image: "/images/latest/majestic-pendant.jpg",
    description:
      "Flowing gold ribbons swirl around a single sparkling diamond in this graceful pendant. Light enough for daily wear, special enough for festive occasions.",
    specs: [
      { label: "Metal", value: "14Kt Yellow Gold" },
      { label: "Diamond", value: "0.18 ct, SI-IJ" },
      { label: "Gross Weight", value: "2.10 g" },
      { label: "Chain", value: "Sold separately" }
    ]
  },
  {
    slug: "delicate-beauty-diamond-earrings",
    name: "Delicate Beauty 14Kt Diamond Earrings",
    category: "Earrings",
    price: 35506,
    mrp: 42743,
    offer: "Flat 30% Off Diamond Value",
    image: "/images/latest/delicate-earrings.jpg",
    description:
      "Minimal drop earrings with polished gold spheres on fine hooks. A refined everyday pair that moves beautifully with you.",
    specs: [
      { label: "Metal", value: "14Kt Rose Gold" },
      { label: "Diamond", value: "0.24 ct, SI-IJ" },
      { label: "Gross Weight", value: "2.46 g" },
      { label: "Closure", value: "Fish hook" }
    ]
  },
  {
    slug: "graceful-diamond-bracelet",
    name: "Graceful 14Kt Diamond Bracelet",
    category: "Bracelets",
    price: 75149,
    mrp: 83016,
    offer: "Flat 20% Off Diamond Value",
    image: "/images/latest/graceful-bracelet.jpg",
    description:
      "A continuous line of hand-set diamonds in a flexible tennis setting. Secure box clasp with a safety latch for worry-free wear.",
    specs: [
      { label: "Metal", value: "14Kt White Gold" },
      { label: "Diamond", value: "1.10 ct, SI-GH" },
      { label: "Gross Weight", value: "7.80 g" },
      { label: "Length", value: "7 inches" }
    ]
  },
  {
    slug: "blossom-18kt-gold-necklace",
    name: "Blossom 18Kt Gold Necklace",
    category: "Necklaces",
    price: 98450,
    mrp: 112300,
    offer: "Flat 15% Off Making",
    image: "/images/latest/blossom-necklace.jpg",
    description:
      "Delicate gold drops cascade from a fine chain, inspired by blossoms in bloom. A statement piece with a light, airy feel.",
    specs: [
      { label: "Metal", value: "18Kt Yellow Gold" },
      { label: "Purity", value: "750 Hallmarked" },
      { label: "Gross Weight", value: "14.20 g" },
      { label: "Length", value: "16 inches" }
    ]
  },
  {
    slug: "eternal-diamond-mangalsutra",
    name: "Eternal 18Kt Diamond Mangalsutra",
    category: "Mangalsutra",
    price: 62780,
    mrp: 71250,
    offer: "Flat 20% Off Diamond Value",
    image: "/images/3rd_120_x_150_Pix_Mangalsutra.jpg",
    description:
      "Traditional black beads meet a modern trio of diamond-studded motifs. A contemporary mangalsutra to celebrate a lifetime together.",
    specs: [
      { label: "Metal", value: "18Kt Yellow Gold" },
      { label: "Diamond", value: "0.32 ct, SI-IJ" },
      { label: "Gross Weight", value: "6.40 g" },
      { label: "Length", value: "18 inches" }
    ]
  }
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const discountOf = (p: Product) => Math.round((1 - p.price / p.mrp) * 100);

export const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
