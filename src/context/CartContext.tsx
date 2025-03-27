import React, { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: string) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((p) => p.id === item.id && p.size === item.size);

      if (existingItemIndex !== -1) {
        // If the same item with the same size exists, increase the quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + item.quantity,
        };
        return updatedCart;
      }

      // If it's a new size or a new item, add it to the cart
      return [...prevCart, item];
    });
  };
  const removeFromCart = (id: number, size: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
    value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      cartCount: cart.reduce((acc, item) => acc + item.quantity, 0),
    }}
  >
    {children}
  </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
