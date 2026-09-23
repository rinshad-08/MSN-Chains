import HeroCarousel from "./components/HeroCarousel";
import ShopByCategories from "./components/ShopByCategories";
import LatestIntroductions from "./components/LatestIntroductions";
import FeaturedCollection from "./components/FeaturedCollection";

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <ShopByCategories />

      <LatestIntroductions />

      <FeaturedCollection />
    </>
  );
}
