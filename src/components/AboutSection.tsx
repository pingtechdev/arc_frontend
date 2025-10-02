import { Target, Users, Trophy, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLocale } from '@/contexts/LocaleContext';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const AboutSection = () => {
  const { t } = useLocale();
  
  const values = [
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
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-heading text-4xl md:text-5xl mb-6">
            <span className="text-gradient">{t('aboutTitle')}</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            {t('aboutDescription')}
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <AnimatedSection direction="left">
            <div className="space-y-6">
              <h3 className="text-heading text-3xl">{t('ourMission')}</h3>
              <p className="text-body-lg text-muted-foreground">
                {t('missionDesc1')}
              </p>
              <p className="text-body-lg text-muted-foreground">
                {t('missionDesc2')}
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-display text-3xl text-secondary">5+</div>
                  <div className="text-caption text-muted-foreground">{t('yearsActive')}</div>
                </div>
                <div className="text-center">
                  <div className="text-display text-3xl text-secondary">1000+</div>
                  <div className="text-caption text-muted-foreground">{t('participants')}</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="relative">
              <div className="bg-gradient-primary rounded-2xl p-8 glow-tech">
                <h4 className="text-2xl font-bold text-white mb-4">{t('competitionCategories')}</h4>
                <div className="space-y-4">
                  {[
                    t('autonomousNav'),
                    t('robotSoccer'), 
                    t('lineFollowing'),
                    t('mazeSolving'),
                    t('sumoWrestling')
                  ].map((category, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <span className="text-white/90">{category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
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