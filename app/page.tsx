import HeroCarousel from "./components/HeroCarousel";
import ShopByCategories from "./components/ShopByCategories";
import LatestIntroductions from "./components/LatestIntroductions";
import FeaturedCollection from "./components/FeaturedCollection";
import JournalShowcase from "./components/JournalShowcase";
import NewsEvents from "./components/NewsEvents";
import ContactCta from "./components/ContactCta";

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <ShopByCategories />

      <LatestIntroductions />

      <FeaturedCollection />

      <NewsEvents />

      <JournalShowcase />

      <ContactCta />
    </>
  );
}
