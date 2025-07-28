'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import { PiArrowFatLineRight } from "react-icons/pi";

const ProductCard = dynamic(() => import('./ProductCard'), { ssr: false });

const baseURL = 'https://sellpixer.websolutionit.com/';
const allowedSlugs = ['mens-fashion', 'womens-fashion', 'cosmetics', 'gadgets', 'grocery', 'home-lifestyle'];

export default function CategoryWiseProducts() {
  const [categories, setCategories] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init();
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/homepage-product`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.data.filter(cat => allowedSlugs.includes(cat.slug));
        setCategories(filtered);
      });
  }, []);

  if (!mounted || categories.length === 0) {
    return <div className="loading-wrapper">
      <div className="runner" />
    </div>;
  }

  return (
    <section className="w-10/12 mx-auto py-10 space-y-16">
      {categories.map(category => (
        <div key={category.id}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg lg:text-3xl font-bold text-gray-800 " data-aos="fade-right"
            data-aos-duration="500">{category.name}</h2>
            <Link href={`/category/${category.slug}`} className="flex text-sm lg:text-lg items-center text-wt bg-pry px-4 py-1 rounded-lg hover:text-sec "data-aos="fade-left"
            data-aos-duration="500">
              View All <PiArrowFatLineRight className='ml-2'/>
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-4">
            {category.products?.slice(0, 10).map(product => (
              <ProductCard key={product.id} product={product} baseURL={baseURL} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
