import { ArrowRight, Play, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/contexts/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import heroImage1 from '@/assets/Hero/image00694.jpeg';
import heroImage2 from '@/assets/Hero/image00695.jpeg';
import heroImage3 from '@/assets/Hero/image00700.jpeg';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const { t } = useLocale();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const heroTexts = [
    {
      title: t('heroText1'),
      description: t('heroDesc1')
    },
    {
      title: t('heroText2'),
      description: t('heroDesc2')
    },
    {
      title: t('heroText3'),
      description: t('heroDesc3')
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)' }}>
      {/* Full Screen Image Carousel */}
      <div className="absolute inset-0 w-full h-full" style={{ top: '80px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTextIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={[heroImage1, heroImage2, heroImage3][currentTextIndex]}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center text-white">
            {/* Badge */}
            <AnimatedSection delay={0.1}>
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
                <Zap className="h-4 w-4 text-red-400 mr-3" />
                <span className="text-caption text-white font-semibold">{t('heroTitle')}</span>
              </div>
            </AnimatedSection>

            {/* Main Heading */}
            <AnimatedSection delay={0.3}>
              <div className="space-y-6 mb-12">
                <div className="relative h-32 md:h-40 lg:h-48 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTextIndex}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                      <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center">
                        <span className="text-white drop-shadow-2xl">
                          {heroTexts[currentTextIndex].title}
                        </span>
                      </h1>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <div className="relative h-20 md:h-24 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`desc-${currentTextIndex}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <p className="text-lg md:text-xl lg:text-2xl text-white max-w-4xl mx-auto text-center leading-relaxed drop-shadow-lg">
                        {heroTexts[currentTextIndex].description.split('\n').map((line, index) => (
                          <span key={index}>
                            {line}
                            {index < heroTexts[currentTextIndex].description.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection delay={0.5} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <button 
                  onClick={() => scrollToSection('events')}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
                >
                  {t('registerNow')}
                  <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform" />
                </button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToSection('volunteers')}
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-md px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 hover:bg-white"
                >
                  <Play className="mr-2 h-5 w-5" />
                  {t('becomeVolunteer')}
                </Button>
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={0.7} direction="up">
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">500+</div>
                  <div className="text-sm md:text-base text-white drop-shadow-md">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">50+</div>
                  <div className="text-sm md:text-base text-white drop-shadow-md">Teams</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">3</div>
                  <div className="text-sm md:text-base text-white drop-shadow-md">Competition Days</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Image Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {[heroImage1, heroImage2, heroImage3].map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentTextIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentTextIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;