"use client";
import useShopStore from "@/context/cardStore";
import { useState } from "react";

export default function Checkout() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useShopStore();
  const [shipping, setShipping] = useState(70);
  const [payment, setPayment] = useState("cod");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      
      {/* Left Side - User Info */}
      <div className="md:w-1/2 bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">বিস্তারিত তথ্য পূরণ করুন</h2>
        <input
          type="text"
          placeholder="আপনার নাম *"
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="text"
          placeholder="ফোন নাম্বার *"
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="text"
          placeholder="আপনার এড্রেস *"
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Shipping */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">শিপিং মেথড *</h3>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="shipping"
              checked={shipping === 70}
              onChange={() => setShipping(70)}
            />
            <span>ঢাকার ভিতরে ৭০ টাকা</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="shipping"
              checked={shipping === 120}
              onChange={() => setShipping(120)}
            />
            <span>ঢাকার বাইরে ১২০ টাকা</span>
          </label>
        </div>

        {/* Payment */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">পেমেন্ট মেথড</h3>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="payment"
              checked={payment === "cod"}
              onChange={() => setPayment("cod")}
            />
            <span>ক্যাশ অন ডেলিভারি</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              checked={payment === "bkash"}
              onChange={() => setPayment("bkash")}
            />
            <span>বিকাশ</span>
          </label>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-3 rounded-xl font-semibold mt-6 transition">
          অর্ডার করুন
        </button>
      </div>

      {/* Right Side - Cart */}
      <div className="md:w-1/2 bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">অর্ডার বিবরণ</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">আপনার কার্ট খালি</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-xl shadow-sm">
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-gray-500">Price: ৳{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-semibold">৳{item.price * item.qty}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 mt-1"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 border-t pt-4 space-y-2">
          <div className="flex justify-between"><span>মোট</span><span>৳{subtotal}</span></div>
          <div className="flex justify-between"><span>ডেলিভারি চার্জ</span><span>৳{shipping}</span></div>
          <div className="flex justify-between"><span>ডিসকাউন্ট</span><span>৳{discount}</span></div>
          <div className="flex justify-between font-bold text-lg"><span>সর্বমোট</span><span>৳{total}</span></div>
        </div>
      </div>
    </div>
  );
}
