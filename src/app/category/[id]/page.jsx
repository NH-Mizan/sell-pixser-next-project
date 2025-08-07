'use client';

import { useEffect, useState } from 'react';

export default function ProductFilter() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sort, setSort] = useState('Relevance');

  // ✅ Load categories and brands from API
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

  // ✅ Handle Filter Change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // filter or API call here
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    // filter or API call here
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    // filter or API call here
  };

  return (
    <div className="flex flex-wrap items-center gap-4 my-4 aos-init aos-animate" data-aos="zoom-in" data-aos-duration="500">
      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
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
        onChange={handleBrandChange}
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
        onChange={handleSortChange}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="Relevance">Relevance</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
        <option value="topRated">Top Rated</option>
      </select>
    </div>
  );
}
