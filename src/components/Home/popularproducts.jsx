"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PopularProducts() {
  const [products, setProducts] = useState([]);
    const baseURL = 'https://sellpixer.websolutionit.com/';

  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hotdeal-product`);
        const data = await res.json();
        if (data?.data) {
          setProducts(data.data.slice(0, 20));
        }
      } catch (error) {
        console.error('Slider fetch error:', error);
      }
    };

    fetchproduct();
  }, []);

 

  return (
    <section className="w-10/12 mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        <span className="text-pink-500 italic block text-base"> Shop Bangladesh</span>
        Popular Product
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
  {products.map((product) => (
    <Link
      key={product.id}
      href={`/product/${product.slug}`}
      className="group border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative bg-white block"
      data-aos="zoom-in"
      data-aos-duration="500"
    >
      {/* Discount Badge */}
      {product.new_price && product.old_price && (
        <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded z-10">
          SAVE {Math.round((product.old_price - product.new_price) * 100 / product.old_price)}%
        </div>
      )}

      {/* Wishlist Icon */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-pink-500 z-10 text-lg"
        onClick={(e) => e.preventDefault()} // prevent Link trigger
      >
        <FaHeart />
      </button>

      {/* Product Image with zoom on hover */}
      <div className="overflow-hidden bg-white">
        <img
          src={`${baseURL}${product.image.image}`}
          alt={product.title}
          className="w-full h-[200px] object-contain p-4 transform group-hover:scale-105 transition duration-300 ease-in-out"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-800 leading-5 mb-1">
          {product.name.length > 50 ? `${product.name.slice(0, 50)}...` : product.name}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-pink-600 font-bold text-lg">৳{product.new_price}</span>
          {product.old_price && (
            <span className="text-gray-400 line-through text-sm">৳{product.old_price}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-between gap-2">
          {/* Add to Cart (icon only) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // handleAddToCart(product)
            }}
            className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
          >
            <FaShoppingCart className="text-lg" />
          </button>

          {/* Order Now */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // handleOrderNow(product)
            }}
            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold py-2 rounded-lg transition"
          >
            Order Now
          </button>
        </div>
      </div>
    </Link>
  ))}
</div>
    </section>
  );
}
