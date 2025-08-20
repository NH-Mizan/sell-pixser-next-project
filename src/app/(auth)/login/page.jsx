// pages/login.js  OR  app/login/page.jsx
export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
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
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="checkbox checkbox-sm" />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-4 text-gray-500 text-sm">OR</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social Login */}
        <div className="mt-4 flex flex-col gap-2">
          <button className="w-full py-2 border rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          <button className="w-full py-2 border rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50">
            <img src="https://www.svgrepo.com/show/349554/facebook.svg" alt="Facebook" className="w-5 h-5" />
            Continue with Facebook
          </button>
        </div>

        {/* Sign up link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
