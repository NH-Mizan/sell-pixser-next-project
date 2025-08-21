"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  console.log(cartItems)
  console.log(wishlistItems)

  // Add to Cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Add to Wishlist
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) return prev;
      return [...prev, product];
    });
  };

  // Remove from Wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const value = {
    cartItems,
    wishlistItems,
    addToCart,
    addToWishlist,
    removeFromCart,
    removeFromWishlist,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
