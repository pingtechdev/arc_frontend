import { ArrowRight, Play, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/contexts/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import heroImage1 from '@/assets/Hero/image00694.jpeg';
import heroImage2 from '@/assets/Hero/image00695.jpeg';
import heroImage3 from '@/assets/Hero/image00700.jpeg';
import { useState, useEffect } from 'react';

interface HeroSlide {
  title: string;
  description: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

const HeroSection = () => {
  const { t } = useLocale();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  // CMS Content State
  const [cmsContent, setCmsContent] = useState<any>(null);
  const [isLoadingCMS, setIsLoadingCMS] = useState(true);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  
  // Default fallback slides
  const defaultSlides: HeroSlide[] = [
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
  
  const defaultImages = [heroImage1, heroImage2, heroImage3];
  
  // Fetch content from Wagtail CMS
  useEffect(() => {
    const fetchCMSContent = async () => {
      try {
        // Fetch home page list with cache-busting
        const listResponse = await fetch('https://api.arc.pingtech.dev/api/v2/pages/?type=cms_app.HomePage', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        const listData = await listResponse.json();
        
        if (listData.items && listData.items.length > 0) {
          const homePageId = listData.items[0].id;
          
          // Fetch full details with cache-busting
          const detailResponse = await fetch(`https://api.arc.pingtech.dev/api/v2/pages/${homePageId}/`, {
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          });
          const detailData = await detailResponse.json();
          
          console.log('✅ CMS Content loaded:', detailData);
          setCmsContent(detailData);
          
          // Extract hero blocks from body
          if (detailData.body && Array.isArray(detailData.body)) {
            const heroBlocks = detailData.body.filter((block: any) => block.type === 'hero');
            
            console.log('🎬 Found hero blocks:', heroBlocks);
            
            if (heroBlocks.length > 0) {
              // Build slides from hero blocks
              const slides: HeroSlide[] = heroBlocks.map((block: any) => {
                // Get image URL - try different possible properties
                const imageUrl = block.value.background_image?.large || 
                                block.value.background_image?.original ||
                                block.value.background_image?.url;
                
                return {
                  title: block.value.title || '',
                  description: block.value.description?.replace(/<[^>]*>/g, '') || block.value.subtitle || '',
                  backgroundImage: imageUrl,
                  ctaText: block.value.cta_text,
                  ctaLink: block.value.cta_link,
                  secondaryCtaText: block.value.secondary_cta_text,
                  secondaryCtaLink: block.value.secondary_cta_link,
                };
              });
              
              setHeroSlides(slides);
              
              // Extract images - use the full image URL from API
              const images = heroBlocks
                .map((block: any) => {
                  const img = block.value.background_image;
                  return img?.large || img?.original || img?.url;
                })
                .filter((url: string | undefined) => url);
              
              setHeroImages(images.length > 0 ? images : defaultImages);
              
              console.log('✨ Slides created:', slides);
              console.log('🖼️ Images extracted:', images);
            } else {
              // No hero blocks, use defaults
              setHeroSlides(defaultSlides);
              setHeroImages(defaultImages);
            }
          } else {
            // No body content, use defaults
            setHeroSlides(defaultSlides);
            setHeroImages(defaultImages);
          }
        }
      } catch (error) {
        console.error('❌ Failed to load CMS content:', error);
        // On error, use defaults
        setHeroSlides(defaultSlides);
        setHeroImages(defaultImages);
      } finally {
        setIsLoadingCMS(false);
      }
    };
    
    fetchCMSContent();
  }, []);
  
  // Use slides from CMS or fallback to defaults
  const activeSlides = heroSlides.length > 0 ? heroSlides : defaultSlides;
  const activeImages = heroImages.length > 0 ? heroImages : defaultImages;
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % activeSlides.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [activeSlides.length]);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)' }}>
      {/* CMS Loading Indicator */}
      {isLoadingCMS && (
        <div className="fixed top-20 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm">
          🔄 Loading CMS content...
        </div>
      )}
      
      {/* Full Screen Image Carousel - Now from CMS */}
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
              src={activeImages[currentTextIndex % activeImages.length]}
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
            {/* Badge - Shows hero title from CMS or fallback */}
            <AnimatedSection delay={0.1}>
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
                <Zap className="h-4 w-4 text-red-400 mr-3" />
                <span className="text-caption text-white font-semibold">
                  {cmsContent?.hero_title || t('heroTitle')}
                </span>
              </div>
            </AnimatedSection>

            {/* Main Heading - Rotating from CMS hero blocks */}
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
                          {activeSlides[currentTextIndex].title}
                        </span>
                      </h1>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Rotating descriptions from CMS */}
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
                        {activeSlides[currentTextIndex].description.split('\n').map((line, index) => (
                          <span key={index}>
                            {line}
                            {index < activeSlides[currentTextIndex].description.split('\n').length - 1 && <br />}
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
                {/* Primary CTA Button */}
                {(activeSlides[currentTextIndex]?.ctaText || activeSlides[currentTextIndex]?.ctaLink) && (
                  <button 
                    onClick={() => {
                      if (activeSlides[currentTextIndex]?.ctaLink) {
                        window.location.href = activeSlides[currentTextIndex].ctaLink!;
                      } else {
                        scrollToSection('events');
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
                  >
                    {activeSlides[currentTextIndex]?.ctaText || t('registerNow')}
                    <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
                
                {/* Secondary CTA Button */}
                {(activeSlides[currentTextIndex]?.secondaryCtaText || activeSlides[currentTextIndex]?.secondaryCtaLink) && (
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => {
                      if (activeSlides[currentTextIndex]?.secondaryCtaLink) {
                        window.location.href = activeSlides[currentTextIndex].secondaryCtaLink!;
                      } else {
                        scrollToSection('volunteers');
                      }
                    }}
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-md px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 hover:bg-white"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {activeSlides[currentTextIndex]?.secondaryCtaText || t('becomeVolunteer')}
                  </Button>
                )}
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
          {activeSlides.map((_, index) => (
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
