'use client';
import React, { useEffect, useState } from 'react';

const baseURL = 'https://sellpixer.websolutionit.com/';

export default function AllCategoryProducts() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/homepage-product`)
      .then(res => res.json())
      .then(data => {
        if (data?.data?.length > 0) {
          setCategories(data.data); // সব ক্যাটাগরি
        }
      });
  }, []);

  if (categories.length === 0) return <p className="text-center py-10 text-gray-500">Loading...</p>;

  return (
    <section className="py-10 px-4 space-y-12">
      {categories.map((category) => (
        <div key={category.id}>
          {/* Category Name */}
          <h2 className="text-2xl font-bold mb-6">{category.name}</h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.products?.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
              >
                <img
                  src={`${baseURL}${product.image?.image}`}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">
                    {product.name.length > 50 ? product.name.slice(0, 50) + '...' : product.name}
                  </h3>
                  <div className="text-sm text-gray-500 mb-1">
                    Size: {product.variable?.size || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Color: {product.variable?.color || 'N/A'}
                  </div>
                  <div className="text-red-600 font-bold text-base">
                    ৳{product.new_price}
                    {product.old_price && (
                      <span className="ml-2 text-gray-400 line-through">৳{product.old_price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
