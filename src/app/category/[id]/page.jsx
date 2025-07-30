// ✅ app/category/[id]/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductCard from '@/components/Home/ProductCard';

const baseURL = 'https://sellpixer.websolutionit.com/';

export default function CategoryProductList({ params }) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = params; // ✅ Correct way to extract dynamic param

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`);
        const json = await res.json();
        setData(json.data);
        setFiltered(json.data);
        setCategory(json.category);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching category products:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFilter = (range) => {
    if (range === 'all') {
      setFiltered(data);
    } else {
      const [min, max] = range;
      const result = data.filter((p) => p.new_price >= min && p.new_price <= max);
      setFiltered(result);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="w-10/12 mx-auto">
      <h2 className="text-xl font-bold mb-4">Category: {category?.name}</h2>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => handleFilter('all')} className="px-3 py-1 border rounded">All</button>
        <button onClick={() => handleFilter([0, 500])} className="px-3 py-1 border rounded">Under ৳500</button>
        <button onClick={() => handleFilter([501, 1000])} className="px-3 py-1 border rounded">৳500 - ৳1000</button>
        <button onClick={() => handleFilter([1001, 2000])} className="px-3 py-1 border rounded">৳1000 - ৳2000</button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {filtered.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            baseURL={baseURL} />
        ))}
       
      </div>
    </div>
  );
}
