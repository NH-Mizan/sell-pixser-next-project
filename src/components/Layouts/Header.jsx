'use client';
import Link from "next/link";
import { BiSupport } from "react-icons/bi";
import { useEffect, useState } from 'react';
import {
  FaBars, FaTimes, FaUser, FaShoppingCart, FaTruck, FaHeart, FaSearch, FaAngleDown,
  FaRegUserCircle
} from 'react-icons/fa';
import { IoGitCompare } from "react-icons/io5";


export default function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [cat, setCat] = useState([]);
  const baseURL = 'https://sellpixer.websolutionit.com/';

  const toggleMenu = () => setIsOpen(!isOpen);
    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`) 
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            setCat(data.data);
           
          }
        });
    }, []);

  return (
    <div className="relative shadow-md mb-2">
      {/* === Header Section === */}
      <div className="bg-white z-20 relative ">
        <header className="text-black ">
          <nav className="w-10/12 mx-auto  grid grid-cols-1 md:grid-cols-3 items-center gap-2">

            {/* Logo + Mobile Toggle */}
            <div className="flex items-center justify-between md:justify-start col-span-1">
              <button onClick={toggleMenu} className="md:hidden text-black text-2xl focus:outline-none">
                <FaBars />
              </button>

              <Link href={'/'}> <img src="/images/sell-pixer.webp" alt="Logo" className="w-22 md:w-28 ml-4" /></Link>

              {/* Mobile Icons */}
              <div className="lg:hidden md:hidden flex gap-4">
                <a href="#" className="hover:text-yellow-400 flex items-center gap-1">
                  <FaUser />
                </a>
                <a href="#" className="relative hover:text-yellow-400">
                  <FaShoppingCart />
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-1 rounded-full">0</span>
                </a>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex w-full max-w-2xl border border-pry rounded-md mb-2 lg:mb-0 overflow-hidden">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />

              {/* Divider */}
              <div className="w-[2px] bg-pry my-2" />

              {/* Select Dropdown */}
              <select className="text-sm px-3 outline-none bg-white text-black appearance-none">
                <option>Select Category</option>
                <option>Skincare</option>
                <option>Makeup</option>
              </select>

              {/* Search Button */}
              <button className="bg-pry text-white px-4 flex items-center justify-center">
                <FaSearch className="text-lg" />
              </button>
            </div>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center justify-end gap-4 text-sm col-span-1 text-black">
              <a href="#" className=" flex items-center gap-1">
                <FaRegUserCircle className="text-[30px]" />
                <span>
                  <p className="text-sm" >Hello, Sign In/Sign Up</p>
                  <p className="font-bold text-md ">Your Account</p>
                </span>
              </a>
              <a href="#" className=" flex items-center gap-1">
                <IoGitCompare className="text-[24px]" />
              </a>

              <a href="#" className="relative ">
                <FaHeart className="text-[24px]" />
                <span className="absolute -top-2 -right-2 bg-pry text-wt text-xs px-1 rounded-full">0</span>
              </a>
              <a href="#" className="relative ">
                <FaShoppingCart className="text-[24px]" />
                <span className="absolute -top-2 -right-2 bg-pry text-wt text-xs px-1 rounded-full">0</span>

              </a>
            </div>
          </nav>
        </header>
      </div>

      {/* === Slide-in Mobile Drawer === */}
      <div className={`fixed top-0 left-0 h-full w-[260px] bg-black text-white z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
           <Link href={'/'}> <img src="/images/sell-pixer.webp" alt="Logo" className="w-22 md:w-28 ml-4" /></Link>
          <button onClick={toggleMenu} className="text-xl">
            <FaTimes />
          </button>
        </div>
        <ul className="flex flex-col gap-4 px-6 py-4">
          <li><Link href="#" className="hover:text-[#ed145b]">Home</Link></li>
           {
            cat.map((category) => (
              <li key={category.id}>
                <Link href={`/products/${category.slug}`} className="hover:text-[#ed145b]">
                  {category.name}
                </Link>
              </li>
            ))
           }
          <li><Link href="#" className="hover:text-[#ed145b]">Track Order</Link></li>
          <li><Link href="#" className="hhover:text-[#ed145b]">Login / Signup</Link></li>
        </ul>
      </div>

      {/* === Overlay when menu open === */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black opacity-30 z-40"
        ></div>
      )}

      {/* === Category Dropdown === */}
      {show && (
        <div className="absolute left-0 top-full w-full   z-30 animate-slideDown">
          <div className="w-10/12 mx-auto bg-white grid grid-cols-6 gap-4 py-6">
            {/* Example Categories */}
            {cat.map((category) => (
              <Link key={category.id} href={`/products/${category.slug}`}>
                <div className="flex flex-col items-center">
                  <img
                    src={`${baseURL}${category.image}`}
                    alt={category.name}
                    className="w-16 h-16 object-cover mb-2 rounded-full"
                  />
                  <span className="text-sm font-semibold">{category.name}</span>
                </div>
              </Link>
            ))}
            {/* ... Add more category items dynamically if needed */}
          </div>
        </div>
      )}


      {/* === Main Menu Section === */}
      <div className="bg-sec shadow-sm">
        <div className="w-11/12 mx-auto flex items-center justify-between py-2 lg:py-0">

          {/* Categories - hidden on small screens */}
          <div
            onClick={() => setShow(!show)}
            className="hidden lg:flex items-center bg-pry text-white px-4 py-2  rounded cursor-pointer">
            <span className="mr-2 text-xl"><FaBars /></span>
            <span>Categories</span>
            <span className="ml-2 text-sm"><FaAngleDown /></span>
          </div>


          {/* Middle: Menu Items - always visible */}
          <ul className="flex items-center uppercase gap-2 lg:gap-6 text-[9px]  lg:text-[15px] font-medium text-wt">
            <li className="hover:text-[#ed145b] cursor-pointer"><Link href={'/'}>Home</Link></li>
            <li className="hover:text-[#ed145b] cursor-pointer"><Link href={'/products'}>Products</Link></li>
            <li className="hover:text-[#ed145b] cursor-pointer flex items-center">
              Brands <span><FaAngleDown /></span>
            </li>
            <li className="hover:text-[#ed145b] cursor-pointer flex items-center ">
              Skin Care <span><FaAngleDown /></span>
            </li>
            <li className="hover:text-[#ed145b] cursor-pointer">Offers</li>
            <li className="hover:text-[#ed145b] cursor-pointer">Best Seller</li>
          </ul>

          {/* Hotline - hidden on small screens */}
          <div className="hidden lg:flex items-center gap-2 text-sm">
            <BiSupport className="text-[25px] text-bk" />
            
            <a href="tel:+8801303779646" className="text-wt  ">
              <div className="text-bk text-[15px] mb-[-3px]">Hotline:</div>
             <span className="text-sm"> +8801303-779646</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
