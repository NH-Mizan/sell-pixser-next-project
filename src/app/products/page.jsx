'use client';
import { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductCard from '@/components/Home/ProductCard';


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
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map(product => (
            <ProductCard key={product.id} product={product} baseURL={baseURL} />
        ))}
      </div>
    </section>
  );
}
