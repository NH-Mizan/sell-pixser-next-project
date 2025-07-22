
export default function MainMenu() {
   return(
     <div className="bg-white border-b shadow-sm">
        <div className="w-10/12 mx-auto  flex items-center justify-between py-2">

            {/* Categories - hidden on small screens */}
            <div className="hidden lg:flex items-center bg-purple-800 text-white px-4 py-2 rounded cursor-pointer">
                <span className="mr-2 text-xl">☰</span>
                <span>Categories</span>
                <span className="ml-2 text-sm">▼</span>
            </div>

            {/* Middle: Menu Items - always visible */}
            <ul className="flex items-center gap-4 text-sm font-medium text-black">
                <li className="hover:text-purple-700 cursor-pointer">Home</li>
                <li className="hover:text-purple-700 cursor-pointer">Products</li>
                <li className="hover:text-purple-700 cursor-pointer flex items-center gap-1">
                    Brands <span>▼</span>
                </li>
                <li className="hover:text-purple-700 cursor-pointer flex items-center gap-1">
                    Skin Care <span>▼</span>
                </li>
                <li className="hover:text-purple-700 cursor-pointer">Combo</li>
                <li className="hover:text-purple-700 cursor-pointer">Offers</li>
                <li className="hover:text-purple-700 cursor-pointer">New Arrival</li>
                <li className="hover:text-purple-700 cursor-pointer">Best Seller</li>
            </ul>

            {/* Hotline - hidden on small screens */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-500">Hotline:</span>
                <a href="tel:+8801303779646" className="text-purple-800 font-semibold">
                    +8801303-779646
                </a>
            </div>

        </div>
    </div>
   )

}