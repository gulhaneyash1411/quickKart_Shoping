
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Product } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.5, 
        delay: Math.min(index * 0.1, 0.8),
        ease: [0.16, 1, 0.3, 1]
      }}
      className="h-full"
    >
      <motion.div
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        onClick={onClick}
        className={cn(
          "h-full flex flex-col bg-card rounded-xl overflow-hidden cursor-pointer",
          "border border-border transition-all duration-300",
          "hover:shadow-lg hover:border-accent/20"
        )}
      >
        <div className="relative pt-[100%] bg-secondary">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </motion.div>
        </div>
        
        <div className="flex flex-col flex-1 p-4 gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium line-clamp-2 text-sm leading-snug flex-1">
              {product.title}
            </h3>
            <div className="text-primary font-semibold">
              ${product.price.toFixed(2)}
            </div>
          </div>
          
          <p className="text-muted-foreground text-xs line-clamp-2 mt-1 flex-1">
            {product.description}
          </p>
          
          <motion.div 
            className="flex items-center justify-between mt-3 pt-3 border-t border-border"
            whileHover={{ y: -2 }}
          >
            <div className="text-xs text-muted-foreground">
              {product.category}
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    duration: 0.3
                  }}
                  className={cn(
                    i < Math.round(product.rating.rate) 
                      ? "text-amber-500" 
                      : "text-muted"
                  )}
                >
                  ★
                </motion.span>
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                ({product.rating.count})
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
