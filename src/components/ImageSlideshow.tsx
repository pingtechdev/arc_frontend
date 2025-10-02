import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import all ARC images
import image00691 from '@/assets/arc/image00691.jpeg';
import image00692 from '@/assets/arc/image00692.jpeg';
import image00693 from '@/assets/arc/image00693.jpeg';
import image00694 from '@/assets/arc/image00694.jpeg';
import image00695 from '@/assets/arc/image00695.jpeg';
import image00696 from '@/assets/arc/image00696.jpeg';
import image00697 from '@/assets/arc/image00697.jpeg';
import image00698 from '@/assets/arc/image00698.jpeg';
import image00699 from '@/assets/arc/image00699.jpeg';
import image00700 from '@/assets/arc/image00700.jpeg';
import image00701 from '@/assets/arc/image00701.jpeg';
import image00702 from '@/assets/arc/image00702.png';
import image00703 from '@/assets/arc/image00703.jpeg';
import image00704 from '@/assets/arc/image00704.jpeg';
import image00705 from '@/assets/arc/image00705.jpeg';
import image00706 from '@/assets/arc/image00706.jpeg';
import image00707 from '@/assets/arc/image00707.jpeg';
import image00708 from '@/assets/arc/image00708.jpeg';
import image00709 from '@/assets/arc/image00709.jpeg';

const arcImages = [
  image00691,
  image00692,
  image00693,
  image00694,
  image00695,
  image00696,
  image00697,
  image00698,
  image00699,
  image00700,
  image00701,
  image00702,
  image00703,
  image00704,
  image00705,
  image00706,
  image00707,
  image00708,
  image00709,
];

interface ImageSlideshowProps {
  className?: string;
  duration?: number;
}

const ImageSlideshow = ({ className = '', duration = 5000 }: ImageSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % arcImages.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={arcImages[currentIndex]}
            alt={`ARC Competition ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {arcImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;
