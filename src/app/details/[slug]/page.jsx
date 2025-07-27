// app/productDetails/[slug]/page.jsx
import ProductInfoTabs from '@/components/ProductInfoTabs';
import RelatedProducts from '@/components/RelatedProducts';

import React from 'react';

export function generateMetadata({ params }) {
  return {
    title: `Product Details - ${params.slug}`,
  };
}

export default async function ProductDetailsPage({ params }) {
  const baseURL = 'https://sellpixer.websolutionit.com/';
  const { slug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/details/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div className="text-center py-20 text-red-600">Failed to fetch product</div>;
  }

  const data = await res.json();
  const product = data?.data?.[0];


  if (!product) {
    return <div className="text-center py-20 text-red-600">Product Not Found</div>;
  }

  const discount = product.old_price
    ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
    : 0;

  return (
    <section className="w-10/12 mx-auto my-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          {product.images && product.images.length > 0 && (
            <img
              src={`${baseURL}${product.images[0].image}`}
             
              alt={product?.name}
              className="rounded-lg object-cover"
            />
          )}
        </div>

        {/* Right Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="mb-1"><strong>Category ID:</strong> {product?.category_id}</p>
          <p className="mb-1"><strong>Subcategory ID:</strong> {product?.subcategory_id}</p>
          <p className="mb-1"><strong>Stock:</strong> {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>

          <p className="text-xl font-bold text-pink-600 mb-1">৳ {product?.new_price}</p>
          {product.old_price && (
            <p className="text-gray-500 line-through mb-1">৳ {product.old_price}</p>
          )}
          {discount > 0 && (
            <p className="text-green-600 font-semibold mb-3">{discount}% OFF</p>
          )}

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-pink-600 text-white rounded">Buy Now</button>
            <button className="px-4 py-2 bg-gray-200 text-black rounded">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full mt-10">
        <ProductInfoTabs
          description={product?.description}
          ingredients={product?.ingredients}
          howToUse={product?.howToUse}
        />
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <RelatedProducts currentProductId={product?.id} />
      </div>
    </section>
  );
}