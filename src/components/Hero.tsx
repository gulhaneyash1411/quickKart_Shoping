
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent -z-10" />
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
              Premium Products for
              <br />
              <span className="text-gradient">Modern Living</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-balance">
            Beautifully designed products with exceptional attention to detail and premium quality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#products"
              className="px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-lg"
            >
              Explore Collection
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-6 py-3 text-base font-medium bg-secondary text-secondary-foreground rounded-lg"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
