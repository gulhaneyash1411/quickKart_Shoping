
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProduct, Product } from "@/hooks/useProducts";
import { modalVariants, backdropVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import { useCart } from "@/context/CartContext";
import { toast, Toaster } from "sonner";

interface ProductModalProps {
  productId: number | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ productId, onClose }) => {

  const { addToCart } = useCart(); // Access the cart context


  const modalRef = useRef<HTMLDivElement>(null);
  const { data: product, isLoading, error } = useProduct(productId || 0);
  console.log("Fetching product with ID:", productId);
  console.log("Product data:", product);
  console.log("Loading state:", isLoading);
  console.log("Error state:", error);

  useEffect(() => {
    if (product) {
      console.log("Product Category:", product.category);
    }
  }, [product]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);
  
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleAddToCart = () => {
    const quantitySelect = document.getElementById("quantity-select") as HTMLSelectElement;
    const sizeSelect = document.getElementById("size-select") as HTMLSelectElement | null; // Make nullable
  
    if (!quantitySelect) {
      console.error("Quantity dropdown not found");
      return;
    }
  
    const quantity = parseInt(quantitySelect.value, 10);
    const size = sizeSelect ? sizeSelect.value : null; // Handle missing size
  
    console.log("Selected Quantity:", quantity);
    console.log("Selected Size:", size || "N/A");
  
    if (product) {
      const cartItem: any = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      };
      // Add size only if it exists
      if (size) {
        cartItem.size = size;
      }
  
      console.log("Adding to cart:", cartItem);
      addToCart(cartItem); // Add to cart
      toast.success(`${product.title} added to cart!`);
      onClose(); // Close the modal after adding to cart
    }
  };
  
  return (
    <AnimatePresence>
      {productId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />
          
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              "relative w-full max-w-2xl max-h-[90vh] overflow-auto",
              "glass rounded-xl shadow-xl"
            )}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-full p-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {isLoading ? (
              <div className="p-8">
                <LoadingState />
              </div>
            ) : error ? (
              <div className="p-8">
                <ErrorState message="Error loading product details" />
              </div>
            ) : product ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center p-8"
                >
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </motion.div>
                
                <div className="flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-2"
                  >
                    <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                      {product.category}
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">{product.title}</h2>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-2 mb-4"
                  >
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i}
                          className={cn(
                            i < Math.round(product.rating.rate) 
                              ? "text-amber-500" 
                              : "text-muted"
                          )}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.rating.count} reviews)
                    </span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-3xl font-bold text-primary mb-6"
                  >
                    ${product.price.toFixed(2)}
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-muted-foreground mb-6"
                  >
                    {product.description}
                  </motion.p>
                  
                  <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-auto space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Quantity</div>
            <select id="quantity-select" className="w-full p-2 border rounded bg-card">
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {product && (product.category === "women's clothing" || product.category === "men's clothing") && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Size</div>
            <select id="size-select" className="w-full p-2 border rounded bg-card">
              {["S", "M", "L", "XL"].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium"
        >
          Add to Cart
        </motion.button>
      </motion.div>
      {/* Toast Notification */}
      <Toaster position="bottom-right" richColors />
                </div>
              </div>
            ) : null}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
