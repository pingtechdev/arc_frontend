import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Image as ImageIcon, X, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/contexts/LocaleContext';

// Import ARC videos and images
import arcVideo from '@/assets/gallery/2025_final_video.mp4';
import image00691 from '@/assets/gallery/image00691.jpeg';
import image00692 from '@/assets/gallery/image00692.jpeg';
import image00693 from '@/assets/gallery/image00693.jpeg';
import image00696 from '@/assets/gallery/image00696.jpeg';
import image00697 from '@/assets/gallery/image00697.jpeg';
import image00698 from '@/assets/gallery/image00698.jpeg';
import image00699 from '@/assets/gallery/image00699.jpeg';
import image00701 from '@/assets/gallery/image00701.jpeg';
import image00702 from '@/assets/gallery/image00702.png';
import image00703 from '@/assets/gallery/image00703.jpeg';
import image00704 from '@/assets/gallery/image00704.jpeg';
import image00705 from '@/assets/gallery/image00705.jpeg';
import image00706 from '@/assets/gallery/image00706.jpeg';
import image00707 from '@/assets/gallery/image00707.jpeg';
import image00708 from '@/assets/gallery/image00708.jpeg';
import image00709 from '@/assets/gallery/image00709.jpeg';
// HEIC files removed due to compatibility issues
import IMG_9871 from '@/assets/gallery/IMG_9871.PNG';
import IMG_9872 from '@/assets/gallery/IMG_9872.PNG';
import IMG_9873 from '@/assets/gallery/IMG_9873.JPG';
import IMG_9874 from '@/assets/gallery/IMG_9874.JPG';
import IMG_9875 from '@/assets/gallery/IMG_9875.JPG';
import IMG_9876 from '@/assets/gallery/IMG_9876.JPG';
import IMG_9890 from '@/assets/gallery/IMG_9890.JPG';
import IMG_9891 from '@/assets/gallery/IMG_9891.JPG';

interface UnifiedGalleryProps {
  title?: string;
  description?: string;
  className?: string;
  cmsImages?: any[];
}

