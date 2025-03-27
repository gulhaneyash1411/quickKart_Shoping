import React from "react";
import { motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartModalProps {
  cart: Product[];
  onClose: () => void;
}

const CartModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cart, removeFromCart } = useCart(); // Get cart & remove function

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleProceedToPay = () => {
    const paymentToast = toast.loading("Processing Payment...");
    setTimeout(() => {
      toast.success("Payment Successful! 🎉", {
        id: paymentToast,
        duration: 3000,
      });
    }, 2000);
    onClose();
  };
  return (
    <div 
      className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-300"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-white">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-white/80">Your cart is empty.</p>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-3 border-white/20">
                <button onClick={() => removeFromCart(item.id)} className="text-white hover:text-red-500">
                  <Trash2 size={18} />
                </button>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-16 h-16 object-cover rounded" 
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white">{item.title}</h3>
                  <p className="text-gray-200 text-xs">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-200 text-xs">Quantity: {item.quantity}</p>
                  <p className="text-white font-semibold text-sm">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-4 p-3 bg-white/20 backdrop-blur-sm rounded-lg">
            <p className="text-sm font-medium text-white">
              Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):
              <span className="font-semibold"> ${totalPrice.toFixed(2)}</span>
            </p>
          </div>
        )}

        {cart.length > 0 && (
          <button
            onClick={handleProceedToPay}
            className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-semibold"
          >
            Proceed to Pay
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default CartModal;
