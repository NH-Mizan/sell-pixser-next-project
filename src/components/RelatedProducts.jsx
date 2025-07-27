import ProductCard from "./Home/ProductCard";


export default async function RelatedProducts({ currentProductId }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/related-product/${currentProductId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div className="text-center py-20 text-red-600">Failed to fetch product</div>;
  }

  const data = await res.json();
  const products = data?.data.slice(0,10); // ✅ Use full array

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          baseURL="https://sellpixer.websolutionit.com/"/>
      ))}
    </div>
  );
}
