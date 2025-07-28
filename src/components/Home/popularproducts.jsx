"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import AOS from 'aos';
import 'aos/dist/aos.css';
const ProductCard = dynamic(() => import('./ProductCard'), { ssr: false });

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
          setProducts(data.data.slice(0, 10));
        }
      } catch (error) {
        console.error('Slider fetch error:', error);
      }
    };

    fetchproduct();
  }, []);



  return (
    <section className="w-10/12 mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-8"   
              data-aos="fade-down"
            data-aos-duration="500">
        <span className="text-pink-500 italic block text-base"> Shop Bangladesh</span>
        Popular Product
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            baseURL={baseURL} />
        ))}
      </div>
    </section>
  );
}
