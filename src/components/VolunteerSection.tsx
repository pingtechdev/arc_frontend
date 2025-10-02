import { Users, Heart, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocale } from '@/contexts/LocaleContext';
import AnimatedSection from './AnimatedSection';
import volunteerImage from '@/assets/gallery/image00702.png';

const VolunteerSection = () => {
  const { t } = useLocale();
  const benefits = [
    {
      icon: Users,
      title: t('communityImpact'),
      description: t('communityImpactDesc')
    },
    {
      icon: Heart,
      title: t('meaningfulExperience'),
      description: t('meaningfulExperienceDesc')
    },
    {
      icon: Star,
      title: t('skillDevelopment'),
      description: t('skillDevelopmentDesc')
    }
  ];

  return (
    <section id="volunteers" className="section-py bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16" direction="fade">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{t('volunteerTitle')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('volunteerDescription')}
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <AnimatedSection direction="slideLeft" distance={100} delay={0.2}>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden glow-tech">
                <img 
                  src={volunteerImage} 
                  alt="Volunteers helping with robotics" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              
              {/* Overlay Stats */}
              <AnimatedSection delay={0.4} direction="bounce">
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-secondary">200+</div>
                        <div className="text-sm text-muted-foreground">{t('activeVolunteers')}</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">5+</div>
                        <div className="text-sm text-muted-foreground">{t('yearsRunning')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Content Side */}
          <AnimatedSection direction="slideRight" distance={100} delay={0.3}>
            <div className="space-y-8">
              <AnimatedSection delay={0.4} direction="slideUp" distance={30}>
                <div>
                  <h3 className="text-3xl font-bold mb-4">{t('whyVolunteer')}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t('volunteerDesc')}
                  </p>
                </div>
              </AnimatedSection>

              {/* Benefits Grid */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <AnimatedSection key={index} delay={index * 0.1} direction="flip" stagger={true}>
                    <Card className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                              <benefit.icon className="h-6 w-6 text-secondary" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                            <p className="text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>

              {/* CTA Button */}
              <AnimatedSection delay={0.6} direction="bounce">
                <div className="pt-4">
                  <Button className="btn-hero group text-base">
                    {t('joinNow')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;