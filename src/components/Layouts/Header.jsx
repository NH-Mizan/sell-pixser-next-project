'use client';

import { getAssetUrl } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSupport } from "react-icons/bi";
import {
  FaAngleDown,
  FaBars,
  FaRegUserCircle,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { IoGitCompare } from "react-icons/io5";
import useShopStore from "@/context/cardStore";
import OtpLoginModal from "../OtpLoginModal ";
import MobileCategoryMenu from "./MobileCategoryMenu";

export default function MainHeader({ initialCategories = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const cartCount = useShopStore((state) => state.cart.length);
  const wishlistCount = useShopStore((state) => state.wishlist.length);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const safeCartCount = isHydrated ? cartCount : 0;
  const safeWishlistCount = isHydrated ? wishlistCount : 0;

  const toggleMenu = () => setIsOpen((value) => !value);
  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);

    if (value !== "Select Category") {
      router.push(value);
    }
  };

  return (
    <div className="sticky top-0 z-50 shadow-md mb-2">
      <div className="bg-white z-20 relative">
        <header className="text-black">
          <nav className="container grid grid-cols-1 md:grid-cols-3 items-center gap-2">
            <div className="flex items-center justify-between md:justify-start col-span-1">
              <button onClick={toggleMenu} className="md:hidden text-black text-2xl focus:outline-none" aria-label="Open menu">
                <FaBars />
              </button>

              <Link href="/">
                <Image src="/images/sell-pixer.webp" alt="SellPixser" width={112} height={64} priority className="w-22 md:w-28 ml-4" />
              </Link>

              <div className="lg:hidden md:hidden flex gap-4">
                <Link href="/login" className="flex items-center gap-1" aria-label="Login">
                  <FaUser />
                </Link>
                <Link href="/checkout" className="relative" aria-label="Cart">
                  <FaShoppingCart />
                  <span className="absolute -top-2 -right-2 bg-pry text-wt text-xs px-1 rounded-full">{safeCartCount}</span>
                </Link>
              </div>
            </div>

            <div className="flex w-full max-w-2xl border border-pry rounded-md mb-2 lg:mb-0 overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />

              <div className="w-[2px] bg-pry my-2" />

              <select
                className="text-sm px-3 outline-none bg-white text-black appearance-none"
                value={selected}
                onChange={handleChange}
                aria-label="Select category"
              >
                <option>Select Category</option>
                {initialCategories.map((category) => (
                  <option key={category.id} value={`/category/${category.id}`}>
                    {category.name}
                  </option>
                ))}
              </select>

              <button className="bg-pry text-white px-4 flex items-center justify-center" aria-label="Search">
                <FaSearch className="text-lg" />
              </button>
            </div>

            <div className="hidden lg:flex items-center justify-end gap-4 text-sm col-span-1 text-black">
              <button onClick={() => setLoginModal(true)} className="flex items-center gap-1">
                <FaRegUserCircle className="text-[30px]" />
                <div>
                  <p className="text-sm">Hello, Sign In/Sign Up</p>
                  <p className="font-bold text-md">Your Account</p>
                </div>
              </button>
              <Link href="#" className="flex items-center gap-1" aria-label="Compare">
                <IoGitCompare className="text-[24px]" />
              </Link>

              <Link href="/wishlist" className="relative" aria-label="Wishlist">
                <GoHeart className="text-[24px]" />
                <span className="absolute -top-2 -right-2 bg-pry text-wt text-xs px-1 rounded-full">{safeWishlistCount}</span>
              </Link>
              <Link href="/checkout" className="relative" aria-label="Cart">
                <FaShoppingCart className="text-[24px]" />
                <span className="absolute -top-2 -right-2 bg-pry text-wt text-xs px-1 rounded-full">{safeCartCount}</span>
              </Link>
            </div>
          </nav>
        </header>
      </div>

      {loginModal && <OtpLoginModal onClose={() => setLoginModal(false)} />}

      <div className={`fixed top-0 left-0 h-full w-[260px] bg-black text-white z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <Link href="/">
            <Image src="/images/sell-pixer.webp" alt="SellPixser" width={112} height={64} className="w-22 md:w-28 ml-4" />
          </Link>
          <button onClick={toggleMenu} className="text-xl" aria-label="Close menu">
            <FaTimes />
          </button>
        </div>
        <ul className="flex flex-col gap-4 px-6 py-4">
          <li><Link href="/" className="hover-text-pry">Home</Link></li>
        </ul>
        <div className="px-4 pb-6">
          <MobileCategoryMenu categories={initialCategories} onNavigate={toggleMenu} />
        </div>
        <ul className="flex flex-col gap-4 px-6 py-4">
          <li><Link href="#" className="hover-text-pry">Track Order</Link></li>
          <li><Link href="/otp-login" className="hover-text-pry">Login / Signup</Link></li>
        </ul>
        
      </div>

      {isOpen && (
        <div onClick={toggleMenu} className="fixed inset-0 bg-black opacity-30 z-40" />
      )}

      {show && (
        <div className="absolute left-0 top-full w-full z-30 animate-slideDown">
          <div className="w-10/12 mx-auto bg-white grid grid-cols-6 gap-4 py-6">
            {initialCategories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <div className="flex flex-col items-center" onClick={() => setShow(false)}>
                  <Image
                    src={getAssetUrl(category.image)}
                    alt={category.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover mb-2 rounded-full"
                  />
                  <span className="text-sm font-semibold">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="bg-sec shadow-sm">
        <div className="w-11/12 lg:w-10/12 mx-auto flex items-center justify-between py-2 lg:py-0">
          <button
            onClick={() => setShow((value) => !value)}
            className="hidden lg:flex items-center bg-pry text-white px-4 py-2 cursor-pointer"
          >
            <span className="mr-2 text-xl"><FaBars /></span>
            <span>Categories</span>
            <span className="ml-2 text-sm"><FaAngleDown /></span>
          </button>

          <ul className="flex items-center uppercase gap-2 lg:gap-6 text-[9px] lg:text-[15px] font-medium text-wt">
            <li className="hover-text-pry cursor-pointer"><Link href="/">Home</Link></li>
            <li className="hover-text-pry cursor-pointer"><Link href="/products">Products</Link></li>
            <li className="hover-text-pry cursor-pointer flex items-center">Brands <FaAngleDown /></li>
            <li className="hover-text-pry cursor-pointer">Offers</li>
            <li className="hover-text-pry cursor-pointer">Best Seller</li>
          </ul>

          <div className="hidden lg:flex items-center gap-2 text-sm">
            <BiSupport className="text-[25px] text-bk" />
            <Link href="tel:+8801846494272" className="text-wt">
              <div className="text-bk text-[15px] mb-[-3px]">Hotline:</div>
              <span className="text-sm"> +8801846494272</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
