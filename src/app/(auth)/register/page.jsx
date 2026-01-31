"use client";
import LottieAnimation from "@/components/LottieFils/RegisterBanner";
import Link from "next/link";

// pages/register.js  OR  app/register/page.jsx
export default function Register() {
  return (
    <div className=" bg-gray-50">
        <div className="min-h-screen w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Image */}
      <div className="hidden md:flex items-center justify-center ">
        <LottieAnimation/>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800">Create Account </h2>
          <p className="mt-2 text-center text-gray-500">Sign up to get started</p>

          {/* Form */}
          <form className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="checkbox checkbox-sm" />
              <span>
                I agree with the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </a>
              </span>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          {/* Already have account */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href={'/login'} className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
