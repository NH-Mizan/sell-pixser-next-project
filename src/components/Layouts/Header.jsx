'use client';

import { getAssetUrl, getLiveSearchProducts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
import { useAuthSession } from "../Auth/AuthSessionProvider";

function normalizeLiveSearchResults(results = []) {
  return results
    .map((item) => ({
      id: item?.id ?? item?.product_id ?? item?._id,
      name: item?.name ?? item?.product_name ?? item?.title,
      image:
        item?.image ??
        item?.thumbnail ??
        item?.product_image ??
        item?.photo,
      price:
        item?.new_price ??
        item?.price ??
        item?.sale_price ??
        item?.regular_price,
    }))
    .filter((item) => item.id && item.name);
}

export default function MainHeader({ initialCategories = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [liveResults, setLiveResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const cartCount = useShopStore((state) => state.cart.length);
  const wishlistCount = useShopStore((state) => state.wishlist.length);
  const user = useAuthSession();
  const router = useRouter();
  const searchBoxRef = useRef(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!searchBoxRef.current?.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const trimmedSearch = searchTerm.trim();

    if (trimmedSearch.length < 2) {
      setLiveResults([]);
      setIsSearchLoading(false);
      return undefined;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearchLoading(true);
        const results = await getLiveSearchProducts(trimmedSearch);
        setLiveResults(normalizeLiveSearchResults(results));
        setShowResults(true);
      } catch (error) {
        console.error("Live search failed:", error);
        setLiveResults([]);
      } finally {
        setIsSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

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

  const handleSearchInput = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowResults(Boolean(value.trim()));
  };

  const handleSearchSubmit = () => {
    if (liveResults[0]?.id) {
      router.push(`/details/${liveResults[0].id}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (productId) => {
    router.push(`/details/${productId}`);
    setSearchTerm("");
    setLiveResults([]);
    setShowResults(false);
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

            <div ref={searchBoxRef} className="relative flex w-full max-w-2xl border border-pry rounded-md mb-2 lg:mb-0 overflow-visible">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchInput}
                onFocus={() => {
                  if (searchTerm.trim()) {
                    setShowResults(true);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleSearchSubmit();
                  }
                }}
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

              <button
                type="button"
                onClick={handleSearchSubmit}
                className="bg-pry text-white px-4 flex items-center justify-center"
                aria-label="Search"
              >
                <FaSearch className="text-lg" />
              </button>

              {showResults ? (
                <div className="absolute left-0 top-full z-40 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl">
                  {isSearchLoading ? (
                    <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
                  ) : liveResults.length > 0 ? (
                    <ul className="max-h-96 overflow-y-auto py-2">
                      {liveResults.map((product) => (
                        <li key={product.id}>
                          <button
                            type="button"
                            onClick={() => handleResultClick(product.id)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-gray-50"
                          >
                            <Image
                              src={getAssetUrl(product.image)}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-gray-900">
                                {product.name}
                              </p>
                              <p className="text-sm font-semibold text-pry">
                                Tk {product.price ?? "0"}
                              </p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : searchTerm.trim().length >= 2 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No products found.
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="hidden lg:flex items-center justify-end gap-4 text-sm col-span-1 text-black">
              {
                user ? (
                  <Link href="/dashboard" className="flex items-center gap-1">
                    <FaRegUserCircle className="text-[30px]" />
                       <p className="text-sm">{user.name}</p>
                  </Link>
                ) : (
                  <button onClick={() => setLoginModal(true)} className="flex items-center gap-1">
                    <FaRegUserCircle className="text-[30px]" />
                     <p className="text-sm">Login / Register</p>
                  </button>
                )
              }
            
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
