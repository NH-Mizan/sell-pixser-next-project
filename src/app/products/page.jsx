// src/app/products/page.jsx

import Head from 'next/head';

const getSlider = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/slider`, {
    cache: 'no-store', // SSR: fetch fresh data every time
  });

  const json = await res.json();
  return json.data; // J API response থেকে শুধু data অংশ
};

export default async function ProductsPage() {
  const slider = await getSlider();

  return (
    <>
      <Head>
        <title>All Products | MyShop</title>
        <meta
          name="description"
          content="Browse our latest Laravel-powered product list with fresh updates every time."
        />
      </Head>

      <main className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>

        {Array.isArray(slider) && slider.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {slider.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded shadow-sm hover:shadow-md transition"
              >
                <img
                  src={`https://sellpixer.websolutionit.com/${product.image}`}
                  alt="slider"
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h2 className="text-xl font-semibold mb-2">Category ID: {product.category_id}</h2>
                <a href={product.link} className="text-blue-500 underline">
                  Visit Link
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
