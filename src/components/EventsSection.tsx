import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocale } from '@/contexts/LocaleContext';
import AnimatedSection from './AnimatedSection';
import { useState, useEffect } from 'react';

const EventsSection = () => {
  const { t } = useLocale();
  const [events, setEvents] = useState<any[]>([]);
  const [ctaData, setCtaData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fallback events
  const defaultEvents = [
   
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
    
  ];

  // Fetch events from CMS
  useEffect(() => {
    const fetchEventsContent = async () => {
      try {
        const listResponse = await fetch('http://localhost:8000/api/v2/pages/?type=cms_app.HomePage', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        const listData = await listResponse.json();
        
        if (listData.items && listData.items.length > 0) {
          const homePageId = listData.items[0].id;
          const detailResponse = await fetch(`http://localhost:8000/api/v2/pages/${homePageId}/`, {
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          });
          const detailData = await detailResponse.json();
          
          console.log('✅ Events CMS Content loaded:', detailData);
          
          if (detailData.body && Array.isArray(detailData.body)) {
            // Extract event detail blocks
            const eventBlocks = detailData.body.filter((block: any) => block.type === 'event_details');
            
            if (eventBlocks.length > 0) {
              // event_details is a ListBlock, so block.value is an array of events
              const cmsEvents: any[] = [];
              eventBlocks.forEach((block: any) => {
                console.log('📦 Event block value:', block.value);
                // block.value is an array of event objects
                if (Array.isArray(block.value)) {
                  block.value.forEach((eventData: any) => {
                    console.log('📋 Individual event data:', eventData);
                    cmsEvents.push({
                      title: eventData.title || '',
                      date: eventData.date || '',
                      time: eventData.time || '',
                      location: eventData.location || '',
                      participants: eventData.participants || '',
                      description: eventData.description || '',
                      status: eventData.status || '',
                      statusColor: eventData.status_color || 'bg-secondary',
                      buttonText: eventData.button_text || 'Learn More',
                      buttonLink: eventData.button_link || '#',
                      image: eventData.image
                    });
                  });
                }
              });
              
              setEvents(cmsEvents);
              console.log('✨ Events loaded from CMS:', cmsEvents);
            } else {
              console.log('⚠️ No event blocks found, using defaults');
              setEvents(defaultEvents);
            }
            
            // Extract CTA block
            const ctaBlocks = detailData.body.filter((block: any) => block.type === 'events_cta');
            if (ctaBlocks.length > 0) {
              setCtaData(ctaBlocks[0].value);
            }
          }
        }
      } catch (error) {
        console.error('❌ Failed to load events from CMS:', error);
        setEvents(defaultEvents);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEventsContent();
  }, []);
  
  const activeEvents = events.length > 0 ? events : defaultEvents;

  // Separate featured event (first one) from others
  const featuredEvent = activeEvents[0];
  const otherEvents = activeEvents.slice(1);

  return (
    <section id="events" className="section-py bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout: Title + Featured Event */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          {/* Left Column: Title and Description */}
          <AnimatedSection direction="left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">{t('eventsTitle')}</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('eventsDescription')}
            </p>
          </AnimatedSection>

          {/* Right Column: Featured Event Card */}
          <AnimatedSection direction="right">
            {featuredEvent && (
              <Card className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech group h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${featuredEvent.statusColor} text-white`}>
                      {featuredEvent.status}
                    </div>
                    <Calendar className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-secondary transition-colors">
                    {featuredEvent.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {featuredEvent.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <Calendar className="h-4 w-4 text-secondary" />
                      <span>{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Clock className="h-4 w-4 text-secondary" />
                      <span>{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <MapPin className="h-4 w-4 text-secondary" />
                      <span>{featuredEvent.location}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Users className="h-4 w-4 text-secondary" />
                      <span>{featuredEvent.participants}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full group border-secondary/20 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
                      onClick={() => featuredEvent.buttonLink && featuredEvent.buttonLink !== '#' ? window.location.href = featuredEvent.buttonLink : null}
                    >
                      {featuredEvent.buttonText || t('learnMore')}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </AnimatedSection>
        </div>

        {/* Other Events Grid (if more than 1 event) */}
        {otherEvents.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {otherEvents.map((event, index) => (
              <AnimatedSection key={index} delay={index * 0.1} direction="up" stagger={true}>
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
                        onClick={() => event.buttonLink && event.buttonLink !== '#' ? window.location.href = event.buttonLink : null}
                      >
                        {event.buttonText || t('learnMore')}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        )}

        
      </div>
    </section>
  );
};

export default EventsSection;