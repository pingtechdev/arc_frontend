import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'bounce' | 'flip' | 'zoom';
  duration?: number;
  stagger?: boolean;
  repeat?: boolean;
  distance?: number;
  spring?: boolean;
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  duration = 0.6,
  stagger = false,
  repeat = false,
  distance = 80,
  spring = false
}: AnimatedSectionProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: !repeat,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': 
      case 'slideUp': return { y: distance, opacity: 0, scale: 0.95 };
      case 'down': 
      case 'slideDown': return { y: -distance, opacity: 0, scale: 0.95 };
      case 'left': 
      case 'slideLeft': return { x: distance, opacity: 0, scale: 0.95 };
      case 'right': 
      case 'slideRight': return { x: -distance, opacity: 0, scale: 0.95 };
      case 'fade': return { opacity: 0 };
      case 'scale': 
      case 'zoom': return { scale: 0.8, opacity: 0 };
      case 'rotate': return { rotate: -10, opacity: 0, scale: 0.9 };
      case 'bounce': return { y: distance, opacity: 0, scale: 0.8 };
      case 'flip': return { rotateY: -90, opacity: 0, scale: 0.9 };
      default: return { y: distance, opacity: 0, scale: 0.95 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'bounce': 
        return { 
          x: 0, 
          y: 0, 
          opacity: 1, 
          scale: 1,
          transition: {
            type: "spring",
            damping: 8,
            stiffness: 100,
            duration: 0.8
          }
        };
      case 'flip':
        return { 
          x: 0, 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          rotateY: 0,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.25, 0.25, 0.75]
          }
        };
      case 'zoom':
        return { 
          x: 0, 
          y: 0, 
          opacity: 1, 
          scale: 1,
          transition: {
            type: "spring",
            damping: 12,
            stiffness: 200,
            duration: 0.6
          }
        };
      default: 
        return { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, rotateY: 0 };
    }
  };

  const getHoverAnimation = () => {
    if (repeat) {
      return {
        y: [0, -5, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      };
    }
    return {};
  };

  const getTransition = () => {
    if (spring) {
      return {
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: duration,
        delay: delay,
        ...(stagger && {
          staggerChildren: 0.1
        })
      };
    }
    
    return {
      duration,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75],
      ...(stagger && {
        staggerChildren: 0.1
      })
    };
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={inView ? { ...getAnimatePosition(), ...getHoverAnimation() } : getInitialPosition()}
      whileHover={!repeat ? { 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2 } 
      } : {}}
      transition={getTransition()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;