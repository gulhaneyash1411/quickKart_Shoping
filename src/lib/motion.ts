
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

export const slideInRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleOnHover = {
  whileHover: { 
    scale: 1.03,
    transition: { duration: 0.3 }
  }
};

export const modalVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    scale: 0.98,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  }
};

export const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};
