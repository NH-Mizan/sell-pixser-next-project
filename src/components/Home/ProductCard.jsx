'use client';
import Link from 'next/link';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ product, baseURL }) {
    const discount = product.old_price
        ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
        : 0;

    return (
        <Link
            href={`/product/${product.slug}`}
            data-aos="zoom-in"
            data-aos-duration="500"
            className="relative border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
        >
            {/* Discount Badge */}
            {discount > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                    SAVE {discount}%
                </span>
            )}

            {/* Image */}
            <Link href={`/details/${product.slug}`}>
                <img
                    src={`${baseURL}${product.image?.image}`}
                    alt={product.name}
                    className="w-full h-48  transform group-hover:scale-105 transition duration-300 ease-in-out"
                />
            </Link>

            {/* Wishlist Icon */}
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-pink-500 z-10 text-lg"
                onClick={(e) => e.preventDefault()} // prevent Link trigger
            >
                <FaHeart />
            </button>

            {/* Details */}
            <div className="p-4 space-y-2">
                <Link href={`/product/${product.slug}`}>
                    <h3 className="text-sm font-semibold hover:text-blue-600 transition">
                        {product.name.length > 50 ? product.name.slice(0, 50) + '...' : product.name}
                    </h3>
                </Link>

                {/* Price */}
                <div className="text-red-600 font-bold text-base">
                    ৳{product.new_price}
                    {product.old_price && (
                        <span className="ml-2 text-gray-400 line-through">৳{product.old_price}</span>
                    )}
                </div>

                {/* Add to Cart */}
                <div className="mt-4 flex items-center justify-between gap-2">
                    {/* Add to Cart (icon only) */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            // handleAddToCart(product)
                        }}
                        className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
                    >
                        <FaShoppingCart className="text-lg" />
                    </button>

                    {/* Order Now */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            // handleOrderNow(product)
                        }}
                        className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold py-2 rounded-lg transition"
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </Link>
    );
}
