import { create } from "zustand";
import { persist } from "zustand/middleware";

const useShopStore = create(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      compare: [],

      // ✅ Add to Cart
      addToCart: (product) =>
        set((state) => {
          const alreadyExist = state.cart.find((item) => item.id === product.id);
          if (alreadyExist) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      // ✅ Remove from Cart
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      // ✅ Clear Cart
      clearCart: () => set({ cart: [] }),

      // ✅ Add to Wishlist
      addToWishlist: (product) =>
        set((state) => {
          const alreadyExist = state.wishlist.find((item) => item.id === product.id);
          if (alreadyExist) return state;
          return { wishlist: [...state.wishlist, product] };
        }),

      // ✅ Remove from Wishlist
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        })),

      // ✅ Add to Compare
      addToCompare: (product) =>
        set((state) => {
          const alreadyExist = state.compare.find((item) => item.id === product.id);
          if (alreadyExist) return state;
          return { compare: [...state.compare, product] };
        }),

      // ✅ Remove from Compare
      removeFromCompare: (id) =>
        set((state) => ({
          compare: state.compare.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "shop-storage", // localStorage key
    }
  )
);

export default useShopStore;
