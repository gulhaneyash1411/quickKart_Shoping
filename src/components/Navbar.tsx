
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Import the cart context
import CartModal from "./CartModal";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}
const Navbar = () => {
  const { toast } = useToast();

  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { cart } = useCart(); // Get cart from context
  const cartCount = cart.length; // Update cart count dynamically


const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);



  

  const handleLogoClick = () => {
    toast({
      title: "Welcome!",
      description: "Discover our curated collection of premium products.",
    });
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="container flex items-center justify-between h-16 px-4 md:px-6"
      >
        <div 
          className="flex items-center cursor-pointer" 
          onClick={handleLogoClick}
        >
        <img 
            src="/Quickkart_logo.png" 
            alt="QuickKart Logo" 
            className="w-10 h-10 mr-2"
          />
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="mr-2 text-primary font-bold text-2xl"
          >
            QuickKart
          </motion.div>
        </div>

        <nav className="hidden md:flex space-x-8">
          {[ 'About', 'Products', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors subtle-underline"
              )}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>


        <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground rounded-md hidden md:flex"
              onClick={() => setIsCartOpen(true)}
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </motion.button>
          </div>
      </motion.div>
    </header>
    {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;
