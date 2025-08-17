'use client';
import { useCart } from '@/context/cartcontext';
import Link from 'next/link';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ product, baseURL }) {
    const { addToCart, addToWishlist } = useCart();
    const discount = product.old_price
        ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
        : 0;

    return (
        <div
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

            {/* Wishlist Icon */}
            <button
                onClick={() => addToWishlist(product)}
                type="button"
                className="cursor-hover absolute top-2 right-2 bg-pry p-1 rounded-full text-wt hover:text-bk z-10 text-lg"
            >
                <FaHeart />
            </button>

            {/* Clickable Content (single Link wrapper) */}
            <Link href={`/details/${product.id}`} className="block">
                {/* Image */}
                <img
                    src={`${baseURL}${product.image?.image}`}
                    alt={product.name}
                    className="w-full h-38 lg:h-48 group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />

                {/* Details */}
                <div className="p-4 space-y-2">
                    <h3 className="text-sm h-16 font-semibold hover:text-blue-600 transition">
                        {product.name.length > 30
                            ? product.name.slice(0, 35) + '...'
                            : product.name}
                    </h3>

                    {/* Price */}
                    <div className="text-pry font-bold text-base">
                        ৳{product.new_price}
                        {product.old_price && (
                            <span className="ml-2 text-gray-400 line-through">
                                ৳{product.old_price}
                            </span>
                        )}
                    </div>
                </div>
            </Link>

            {/* Actions (outside link so clicks don’t trigger navigation) */}
            <div className="px-4 pb-4 flex items-center justify-between gap-2">
                <button
                    onClick={() => addToCart(product)}
                    className="cursor-hover p-2 rounded-full bg-sec text-wt transition"
                >
                    <FaShoppingCart className="text-lg" />
                </button>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        // handleOrderNow(product)
                    }}
                    className="cursor-hover flex-1 bg-sec text-wt text-[11px] lg:text-sm font-semibold py-2 rounded-lg transition"
                >
                    Order Now
                </button>
            </div>
        </div>
    );
}
