'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

const baseURL = 'https://sellpixer.websolutionit.com/';
const allowedSlugs = ['mens-fashion', 'womens-fashion', 'cosmetics', 'gadgets', 'grocery', 'home-lifestyle'];

export default function CategoryWiseProducts() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      AOS.init();
    }, []);

  useEffect(() => {
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/homepage-product`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.data.filter(cat => allowedSlugs.includes(cat.slug));
        setCategories(filtered);
      });
  }, []);

  return (
    <section className="w-10/12 mx-auto py-10 space-y-16">
      {categories.map(category => (
        <div key={category.id}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{category.name}</h2>
            <Link href={`/category/${category.slug}`} className="text-blue-600 hover:underline">
              View All →
            </Link>
          </div>

          {/* Grid 5×2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {category.products?.slice(0, 10).map(product => {
              const discount = product.old_price
                ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                 data-aos="zoom-in"
                 data-aos-duration="500"
                  className="relative border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  {/* Discount Badge */}
                  {discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                      SAVE {discount}%
                    </span>
                  )}

                  {/* Product Image */}
                  <Link href={`/product/${product.slug}`}>
                    <img
                      src={`${baseURL}${product.image?.image}`}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="p-4 space-y-2">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="text-sm font-semibold hover:text-blue-600 transition">
                        {product.name.length > 50 ? product.name.slice(0, 50) + '...' : product.name}
                      </h3>
                    </Link>

                    {/* Price Section */}
                    <div className="text-red-600 font-bold text-base">
                      ৳{product.new_price}
                      {product.old_price && (
                        <span className="ml-2 text-gray-400 line-through">৳{product.old_price}</span>
                      )}
                    </div>

                    {/* Add to Cart */}
                    <button className="w-full mt-2 bg-pink-600 hover:bg-pink-700 text-white text-sm py-2 rounded flex items-center justify-center gap-1">
                      🛒 Order Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
