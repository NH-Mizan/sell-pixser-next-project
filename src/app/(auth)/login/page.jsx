import LottieAnimation from "@/components/LottieFils/RegisterBanner";
import Link from "next/link";

// pages/login.js  OR  app/login/page.jsx
export default function Login() {
  return (
    <div className="bg-gray-50">
        <div className="min-h-screen w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back 👋</h2>
          <p className="mt-2 text-center text-gray-500">Login to your account</p>

          {/* Form */}
          <form className="mt-6 space-y-4">
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
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" />
                Remember me
              </label>
              <Link href={'/forgot-password'} className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex items-center justify-center  ">
        <LottieAnimation/>
      </div>
    </div>
    </div>
  );
}
