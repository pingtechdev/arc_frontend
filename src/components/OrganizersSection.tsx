import { Building2, Users, Award, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLocale } from '@/contexts/LocaleContext';
import AnimatedSection from './AnimatedSection';

// Import organizer logos
import organizer1 from '@/assets/organizers/IMG_9897.JPG';
import organizer2 from '@/assets/organizers/IMG_9898.PNG';
import organizer3 from '@/assets/organizers/Kalimat.png';
import organizer4 from '@/assets/organizers/tajamo.jpg';

const OrganizersSection = () => {
  const { t } = useLocale();
  
  const organizers = [
    {
      name: "Kalimat",
      logo: organizer3,
      description: "Leading educational technology company supporting robotics education",
      role: "Main Sponsor"
    },
    {
      name: "Teachers Association",
      logo: organizer4,
      description: "Professional organization of educators promoting STEM education",
      role: "Educational Partner"
    },
    {
      name: "Technical Committee",
      logo: organizer1,
      description: "Expert panel ensuring fair competition and technical excellence",
      role: "Technical Oversight"
    },
    {
      name: "University Partners",
      logo: organizer2,
      description: "Academic institutions providing venue and technical support",
      role: "Academic Partners"
    }
  ];

  const stats = [
    {
      icon: Building2,
      number: "15+",
      label: "Partner Organizations"
    },
    {
      icon: Users,
      number: "50+",
      label: "Expert Volunteers"
    },
    {
      icon: Award,
      number: "5+",
      label: "Years Experience"
    },
    {
      icon: Globe,
      number: "3",
      label: "Countries Represented"
    }
  ];

  return (
    <section id="organizers" className="section-py">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16" direction="fade">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Our Organizers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated organizations and individuals who make ARC possible through their expertise, resources, and commitment to robotics education.
          </p>
        </AnimatedSection>

        {/* Organizers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {organizers.map((organizer, index) => (
            <AnimatedSection key={index} delay={index * 0.1} direction="slideUp" distance={50}>
              <Card className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center">
                      <img 
                        src={organizer.logo} 
                        alt={`${organizer.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="logo-fallback hidden w-full h-full items-center justify-center text-muted-foreground text-xs">
                        {organizer.name.charAt(0)}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{organizer.name}</h3>
                    <p className="text-sm text-secondary font-medium mb-2">{organizer.role}</p>
                    <p className="text-sm text-muted-foreground">{organizer.description}</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Statistics */}
        <AnimatedSection className="mb-16" direction="fade" delay={0.4}>
          <h3 className="text-3xl font-bold text-center mb-12">Organizer Impact</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1} direction="flip" stagger={true}>
                <Card className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="text-2xl font-bold text-secondary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection className="text-center" direction="zoom" delay={0.6}>
          <div className="bg-gradient-primary rounded-2xl p-12 glow-tech">
            <h3 className="text-3xl font-bold text-white mb-6">Join Our Network</h3>
            <p className="text-white/90 text-lg max-w-4xl mx-auto leading-relaxed mb-8">
              Are you an organization passionate about robotics education? We're always looking for new partners to help us expand our impact and reach more students across the region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-lg font-medium transition-all duration-300">
                Become a Partner
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-medium transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default OrganizersSection;
