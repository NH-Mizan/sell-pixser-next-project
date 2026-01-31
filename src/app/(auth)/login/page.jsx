"use client";
import LottieAnimation from "@/components/LottieFils/RegisterBanner";
import Link from "next/link";


export default function Login() {
  const loginInfoData = async (e) => {
      e.preventDefault();
      const form = e.target;

      const phone = form.phone.value;
      const password = form.password.value;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customer/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              phone,
              password,
            }),
          }
        );

        const data = await res.json();

        if (data.token) {
        
          localStorage.setItem("token", data.token);
          window.location.href = "/dashboard";
          console.log("Login success", data);
        } else {
          console.log("Login failed", data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <div className="bg-gray-50">
        <div className="min-h-screen w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2">
      
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
         
          <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back </h2>
          <p className="mt-2 text-center text-gray-500">Login to your account</p>

        
          <form onSubmit={loginInfoData} className="mt-6 space-y-4">
           
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone </label>
              <input
                type="number"
                name="phone"
                placeholder="Enter your Number"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

           
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" />
                Remember me
              </label>
              <Link href={'/forgot-password'} className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

           
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
