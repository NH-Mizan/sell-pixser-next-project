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
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="w-11/12 mx-auto space-y-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ================= LEFT - DELIVERY DETAILS ================= */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-6">

            <h2 className="text-2xl font-bold border-b pb-3">
              Delivery Details
            </h2>

            {/* Name + Phone */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Name (নাম)
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 
                 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 
                 outline-none transition"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Phone Number (মোবাইল নাম্বার)
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 
                 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 
                 outline-none transition"
                />
              </div>

            </div>


            {/* Address + Note */}
            <div className="grid md:grid-cols-2 gap-6 mt-4">

              {/* Address */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Delivery Address (ঠিকানা)
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28 
                 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 
                 outline-none transition resize-none"
                />
              </div>

              {/* Note */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Note (optional)
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28 
                 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 
                 outline-none transition resize-none"
                />
              </div>

            </div>




            {/* Shipping + Payment */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Shipping */}
              <div>
                <h3 className="font-semibold mb-3">Your Shipping Location :</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping === 70}
                      onChange={() => setShipping(70)}
                    />
                    Inside Dhaka - 70৳
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping === 120}
                      onChange={() => setShipping(120)}
                    />
                    Outside Dhaka - 120৳
                  </label>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="font-semibold mb-3">Payment Method :</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                    />
                    Cash On Delivery
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === "bkash"}
                      onChange={() => setPayment("bkash")}
                    />
                    Bkash
                  </label>
                </div>
              </div>

            </div>

            {/* Order Button */}
            <button className="w-full bg-pry hover-bg-sec transition text-white py-3 rounded-lg font-semibold text-lg">
              অর্ডার করুন (৳{total})
            </button>

          </div>

          {/* ================= RIGHT - CART SUMMARY ================= */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4 h-fit">

            <h2 className="text-2xl font-bold border-b pb-3 text-center">
              Cart Summary
            </h2>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span>Quantity</span>
                <span>
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Product Price</span>
                <span>৳{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>৳{discount}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>৳{shipping}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>৳{total}</span>
              </div>

            </div>

            {/* Coupon */}
            <div className="pt-4">
              <p className="text-sm mb-2">Do you have a coupon code?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border p-2 rounded-lg"
                  placeholder="Enter coupon"
                />
                <button className="bg-gray-300 px-4 rounded-lg">
                  Apply
                </button>
              </div>
            </div>

            

          </div>

        </div>

      </div>
      <div className="bg-white w-11/12 mx-auto rounded-lg shadow-md p-4 md:p-6 mt-4">

        {/* ================= Desktop Header ================= */}
        <div className="hidden md:grid grid-cols-5 font-semibold text-gray-700 border-b pb-3 mb-4 text-base">
          <span className="col-span-2">Product</span>
          <span className="text-center">Price</span>
          <span className="text-center">Quantity</span>
          <span className="text-right">Subtotal</span>
        </div>

        {/* ================= Products ================= */}
        {cart.map((item) => (
          <div
            key={item.id}
            className="border-b py-4"
          >

            {/* ===== Desktop Layout ===== */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4">

              {/* Product */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    item.image?.image
                      ? `${baseURL}${item.image.image}`
                      : "/no-image.png"
                  }
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <h4 className="font-medium truncate max-w-[250px]">
                  {item.name}
                </h4>
              </div>

              {/* Price */}
              <div className="text-center font-medium">
                ৳{Number(item.new_price) || 0}
              </div>

              {/* Quantity */}
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="w-8 h-8 border rounded-md hover:bg-gray-100"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="w-8 h-8 border rounded-md hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right font-semibold">
                ৳{(Number(item.new_price) || 0) * item.quantity}
              </div>

              {/* Remove */}
              <div className="text-right">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-lg"
                >
                  🗑
                </button>
              </div>

            </div>


            {/* ===== Mobile Layout ===== */}
            <div className="md:hidden flex flex-col gap-3">

              <div className="flex gap-3">
                <img
                  src={
                    item.image?.image
                      ? `${baseURL}${item.image.image}`
                      : "/no-image.png"
                  }
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Price: ৳{Number(item.new_price) || 0}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 border rounded-md"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 border rounded-md"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-semibold">
                    ৳{(Number(item.new_price) || 0) * item.quantity}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-lg"
                  >
                    🗑
                  </button>
                </div>

              </div>


            </div>

          </div>
        ))}

        {/* Empty */}
        {cart.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No products in cart
          </p>
        )}

      </div>



    </div>

  );
}
