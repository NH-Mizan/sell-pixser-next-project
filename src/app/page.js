import Brands from "@/components/Home/Brands";
import HomeProducts from "@/components/Home/homeproducts";
import OfferBanner from "@/components/Home/offerbanner";
import PopularProducts from "@/components/Home/popularproducts";
import Slider from "@/components/Home/slider";
import TopCategories from "@/components/Home/topcategories";

export default function page() {
  return (
    <div className="">
      <Slider/>
      <TopCategories/>
      <PopularProducts/>
      <OfferBanner/>
      <HomeProducts/>
      <Brands/>
    </div>
  );
}