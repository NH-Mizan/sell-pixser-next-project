'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const addToWishlist = (product) => {
    setWishlistItems((prev) => [...prev, product]);
  };

  const value = {
    cartItems,
    wishlistItems,
    addToCart,
    addToWishlist,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
