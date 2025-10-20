import { Target, Users, Trophy, Lightbulb, Heart, Star, Zap, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLocale } from '@/contexts/LocaleContext';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useState, useEffect } from 'react';
import { API_URLS } from '../lib/apiConfig';

const AboutSection = () => {
  const { t } = useLocale();
  const [aboutContent, setAboutContent] = useState<{title: string, content: string} | null>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [values, setValues] = useState<any[]>([]);
  
  // Default values
  const defaultValues = [
    {
      icon: Target,
      title: t('innovation'),
      description: t('innovationDesc')
    },
    {
      icon: Users,
      title: t('community'), 
      description: t('communityDesc')
    },
    {
      icon: Trophy,
      title: t('excellence'),
      description: t('excellenceDesc')
    },
    {
      icon: Lightbulb,
      title: t('learning'),
      description: t('learningDesc')
    }
  ];

  // Map icon names to components
  const getIcon = (iconName: string) => {
    const icons: any = {
      'Target': Target, 'Users': Users, 'Trophy': Trophy, 'Lightbulb': Lightbulb,
      'Heart': Heart, 'Star': Star, 'Zap': Zap, 'Award': Award
    };
    return icons[iconName] || Target;
  };

  // Fetch about content from CMS
  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        // Use the Wagtail API service
        const { fetchHomePage } = await import('@/services/wagtailApi');
        const homePageData = await fetchHomePage();
        
        if (homePageData) {
          
          if (homePageData.body && Array.isArray(homePageData.body)) {
            console.log('🔍 All body blocks:', homePageData.body.map((b: any) => b.type));
            
            // Extract about blocks (main content)
            const aboutBlocks = homePageData.body.filter((block: any) => block.type === 'about');
            if (aboutBlocks.length > 0) {
              const aboutBlock = aboutBlocks[0];
              const cleanContent = aboutBlock.value?.content?.replace(/<[^>]*>/g, '').trim() || '';
              const cleanTitle = aboutBlock.value?.title?.replace(/^["']|["']$/g, '').trim() || '';
              
              setAboutContent({
                title: cleanTitle,
                content: cleanContent
              });
            }
            
            // Extract stats
            const statBlocks = detailData.body.filter((block: any) => block.type === 'about_stats');
            if (statBlocks.length > 0 && Array.isArray(statBlocks[0].value)) {
              setStats(statBlocks[0].value);
              console.log('📊 About stats loaded:', statBlocks[0].value);
            }
            
            // Extract value cards
            const valueCardBlocks = detailData.body.filter((block: any) => block.type === 'value_cards');
            if (valueCardBlocks.length > 0 && Array.isArray(valueCardBlocks[0].value)) {
              const cmsValues = valueCardBlocks[0].value.map((v: any) => ({
                icon: getIcon(v.icon_name),
                title: v.title,
                description: v.description
              }));
              setValues(cmsValues);
              console.log('💎 Value cards loaded:', cmsValues);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load about content:', error);
      }
    };
    
    fetchAboutContent();
  }, []);

  // Force re-render when content changes
  useEffect(() => {
    if (aboutContent) {
      console.log('✅ About content loaded:', aboutContent);
    }
  }, [aboutContent]);

  useEffect(() => {
    if (stats.length > 0) {
      console.log('✅ About stats loaded:', stats);
    }
  }, [stats]);

  useEffect(() => {
    if (values.length > 0) {
      console.log('✅ Value cards loaded:', values);
    }
  }, [values]);

  // Debug: Log what we're actually displaying
  console.log('🔍 Displaying title:', aboutContent?.title || 'Loading...');
  console.log('🔍 Displaying content:', aboutContent?.content || 'Loading...');

  return (
    <section id="about" className="section-py relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-8 h-8 bg-secondary/10 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-6 h-6 bg-accent/15 rounded-full"
          animate={{
            y: [0, 25, 0],
            x: [0, -20, 0],
            opacity: [0.15, 0.4, 0.15]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main About Content from CMS */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-heading text-4xl md:text-5xl mb-6">
            <span className="text-gradient">
              {aboutContent?.title || 'Loading...'}
            </span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            {aboutContent?.content || 'Loading...'}
          </p>
        </AnimatedSection>

        {/* Mission Section - Using CMS content */}
        <div className="max-w-4xl mx-auto mb-20">
          <AnimatedSection direction="fade">
            <div className="space-y-6 text-center">
              
              
              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
                {stats.length > 0 ? stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-display text-3xl text-secondary">{stat.number}</div>
                    <div className="text-caption text-muted-foreground">{stat.label}</div>
                  </div>
                )) : (
                  <>
                    <div className="text-center">
                      <div className="text-display text-3xl text-secondary">5+</div>
                      <div className="text-caption text-muted-foreground">Years Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-display text-3xl text-secondary">1000+</div>
                      <div className="text-caption text-muted-foreground">Participants</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Values Grid - From CMS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(values.length > 0 ? values : defaultValues).map((value, index) => (
            <AnimatedSection key={index} delay={index * 0.1} direction="scale" stagger={true}>
              <Card className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech group h-full">
                <CardContent className="p-6 text-center">
                  <motion.div 
                    className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <value.icon className="h-8 w-8 text-secondary" />
                  </motion.div>
                  <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;