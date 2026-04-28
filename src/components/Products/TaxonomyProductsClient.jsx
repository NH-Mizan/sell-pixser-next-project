"use client";

import ProductCard from "@/components/Home/ProductCard";
import { ASSET_BASE_URL } from "@/lib/api";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function TaxonomyProductsClient({
  title = "Products",
  products = [],
  navigationItems = [],
  navigationTitle = "Categories",
  navigationBasePath = "/category",
  selectedId = null,
}) {
  const [sortBy, setSortBy] = useState("");
  const router = useRouter();

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === "price") return Number(a.new_price) - Number(b.new_price);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, sortBy]);

  const hasSidebar = navigationItems.length > 0;

  return (
    <div className="container min-h-screen py-6">
      <div className={`grid grid-cols-1 gap-6 ${hasSidebar ? "md:grid-cols-4" : ""}`}>
        {hasSidebar ? (
          <aside className="md:col-span-1 h-full rounded-xl bg-white p-2 shadow lg:h-[500px] lg:p-4">
            <h2 className="mb-4 border-b pb-2 text-lg font-semibold">{navigationTitle}</h2>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`nav-${item.id}`}
                    name="taxonomy"
                    value={item.id}
                    checked={Number(selectedId) === Number(item.id)}
                    onChange={() => router.push(`${navigationBasePath}/${item.id}`)}
                    className="cursor-pointer text-sec focus:ring-sec"
                  />
                  <label
                    htmlFor={`nav-${item.id}`}
                    className="cursor-pointer capitalize text-gray-700 hover:text-sec"
                  >
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <div className={hasSidebar ? "md:col-span-3" : ""}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h1 className="text-lg font-semibold text-gray-900 lg:text-2xl">{title}</h1>
            <select
              className="rounded-md border px-3 py-2 shadow-sm"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price">Price Low to High</option>
              <option value="name">Name A to Z</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
