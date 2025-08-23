"use client";

import useShopStore from "@/context/cardStore";

import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";

export default function WishlistPage() {
    const { wishlist, addToCart } = useShopStore();
    const baseURL = 'https://sellpixer.websolutionit.com/';

    const handleRemove = (id) => {
        setWishlist((prev) => prev.filter((item) => item.id !== id));
    };
    const handleaddtocard = (product) => {
        addToCart(product); 
            toast.success(` $ Success to Add To Card!`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
            });

        }

    if (wishlist.length === 0) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-semibold text-gray-600">
                    💔 Your Wishlist is Empty
                </h2>
                <p className="text-gray-500 mt-2">Browse products and add to wishlist!</p>
            </div>
        );
    }

    return (
        <div className="container w-10/12 mx-auto  p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">My Wishlist ❤️</h1>

            <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-pink-100 to-pink-200 text-left">
                            <th className="px-6 py-3 text-gray-700 font-semibold">Image</th>
                            <th className="px-6 py-3 text-gray-700 font-semibold">Product</th>
                            <th className="px-6 py-3 text-gray-700 font-semibold text-center">Quantity</th>
                            <th className="px-6 py-3 text-gray-700 font-semibold text-right">Price</th>
                            <th className="px-6 py-3 text-gray-700 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {wishlist.map((item) => (
                            <tr
                                key={item.id}
                                className="hover:bg-gray-50 transition-colors duration-200"
                            >
                                {/* Image */}
                                <td className="px-6 py-4">
                                    <img
                                        src={
                                            item.image?.image
                                                ? `${baseURL}${item.image.image}`
                                                : "/no-image.png"
                                        }
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg border"
                                    />
                                </td>

                                {/* Name */}
                                <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>

                                {/* Quantity */}
                                <td className="px-6 py-4 text-center text-gray-600">1</td>

                                {/* Price */}
                                <td className="px-6 py-4 text-right font-semibold text-green-600">
                                    ৳{item.new_price}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 flex justify-center gap-3">
                                    <button
                                        onClick={handleaddtocard}
                                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                                    >
                                        <FaShoppingCart /> Add
                                    </button>

                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 hover:from-red-600 hover:to-red-700 transition-all duration-200"
                                    >
                                        <FaTrash /> Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
