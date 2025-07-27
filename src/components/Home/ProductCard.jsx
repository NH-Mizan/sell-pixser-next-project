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
            className="relative border border-red-300 rounded-lg shadow overflow-hidden transform group-hover:scale-105 transition duration-300 ease-in-out"
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
                    className="w-full h-48 group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
            </Link>

            {/* Wishlist Icon */}
            <button
                className="cursor-hover absolute top-2 right-2 bg-pry p-1 rounded-full text-wt hover:text-bk z-10 text-lg"
                onClick={(e) => e.preventDefault()} // prevent Link trigger
            >
                <FaHeart />
            </button>

            {/* Details */}
            <div className="p-4 space-y-2">
                <Link href={`/details/${product.slug}`}>
                    <h3 className="text-sm h-18 font-semibold hover:text-blue-600 transition">
                        {product.name.length > 50 ? product.name.slice(0, 50) + '...' : product.name}
                    </h3>
                </Link>

                {/* Price */}
                <div className="text-pry font-bold text-base">
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
                        className="cursor-hover p-2 rounded-full bg-sec text-wt  transition"
                    >
                        <FaShoppingCart className="text-lg" />
                    </button>

                    {/* Order Now */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            // handleOrderNow(product)
                        }}
                        className="cursor-hover flex-1 bg-sec  text-wt text-sm font-semibold py-2 rounded-lg transition"
                    >
                        Order Now
                    </button>
                    
                </div>
            </div>
        </Link>
    );
}
