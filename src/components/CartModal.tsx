import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Product } from "@/hooks/useProducts";

interface CartModalProps {
  cart: Product[];
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ cart, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="text-muted-foreground text-xs">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-primary text-white py-2 rounded-lg"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default CartModal;
