
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ContactForm from "@/components/ContactForm";
import { CartProvider } from "@/context/CartContext";

const IndexPage = () => {
  const { data: products, isLoading, error, refetch } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  
  // Animation values based on scroll
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  // Handle product selection for modal
  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
    document.body.style.overflow = "hidden";
  };
  
  // Handle modal close
  const handleCloseModal = () => {
    setSelectedProductId(null);
    document.body.style.overflow = "auto";
  };
  
  // Clean up overflow style on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <motion.div
          style={{ opacity, scale }}
          className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent" />
          <motion.div
            animate={{ 
              opacity: [0.2, 0.3, 0.2], 
              rotate: [0, 10],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "mirror",
            }}
            className="absolute top-[-30%] right-[-10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-[100px]"
          />
          <motion.div
            animate={{ 
              opacity: [0.2, 0.3, 0.2], 
              rotate: [0, -10],
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              repeatType: "mirror",
            }}
            className="absolute bottom-[-30%] left-[-10%] w-[70%] h-[70%] rounded-full bg-accent/5 blur-[100px]"
          />
        </motion.div>
        
        <Hero />
        
        <section id="products" className="py-16 lg:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Our Collection
              </h2>
              <p className="mt-4 text-muted-foreground max-w-[700px]">
                Discover our carefully curated selection of premium products designed with quality and style in mind.
              </p>
            </motion.div>
            
            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState onRetry={() => refetch()} />
            ) : products?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onClick={() => handleProductClick(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        </section>
        
        <section id="contact" className="py-16 lg:py-24 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Get in Touch
              </h2>
              <p className="mt-4 text-muted-foreground max-w-[700px]">
                Have questions about our products or services? Reach out to us directly using the form below.
              </p>
            </motion.div>
            
            <ContactForm />
          </div>
        </section>
        
        <footer className="py-12 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold mb-4">QuickKart</h3>
                <p className="text-sm text-muted-foreground">
                  Premium products for modern living, designed with care and attention to detail.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Links</h3>
                <ul className="space-y-2">
                {['Products', 'About', 'Contact', 'Terms', 'Privacy'].map(item => (
                    <li key={item}>
                      <a 
                        href={`#${item.toLowerCase()}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors subtle-underline"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="p-2 text-sm flex-1 border rounded-l-md bg-card"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-r-md text-sm">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} QuickKart. All rights reserved.</p>
            </div>
          </div>
        </footer>
        
        <ProductModal 
        productId={selectedProductId} 
        onClose={handleCloseModal} 
        />
      </div>
    </CartProvider>
  );
};

export default IndexPage;
