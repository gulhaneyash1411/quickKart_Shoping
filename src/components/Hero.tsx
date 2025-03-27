
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const phrases = ["Modern Living", "Next-Level Comfort", "Redefining Luxury"];
const Hero = () => {

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <section
      id="about"
      className="relative overflow-hidden min-h-screen flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-24 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/computer-mouse-paper-bag-blue-background-top-view_169016-43756.jpg?ga=GA1.1.216434056.1740477096&semt=ais_hybrid')",
      }}
    >
      {/* Dark overlay to improve text readability */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center text-center space-y-4 text-white">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="space-y-4 text-center"
  >
    <h1 className="text-2xl font-bold tracking-tight sm:text-5xl md:text-6xl">
      Premium Products for
    </h1>
        {/* Text Slide In/Out Animation */}
        <AnimatePresence mode="wait">
      <motion.span
        key={index}
        className=" text-3xl font-bold  bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent inline-block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ display: "block" }} // Ensure it behaves like a block element
      >
        {phrases[index]}
      </motion.span>
    </AnimatePresence>
    {/* Description */}
    <p className="max-w-[600px] mx-auto text-white/90 md:text-xl lg:text-lg xl:text-xl">
      Beautifully designed products with exceptional attention to detail and premium quality.
    </p>
  </motion.div>

  {/* Buttons */}
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
      className="px-6 py-3 text-base font-medium text-white bg-purple-600 rounded-lg"
    >
      Explore Collection
    </motion.a>
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href="#contact"
      className="px-6 py-3 text-base font-medium bg-yellow-400 text-black rounded-lg"
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
