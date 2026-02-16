'use client';
import useShopStore from '@/context/cardStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { toast, Bounce } from 'react-toastify';
import Swal from 'sweetalert2';
import { GoHeart } from 'react-icons/go';

export default function ProductCard({ product, baseURL }) {
    const { wishlist, addToCart, addToWishlist, removeFromWishlist } = useShopStore();
    const isWishlisted = wishlist.some(item => item.id === product.id);

     const router = useRouter();

    const discount = product.old_price
        ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
        : 0;
    const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.error(" Removed from Wishlist!", {  
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }
    addToWishlist(product);

    toast.success(`${product.name} added to Wishlist!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Bounce,
    });
  };
    const handleaddtocard = () => {
      addToCart(product);
    toast.success(` ${product.name} added to Add To Card!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };
  
const handleOrderNow = () => {
    let quantity = 1;

    Swal.fire({
        title: "",
        html: `
            <div style="padding:15px; text-align:center; font-family: 'Poppins', sans-serif;">
                <img src="${baseURL}${product.image?.image}" 
                     alt="${product.name}" 
                     style="width:100%; max-height:220px; object-fit:cover; border-radius:12px; margin-bottom:15px;" />
                
                <h2 style="font-size:18px; font-weight:600; margin-bottom:5px; color:#1f2937;">
                    ${product.name}
                </h2>
                
                <p style="font-size:16px; font-weight:700; color:#dc2626; margin-bottom:10px;">
                    ৳${product.new_price} 
                    ${product.old_price ? `<span style="color:#9ca3af; text-decoration: line-through; font-size:14px; margin-left:6px;">৳${product.old_price}</span>` : ""}
                </p>
                
                <div style="margin-top:10px; display:flex; justify-content:center; align-items:center; gap:15px;">
                    <button id="decreaseQty" 
                        style="padding:6px 12px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer; font-size:18px;">
                        -
                    </button>
                    
                    <span id="qtyValue" style="font-size:16px; font-weight:600;">${quantity}</span>
                    
                    <button id="increaseQty" 
                        style="padding:6px 12px; background:#10b981; color:white; border:none; border-radius:6px; cursor:pointer; font-size:18px;">
                        +
                    </button>
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: " Purchase",
        cancelButtonText: " Cancel",
        focusConfirm: false,
        customClass: {
            popup: "rounded-2xl shadow-lg",
            confirmButton: "bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg",
            cancelButton: "bg-gray-300 hover:bg-gray-400 text-black font-medium px-6 py-2 rounded-lg ml-2",
        },
        didOpen: () => {
            const qtyValue = Swal.getHtmlContainer().querySelector("#qtyValue");
            Swal.getHtmlContainer().querySelector("#increaseQty").onclick = () => {
                quantity++;
                qtyValue.innerText = quantity;
            };
            Swal.getHtmlContainer().querySelector("#decreaseQty").onclick = () => {
                if (quantity > 1) {
                    quantity--;
                    qtyValue.innerText = quantity;
                }
            };
        },
        preConfirm: () => {
            return quantity;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            
            for (let i = 0; i < result.value; i++) {
                addToCart(product);
            }
            toast.success(`${result.value} x ${product.name} added!`, {
                position: "bottom-right",
                autoClose: 3000,
                theme: "light",
            });

            // Checkout এ redirect
            router.push("/checkout");
        }
    });
};



    return (
        <div
            data-aos="zoom-in"
            data-aos-duration="500"
            className="relative border border-red-300 rounded-md shadow overflow-hidden transform group-hover:scale-105 transition duration-300 ease-in-out"
        >
            {/* Discount Badge */}
            {discount > 0 && (
                <span className="absolute top-2 left-2 bg-pry text-white text-xs px-2 py-1 rounded z-10">
                    SAVE {discount}%
                </span>
            )}

            
          

            {/* Clickable Content (single Link wrapper) */}
            <Link href={`/details/${product.id}`} className="block">
                {/* Image */}
                <div className="relative overflow-hidden">
                <img
                    src={`${baseURL}${product.image?.image}`}
                    alt={product.name}
                    className=" w-full h-38 lg:h-48 group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                  {/* Wishlist Icon */}
                  <button
                onClick={handleWishlist}
                type="button"
                className={`wishlist_btn ${isWishlisted ?  "bg-sec" : "bg-pry"}`}
            >
                <GoHeart  />
            </button>
                </div>
              

                {/* Details */}
                <div className="p-4 space-y-2">
                    <h3 className="text-sm h-16 font-semibold hover-text-sec transition">
                        {product.name.length > 30
                            ? product.name.slice(0, 50) + '...'
                            : product.name}
                    </h3>

                    {/* Price */}
                    <div className="text-pry font-bold text-base">
                        ৳{product.new_price}
                        {product.old_price && (
                            <span className="ml-2 text-gray-400 line-through">
                                ৳{product.old_price}
                            </span>
                        )}
                    </div>
                </div>
            </Link>

            {/* Actions (outside link so clicks don’t trigger navigation) */}
            <div className="px-4 pb-4 flex items-center justify-between gap-2">
                <button
                    onClick={handleaddtocard}
                    className="hover-bg-sec p-2 rounded-md bg-pry text-wt transition"
                >
                    <FaShoppingCart className="text-lg" />
                </button>

                <button
                    onClick={handleOrderNow}
                    className="hover-bg-sec flex-1 bg-pry text-wt text-[11px] lg:text-sm font-semibold py-2 rounded-md transition"
                >
                    Order Now
                </button>
            </div>
        </div>
    );
}
