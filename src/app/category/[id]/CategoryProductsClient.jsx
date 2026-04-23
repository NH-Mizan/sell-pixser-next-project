"use client";

import ProductCard from "@/components/Home/ProductCard";
import { ASSET_BASE_URL } from "@/lib/api";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryProductsClient({ id, products = [], categories = [] }) {
  const [sortBy, setSortBy] = useState("");
  const router = useRouter();

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === "price") return Number(a.new_price) - Number(b.new_price);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, sortBy]);

  return (
    <div className="container min-h-screen py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 bg-white shadow rounded-xl p-2 lg:p-4 h-full lg:h-[500px]">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`cate-${category.id}`}
                  name="category"
                  value={category.id}
                  checked={Number(id) === Number(category.id)}
                  onChange={() => router.push(`/category/${category.id}`)}
                  className="text-sec focus:ring-sec cursor-pointer"
                />
                <label
                  htmlFor={`cate-${category.id}`}
                  className="cursor-pointer text-gray-700 hover:text-sec capitalize"
                >
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        </aside>

        <div className="md:col-span-3">
          <div className="flex justify-end items-center mb-4">
            <select
              className="border px-3 py-2 rounded-md shadow-sm"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price">Price Low to High</option>
              <option value="name">Name A to Z</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                baseURL={`${ASSET_BASE_URL}/`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
