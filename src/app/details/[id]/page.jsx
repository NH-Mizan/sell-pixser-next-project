// app/productDetails/[slug]/page.jsx
import ProductInfoTabs from '@/components/ProductInfoTabs';
import RelatedProducts from '@/components/RelatedProducts';


import Link from 'next/link';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export function generateMetadata({ params }) {

  return {
    title: `Product Details - ${params.id}`
   
  
  };
}

export default async function ProductDetailsPage({ params }) {
  const baseURL = 'https://sellpixer.websolutionit.com/';
  const { id } = params;
  
 

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/details/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div className="text-center py-20 text-red-600">Failed to fetch product</div>;
  }

  const data = await res.json();
  const product = data?.data;



  if (!product) {
    return <div className="text-center py-20 text-red-600">Product Not Found</div>;
  }

  const discount = product.old_price
    ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
    : 0;

  return (
    <section className="w-10/12 mx-auto my-10">
      <div className="w-full flex flex-col md:flex-row gap-6 p-4 bg-white shadow-md rounded-lg">
      {/* Left: Product Image Section */}
      <div className="w-full md:w-1/2">
        {product.images && product.images.length > 0 && (
          <img
            src={`${baseURL}${product.images[0].image}`}
            alt={product?.name}
            className="w-full h-auto rounded-lg object-cover"
          />
        )}
        {/* Optional thumbnails */}
        <div className="flex gap-2 mt-3">
          {product.images?.slice(0, 3).map((img, i) => (
            <img
              key={i}
              src={`${baseURL}${img.image}`}
              alt={`thumb-${i}`}
              className="w-20 h-20 border rounded-md object-cover cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>

        <div className="text-sm text-gray-600 mb-2">
          <span className="mr-2">Brand:</span>
          <span className="font-medium">{product?.brand?.name || "N/A"}</span>
        </div>

        <div className="mb-2">
          <strong>Size:</strong>
          <span className="ml-2 px-2 py-1 border rounded text-sm">
            {product?.variable?.size || "N/A"}
          </span>
        </div>

        <div className="mb-2">
          <strong>Color:</strong>
          <span className="ml-2 px-2 py-1 border rounded text-sm capitalize">
            {product?.variable?.color || "N/A"}
          </span>
        </div>

        <div className="mb-2">
          <strong>Status:</strong>
          {product?.variable?.stock === 0 ? (
            <span className="ml-2 text-red-500 font-semibold">Out of Stock</span>
          ) : (
            <span className="ml-2 text-green-600 font-semibold">In Stock</span>
          )}
        </div>

        {/* Price section */}
        <div className="my-4">
          <p className="text-xl font-bold text-pink-600">৳ {product?.new_price}</p>
          {product.old_price && (
            <p className="text-gray-500 line-through text-sm">৳ {product.old_price}</p>
          )}
          {discount > 0 && (
            <p className="text-sm text-green-600 font-semibold">{discount}% OFF</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className=" flex-wrap items-center gap-3 mt-4">
          <div className='flex gap-4 mb-2'>
            <button className="bg-pink-600 text-white px-4 lg:px-6 py-2 rounded hover:bg-pink-700 transition">Add To Cart</button>
          <button className="bg-sky-500 text-white px-4 lg:px-6 py-2 rounded hover:bg-sky-600 transition">Order Now</button></div>
          <Link href="tel:01846494272" className="flex w-[270px] lg:w-[275px]  justify-center text-center items-center bg-green-500 text-white  px-4 py-2 rounded hover:bg-green-600 transition">
            <FaWhatsapp className='mr-2 font-bold text-xl' /> 01846494272
          </Link>
        </div>

        {/* Delivery Charge */}
        <div className="mt-12">
          <div className="flex justify-between border-t pt-4 text-sm">
            <span>Delivery Charge</span>
            <span>ঢাকার ভিতরে ৭০ টাকা</span>
          </div>
          <div className="flex justify-between border-t mt-6 pt-4 text-sm">
            <span>Delivery Charge</span>
            <span>ঢাকার বাইরে ১২০ টাকা</span>
          </div>
        </div>
      </div>
    </div>

      {/* Tabs */}
      <div className="w-full mt-10">
        <ProductInfoTabs
          description={product?.description}
          review={product?.review}
          video={product?.video}
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