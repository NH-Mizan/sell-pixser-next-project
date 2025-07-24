import HomeProducts from "@/components/Home/homeproducts";
import ProductCard from "@/components/Home/offerbanner";
import PopularProducts from "@/components/Home/popularproducts";
import Slider from "@/components/Home/slider";
import TopCategories from "@/components/Home/topcategories";

export default function page() {
  return (
    <div className="">
      <Slider/>
      <TopCategories/>
      <PopularProducts/>
      <ProductCard/>
      <HomeProducts/>
    </div>
  );
}