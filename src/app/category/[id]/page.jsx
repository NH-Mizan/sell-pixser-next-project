"use client";

import { use } from "react"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ router import
import ProductCard from "@/components/Home/ProductCard";
import Loader from "../loading";

export default function RelatedProducts({ params }) {
  const { id } = use(params); 
  const router = useRouter(); // ✅ router ইনিশিয়ালাইজ

  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch categories
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

  // fetch products by category id
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProducts(data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  // sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price") return a.new_price - b.new_price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="w-11/12 mx-auto min-h-screen py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left Side - Categories */}
        <div className="md:col-span-1 bg-white shadow rounded-xl p-2 lg:p-4 h-full lg:h-[500px]">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Categories</h2>
          <ul className="space-y-2">
            {category?.map((cate) => (
              <li key={cate.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`cate-${cate.id}`}
                  name="category"
                  value={cate.id}
                  checked={Number(id) === cate.id}
                  onChange={() => router.push(`/category/${cate.id}`)} // ✅ এখন কাজ করবে
                  className="text-sec focus:ring-sec cursor-pointer"
                />
                <label
                  htmlFor={`cate-${cate.id}`}
                  className="cursor-pointer text-gray-700 hover:text-sec capitalize"
                >
                  {cate.name}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Products */}
        <div className="md:col-span-3">
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

          {loading ? (
            <Loader/>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  baseURL="https://sellpixer.websolutionit.com/"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
