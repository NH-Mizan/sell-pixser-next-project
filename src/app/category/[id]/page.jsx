"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/Home/ProductCard";
import Link from "next/link";

export default function RelatedProducts({ params }) {
  const { id } = params;
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProducts(data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [id]);

  useEffect(() => {
    const catData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        if (!res.ok) throw new Error("Failed to fetch category");
        const data = await res.json();
        setCategory(data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    catData();
  }, []);

  // sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price") {
      return a.new_price - b.new_price; // ascending by price
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name); // ascending by name
    }
    return 0;
  });

  return (
    <div className="w-11/12 mx-auto min-h-screen py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Side - Categories */}
        <div className="md:col-span-1 bg-white shadow rounded-xl p-4 h-[500px]">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Categories</h2>
          <ul className="space-y-2">
            {category?.map((cate) => (
              <Link
                href={`/category/${cate.id}`}
                key={cate.id}
                className={`block px-3 py-2 rounded-lg transition ${Number(id) === cate.id
                    ? "bg-sec text-white font-medium"
                    : "hover:bg-gray-100"
                  }`}
              >
                {cate.name}
              </Link>
            ))}
          </ul>
        </div>

        {/* Right Side - Products */}
        <div className="md:col-span-3">
          {/* Sort Option */}
          <div className="flex justify-end items-center mb-4">
            <select
              className="border px-3 py-2 rounded-md shadow-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price">Price (Low → High)</option>
              <option value="name">Name (A → Z)</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                baseURL="https://sellpixer.websolutionit.com/"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
