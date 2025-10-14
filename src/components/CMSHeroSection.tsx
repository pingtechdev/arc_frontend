/**
 * CMS-powered Hero Section
 * This component fetches hero content from Wagtail CMS
 * Falls back to default content if CMS is unavailable
 */

import { ArrowRight, Play, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/contexts/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useState, useEffect } from 'react';
import { fetchHomePage } from '@/services/wagtailApi';

// Default fallback content
const defaultHeroContent = {
  title: "Welcome to ARC Lebanon",
  subtitle: "Building a Better Tomorrow",
  description: "Join us in making a difference in our community",
  stats: [
    { value: "500+", label: "Participants" },
    { value: "50+", label: "Teams" },
    { value: "3", label: "Competition Days" }
  ]
};

interface HeroContent {
  title: string;
  subtitle: string;
  description?: string;
  backgroundImage?: string;
  stats?: Array<{ value: string; label: string }>;
}

const CMSHeroSection = () => {
  const { t } = useLocale();
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Fetch content from Wagtail CMS
  useEffect(() => {
    const loadCMSContent = async () => {
      try {
        const homePage = await fetchHomePage();
        
        if (homePage) {
          setHeroContent({
            title: homePage.hero_title || defaultHeroContent.title,
            subtitle: homePage.hero_subtitle || defaultHeroContent.subtitle,
            description: homePage.hero_description || defaultHeroContent.description,
            backgroundImage: homePage.hero_background?.url,
            stats: defaultHeroContent.stats // Can be extended from CMS
          });
        }
      } catch (error) {
        console.error('Failed to load CMS content, using defaults:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCMSContent();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <section className="relative w-full overflow-hidden flex items-center justify-center" 
               style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative w-full overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)' }}>
      {/* Background */}
      <div className="absolute inset-0 w-full h-full" style={{ top: '80px' }}>
        {heroContent.backgroundImage ? (
          <div className="absolute inset-0 w-full h-full">
            <img
              src={heroContent.backgroundImage}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-900" />
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center" 
           style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center text-white">
            {/* Badge */}
            <AnimatedSection delay={0.1}>
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
                <Zap className="h-4 w-4 text-red-400 mr-3" />
                <span className="text-caption text-white font-semibold">
                  {t('heroTitle') || 'ARC Lebanon'}
                </span>
              </div>
            </AnimatedSection>

            {/* Main Heading - From CMS */}
            <AnimatedSection delay={0.3}>
              <div className="space-y-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-6">
                    <span className="text-white drop-shadow-2xl">
                      {heroContent.title}
                    </span>
                  </h1>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 drop-shadow-lg">
                    {heroContent.subtitle}
                  </h2>
                  
                  {heroContent.description && (
                    <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mt-6 drop-shadow-md">
                      {heroContent.description}
                    </p>
                  )}
                </motion.div>
              </div>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection delay={0.5} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <button 
                  onClick={() => scrollToSection('events')}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
                >
                  {t('registerNow') || 'Register Now'}
                  <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform" />
                </button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToSection('volunteers')}
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-md px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 hover:bg-white"
                >
                  <Play className="mr-2 h-5 w-5" />
                  {t('becomeVolunteer') || 'Become a Volunteer'}
                </Button>
              </div>
            </AnimatedSection>

            {/* Stats - From CMS or defaults */}
            <AnimatedSection delay={0.7} direction="up">
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                {heroContent.stats?.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-white drop-shadow-md">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CMSHeroSection;