const UnifiedGallery = ({ className = '', title, description, cmsImages = [] }: UnifiedGalleryProps) => {
  const { t } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Default media array with both videos and images
  const defaultMediaItems = [
    // Videos
    { 
      type: 'video',
      src: arcVideo, 
      poster: image00691, 
      title: "ARC 2025 Competition Highlights", 
      description: "Watch the most exciting moments from our robotics competition, featuring innovative designs, intense competition, and the spirit of innovation." 
    },
    { 
      type: 'video',
      src: arcVideo, 
      poster: image00692, 
      title: "Championship Finals", 
      description: "Intense robot battles in the main arena showcasing the best of robotics engineering." 
    },
    { 
      type: 'video',
      src: arcVideo, 
      poster: image00693, 
      title: "Team Collaboration", 
      description: "Students working together on their robots, demonstrating teamwork and innovation." 
    },
    { 
      type: 'video',
      src: arcVideo, 
      poster: image00696, 
      title: "Autonomous Challenge", 
      description: "Robots navigating complex obstacle courses with advanced AI and machine learning." 
    },
    { 
      type: 'video',
      src: arcVideo, 
      poster: image00697, 
      title: "Technical Workshop", 
      description: "Learning advanced robotics concepts and cutting-edge technology applications." 
    },
    { 
      type: 'video',
      src: arcVideo, 
      poster: image00698, 
      title: "Award Ceremony", 
      description: "Celebrating the winners and recognizing outstanding achievements in robotics." 
    },
    
    // Images
    { type: 'image', src: image00691, title: "Championship Finals", description: "Intense robot battles in the main arena" },
    { type: 'image', src: image00692, title: "Team Collaboration", description: "Students working together on their robots" },
    { type: 'image', src: image00693, title: "Autonomous Challenge", description: "Robots navigating complex obstacle courses" },
    { type: 'image', src: image00696, title: "Technical Workshop", description: "Learning advanced robotics concepts" },
    { type: 'image', src: image00697, title: "Competition Setup", description: "Preparing for the main event" },
    { type: 'image', src: image00698, title: "Robot Showcase", description: "Displaying innovative robot designs" },
    { type: 'image', src: image00699, title: "Award Ceremony", description: "Celebrating the winners of ARC 2023" },
    { type: 'image', src: image00701, title: "Behind the Scenes", description: "Preparation and setup for the competition" },
    { type: 'image', src: image00702, title: "Innovation Lab", description: "Exploring cutting-edge technology" },
    { type: 'image', src: image00703, title: "Team Strategy", description: "Planning and discussing robot tactics" },
    { type: 'image', src: image00704, title: "Final Moments", description: "The excitement of competition finale" },
    { type: 'image', src: image00705, title: "Robotics Excellence", description: "Demonstrating technical prowess" },
    { type: 'image', src: image00706, title: "Community Spirit", description: "Bringing together robotics enthusiasts" },
    { type: 'image', src: image00707, title: "Future Innovators", description: "Inspiring the next generation" },
    { type: 'image', src: image00708, title: "Technical Mastery", description: "Showcasing advanced engineering skills" },
    { type: 'image', src: image00709, title: "Competitive Edge", description: "Pushing the boundaries of robotics" },
    { type: 'image', src: image00709, title: "Learning Experience", description: "Educational moments throughout the event" },
    { type: 'image', src: image00708, title: "Victory Celebration", description: "Recognizing outstanding achievements" },
    { type: 'image', src: IMG_9871, title: "Innovation Showcase", description: "Highlighting creative solutions" },
    { type: 'image', src: IMG_9872, title: "Team Spirit", description: "Collaboration and camaraderie" },
    { type: 'image', src: IMG_9873, title: "Technical Excellence", description: "Advanced engineering in action" },
    { type: 'image', src: IMG_9874, title: "Competition Intensity", description: "High-stakes robotics battles" },
    { type: 'image', src: IMG_9875, title: "Educational Impact", description: "Learning through competition" },
    { type: 'image', src: IMG_9876, title: "Future Vision", description: "Shaping tomorrow's technology" },
    { type: 'image', src: IMG_9890, title: "Community Engagement", description: "Bringing people together" },
    { type: 'image', src: IMG_9891, title: "Success Stories", description: "Celebrating achievements" }
  ];

  // Use CMS images if available, otherwise use default
  const mediaItems = cmsImages.length > 0 ? cmsImages : defaultMediaItems;

  const nextMedia = () => {
    setActiveIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMedia = () => {
    setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
    setIsVideoPlaying(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsVideoPlaying(false);
  };

  const nextModalMedia = () => {
    setModalIndex((prev) => (prev + 1) % mediaItems.length);
    setIsVideoPlaying(false);
  };

  const prevModalMedia = () => {
    setModalIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setIsVideoPlaying(false);
  };

  const toggleVideoPlay = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleVideoMute = () => {
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      {(title || description) && (
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-gradient">{title || t('galleryTitle')}</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {description || t('galleryDescription')}
          </motion.p>
        </motion.div>
      )}

      {/* Main Media Display */}
      <motion.div 
        className="relative max-w-4xl mx-auto mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div 
          className="relative aspect-video bg-muted/30 rounded-2xl overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          onClick={() => openModal(activeIndex)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.1, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              {mediaItems[activeIndex].type === 'video' ? (
                <video
                  src={mediaItems[activeIndex].src}
                  poster={mediaItems[activeIndex].poster}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                />
              ) : (
                <motion.img
                  src={mediaItems[activeIndex].src}
                  alt={mediaItems[activeIndex].title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              )}
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
              
              {/* Media Info */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <motion.h3 
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  {mediaItems[activeIndex].title}
                </motion.h3>
                <motion.p 
                  className="text-white/90"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {mediaItems[activeIndex].description}
                </motion.p>
              </motion.div>

              {/* Play Button Overlay for Videos */}
              {mediaItems[activeIndex].type === 'video' && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="bg-red-500/90 backdrop-blur-sm rounded-full p-4"
                  >
                    <Play className="h-8 w-8 text-white" />
                  </motion.div>
                </motion.div>
              )}

              {/* Media Type Indicator */}
              <motion.div 
                className="absolute top-4 right-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                  {mediaItems[activeIndex].type === 'video' ? (
                    <Play className="h-4 w-4 text-white" />
                  ) : (
                    <ImageIcon className="h-4 w-4 text-white" />
                  )}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            className="absolute inset-0 flex items-center justify-between px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={prevMedia}
              className="bg-white/90 hover:bg-white text-black border-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextMedia}
              className="bg-white/90 hover:bg-white text-black border-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Thumbnail Navigation */}
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="flex space-x-2 overflow-x-auto max-w-full pb-2">
          {mediaItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                openModal(index);
              }}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                index === activeIndex 
                  ? 'border-red-500 scale-110' 
                  : 'border-gray-300 hover:border-red-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <img
                src={item.type === 'video' ? item.poster : item.src}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {index === activeIndex && (
                <motion.div 
                  className="absolute inset-0 bg-red-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {item.type === 'video' ? (
                  <Play className="h-4 w-4 text-white" />
                ) : (
                  <ImageIcon className="h-4 w-4 text-white" />
                )}
              </motion.div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Media Counter */}
      <motion.div 
        className="text-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <motion.span 
          className="text-sm text-muted-foreground"
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeIndex + 1} of {mediaItems.length}
        </motion.span>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-6xl max-h-[90vh] w-full mx-4 bg-white rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Content */}
              <div className="relative">
                {mediaItems[modalIndex].type === 'video' ? (
                  <div className="relative">
                    <video
                      src={mediaItems[modalIndex].src}
                      poster={mediaItems[modalIndex].poster}
                      className="w-full h-auto max-h-[70vh] object-contain"
                      controls
                      autoPlay={isVideoPlaying}
                      muted={isVideoMuted}
                      loop
                    />
                    {/* Video Controls Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button
                          onClick={toggleVideoPlay}
                          className="w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          {isVideoPlaying ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={toggleVideoMute}
                          className="w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          {isVideoMuted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={mediaItems[modalIndex].src}
                    alt={mediaItems[modalIndex].title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                )}

                {/* Media Info */}
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold mb-2">{mediaItems[modalIndex].title}</h3>
                  <p className="text-muted-foreground">{mediaItems[modalIndex].description}</p>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevModalMedia}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextModalMedia}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnifiedGallery;
