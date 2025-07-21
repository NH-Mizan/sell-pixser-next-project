'use client';

import { FaHeart, FaShoppingBag, FaExchangeAlt, FaUserCircle, FaSearch } from 'react-icons/fa';
// import logo from '@/images/sell-pixer.webp';
// import Image from 'next/image';

export default function MainHeader() {
  return (
    <div className="bg-white shadow-sm ">
      <header className="w-10/12 mx-auto py-3 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* <Image src={logo} alt="hello"/> */}
          <img src="/images/sell-pixer.webp" alt="hello" className='w-[100px]' />

        </div>

        {/* Search */}
        <div className="flex w-full max-w-2xl border border-pry rounded-md overflow-hidden">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />

          {/* Divider */}
          <div className="w-[2px] bg-primary my-2" />

          {/* Select Dropdown */}
          <select className="text-sm px-3 outline-none bg-white text-black appearance-none">
            <option>Select Category</option>
            <option>Skincare</option>
            <option>Makeup</option>
          </select>

          {/* Search Button */}
          <button className="bg-primary text-white px-4 flex items-center justify-center">
            <FaSearch className="text-lg" />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 mt-2 lg:mt-0">
          <div className="flex items-center space-x-1 text-sm text-left">
            <FaUserCircle className="text-[25px]" />
            <div>
              <p className="text-xs">Hello, Sign In/Sign Up</p>
              <p className="font-medium">Your Account</p>
            </div>
          </div>
          <FaExchangeAlt className="text-xl text-purple-600 hidden sm:inline" />
          <div className="relative">
            <FaHeart className="text-xl text-gray-600" />
            <span className="absolute -top-3 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
          </div>
          <div className="relative">
            <FaShoppingBag className="text-xl text-gray-600" />
            <span className="absolute -top-3  -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">1</span>
          </div>
        </div>
      </header>
    </div>
  );
};


