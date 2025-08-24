"use client";
import useShopStore from "@/context/cardStore";
import { useState } from "react";

export default function Checkout() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useShopStore();
  const [shipping, setShipping] = useState(70);
  const [payment, setPayment] = useState("cod");
   const baseURL = "https://sellpixer.websolutionit.com/";

  // Use new_price for calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.new_price) || 0) * item.quantity,
    0
  );
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <div className=" bg-gray-100 min-h-screen">
      <div className="w-11/12 mx-auto flex flex-col md:flex-row gap-6 p-6">
      
      {/* Left - Customer Info */}
      <div className="md:w-1/2 bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Fill in your details</h2>
        <input
          type="text"
          placeholder="Full Name *"
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="text"
          placeholder="Phone Number *"
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="text"
          placeholder="Address *"
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* Shipping */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Shipping Method *</h3>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="shipping"
              checked={shipping === 70}
              onChange={() => setShipping(70)}
            />
            <span>Inside Dhaka – 70৳</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="shipping"
              checked={shipping === 120}
              onChange={() => setShipping(120)}
            />
            <span>Outside Dhaka – 120৳</span>
          </label>
        </div>

        {/* Payment */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="payment"
              checked={payment === "cod"}
              onChange={() => setPayment("cod")}
            />
            <span>Cash on Delivery</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              checked={payment === "bkash"}
              onChange={() => setPayment("bkash")}
            />
            <span>Bkash</span>
          </label>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-3 rounded-xl font-semibold mt-6 transition">
          Place Order
        </button>
      </div>

      {/* Right - Cart */}
      <div className="md:w-1/2 bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-xl shadow-sm">
                <div>
                  <img
                    src={
                      item.image?.image
                        ? `${baseURL}${item.image.image}`
                        : "/no-image.png"
                    }
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <h4 className="font-semibold truncate w-48">{item.name}</h4>
                  <p className="text-gray-500">Price: ৳{Number(item.new_price) || 0}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-semibold">৳{(Number(item.new_price) || 0) * item.quantity}</p>
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
          <div className="flex justify-between"><span>Subtotal</span><span>৳{subtotal}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>৳{shipping}</span></div>
          <div className="flex justify-between"><span>Discount</span><span>৳{discount}</span></div>
          <div className="flex justify-between font-bold text-lg"><span>Total</span><span>৳{total}</span></div>
        </div>
      </div>
    </div>
    </div>
  );
}
