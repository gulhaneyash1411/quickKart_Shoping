
import React from "react";
import { motion } from "framer-motion";

const LoadingState = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-8"
      >
        <div className="flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-accent/70"
          />
        </div>
        
        <div className="space-y-2 text-center">
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-lg font-medium text-muted-foreground"
          >
            Loading premium products
          </motion.p>
          
          <div className="flex justify-center gap-1 pt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2
                }}
                className="w-2 h-2 rounded-full bg-primary"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingState;
