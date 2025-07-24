'use client';
import { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ProductsPage() {
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
          setProducts(data.data);
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
        <span className="text-pink-500 italic block text-base">Korean Shop Bangladesh</span>
        Popular Product
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="border rounded-xl p-4 relative aos-init aos-animate"
            data-aos="zoom-in"
            data-aos-duration="500"
          >
            {product.new_price && product.old_price && (
              <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                SAVE {Math.round((product.old_price - product.new_price) * 100 / product.old_price)}%
              </div>
            )}

            <button className="absolute top-2 right-2 text-gray-600 hover:text-pink-500">
              <FaHeart />
            </button>

            <img
              src={`${baseURL}${product.image.image}`}
              alt={product.title}
              className="w-full h-[160px] object-contain my-4"
            />

            <h3 className="text-sm font-medium text-gray-800">
              {product.name.slice(0, 50)}...
            </h3>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-pink-600 font-bold text-lg">৳{product.new_price}</span>
              {product.old_price && (
                <span className="text-gray-400 line-through text-sm">৳{product.old_price}</span>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button className="text-pink-600 bg-pink-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <FaShoppingCart /> Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
