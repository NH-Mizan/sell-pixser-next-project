"use client";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

export default function Profile() {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left: Image + Info */}
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/100"
              alt="Profile"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <h2 className="text-xl font-bold">Nh Mizan</h2>
              <p className="text-gray-500">
                Team Manager | Leeds, United Kingdom
              </p>
            </div>
          </div>

          {/* Right: Social + Edit */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaXTwitter />} />
            <SocialIcon icon={<FaLinkedinIn />} />
            <SocialIcon icon={<FaInstagram />} />
            <button className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <FaEdit /> Edit
            </button>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <button className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <FaEdit /> Edit
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500">First Name</p>
            <p className="font-semibold">Nh</p>
          </div>
          <div>
            <p className="text-gray-500">Last Name</p>
            <p className="font-semibold">Mizan</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-semibold">nhmizan999@gmail.com</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-semibold">+09 363 398 46</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500">Bio</p>
            <p className="font-semibold">Team Manager</p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Address</h3>
          <button className="flex items-center gap-2 border px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <FaEdit /> Edit
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500">Country</p>
            <p className="font-semibold">Bangladesh</p>
          </div>
          <div>
            <p className="text-gray-500">City/State</p>
            <p className="font-semibold">Dinajpur, Rongpur</p>
          </div>
          <div>
            <p className="text-gray-500">Postal Code</p>
            <p className="font-semibold"> 2489</p>
          </div>
          <div>
            <p className="text-gray-500">TAX ID</p>
            <p className="font-semibold"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <button className="w-8 h-8 flex items-center justify-center rounded-full border text-gray-600 hover:bg-gray-50">
      {icon}
    </button>
  );
}
