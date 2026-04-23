import ProductCard from "@/components/Home/ProductCard";
import { ASSET_BASE_URL, getHotDealProducts } from "@/lib/api";

export const revalidate = 300;

export default async function ProductsPage() {
  const products = await getHotDealProducts();

  return (
    <section className="container my-10">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} baseURL={`${ASSET_BASE_URL}/`} />
        ))}
      </div>
    </section>
  );
}
