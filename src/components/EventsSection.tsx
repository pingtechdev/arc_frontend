import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocale } from '@/contexts/LocaleContext';
import AnimatedSection from './AnimatedSection';

const EventsSection = () => {
  const { t } = useLocale();
  
  const events = [
    {
      title: t('arcChampionship'),
      date: t('championshipDate'),
      time: t('championshipTime'),
      location: t('aubLocation'),
      participants: t('championshipParticipants'),
      description: t('championshipDesc'),
      status: t('registrationOpen'),
      statusColor: "bg-secondary"
    },
    {
      title: t('workshopTitle'),
      date: t('workshopDate'),
      time: t('workshopTime'),
      location: t('lauLocation'),
      participants: t('workshopParticipants'),
      description: t('workshopDesc'),
      status: t('comingSoon'),
      statusColor: "bg-accent"
    },
    {
      title: t('juniorChallenge'),
      date: t('juniorDate'),
      time: t('juniorTime'),
      location: t('usjLocation'),
      participants: t('juniorParticipants'),
      description: t('juniorDesc'),
      status: t('registrationOpensSoon'),
      statusColor: "bg-muted"
    }
  ];

  return (
    <section id="events" className="section-py bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{t('eventsTitle')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('eventsDescription')}
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <AnimatedSection key={index} delay={index * 0.1} direction="rotate" stagger={true}>
              <Card className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech group h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${event.statusColor} text-white`}>
                      {event.status}
                    </div>
                    <Calendar className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-secondary transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <Calendar className="h-4 w-4 text-secondary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Clock className="h-4 w-4 text-secondary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <MapPin className="h-4 w-4 text-secondary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Users className="h-4 w-4 text-secondary" />
                      <span>{event.participants}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full group border-secondary/20 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      {t('learnMore')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedSection delay={0.4} className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 glow-tech">
            <h3 className="text-2xl font-bold text-white mb-4">{t('dontMissOut')}</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              {t('newsletterDesc')}
            </p>
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
              {t('subscribeNow')}
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default EventsSection;