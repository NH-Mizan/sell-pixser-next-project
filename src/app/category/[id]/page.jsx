"use client";

import { useEffect, useState } from "react";

export default function ProductFilter() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sort, setSort] = useState("Relevance");
  const [loading, setLoading] = useState(false);

  // ✅ Load categories and brands once
  useEffect(() => {
    const fetchData = async () => {
      const catRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const brandRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`);

      const catData = await catRes.json();
      const brandData = await brandRes.json();

      setCategories(catData);
      setBrands(brandData);
    };
    fetchData();
  }, []);

  // ✅ Fetch products when filter changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const params = new URLSearchParams({
        category: selectedCategory,
        brand: selectedBrand,
        sort: sort,
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${params}`);
      const data = await res.json();

      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory, selectedBrand, sort]);

  return (
    <div className="my-4">
      {/* Filters */}
      <div
        className="flex flex-wrap items-center gap-4 mb-6 aos-init aos-animate"
        data-aos="zoom-in"
        data-aos-duration="500"
      >
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Brand Filter */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.slug}>
              {brand.name}
            </option>
          ))}
        </select>

        {/* Sort Filter */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="Relevance">Relevance</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="topRated">Top Rated</option>
        </select>
      </div>

      {/* Product List */}
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-3 rounded-lg shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 text-sm font-semibold">{product.name}</h3>
              <p className="text-pink-600 font-bold">৳ {product.new_price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
