import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";

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

const CartModal: React.FC<CartModalProps> = ({ cart, onClose }) => {
  console.log("Cart items:", cart);

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
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
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
          <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center gap-4 border-b pb-3">
                <img 
                src={item.image} 
                alt={item.title} 
                className="w-16 h-16 object-cover rounded" 
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="text-gray-600 text-xs">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-600 text-xs">Quantity: {item.quantity}</p>
                  <p className="text-gray-900 font-semibold text-sm">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm font-medium">
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
