import React, { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((p) => p.id === item.id);
      if (existingItem) {
        return prevCart.map((p) => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, cartCount: cart.reduce((acc, item) => acc + item.quantity, 0) }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
