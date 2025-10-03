import { MapPin, Phone, Mail, Globe, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { useState, useEffect } from 'react';
import arcLogo from '@/assets/arc/ARC_logo.png';

// Import sponsor images
import sponsor1 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.41 PM (1).jpeg';
import sponsor2 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.41 PM (2).jpeg';
import sponsor3 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.41 PM (3).jpeg';
import sponsor4 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.41 PM.jpeg';
import sponsor5 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (1).jpeg';
import sponsor6 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (2).jpeg';
import sponsor7 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (3).jpeg';
import sponsor8 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (4).jpeg';
import sponsor9 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (5).jpeg';
import sponsor10 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (6).jpeg';
import sponsor11 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (7).jpeg';
import sponsor12 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (8).jpeg';
import sponsor13 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (9).jpeg';
import sponsor14 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (10).jpeg';
import sponsor15 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (11).jpeg';
import sponsor16 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (12).jpeg';
import sponsor17 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (13).jpeg';
import sponsor18 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM (14).jpeg';
import sponsor19 from '@/assets/sponsors/WhatsApp Image 2025-09-30 at 2.23.42 PM.jpeg';

const Footer = () => {
  const { t } = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sponsorsPerSlide = 4;
  
  const sponsors = [
    { name: "Sponsor 1", logo: sponsor1 },
    { name: "Sponsor 2", logo: sponsor2 },
    { name: "Sponsor 3", logo: sponsor3 },
    { name: "Sponsor 4", logo: sponsor4 },
    { name: "Sponsor 5", logo: sponsor5 },
    { name: "Sponsor 6", logo: sponsor6 },
    { name: "Sponsor 7", logo: sponsor7 },
    { name: "Sponsor 8", logo: sponsor8 },
    { name: "Sponsor 9", logo: sponsor9 },
    { name: "Sponsor 10", logo: sponsor10 },
    { name: "Sponsor 11", logo: sponsor11 },
    { name: "Sponsor 12", logo: sponsor12 },
    { name: "Sponsor 13", logo: sponsor13 },
    { name: "Sponsor 14", logo: sponsor14 },
    { name: "Sponsor 15", logo: sponsor15 },
    { name: "Sponsor 16", logo: sponsor16 },
    { name: "Sponsor 17", logo: sponsor17 },
    { name: "Sponsor 18", logo: sponsor18 },
    { name: "Sponsor 19", logo: sponsor19 },
  ];
  
  // Calculate total slides needed
  const totalSlides = Math.ceil(sponsors.length / sponsorsPerSlide);
  
  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval);
  }, [totalSlides]);
  
  // Get current sponsors to display
  const getCurrentSponsors = () => {
    const startIndex = currentSlide * sponsorsPerSlide;
    return sponsors.slice(startIndex, startIndex + sponsorsPerSlide);
  };
  
  // Navigation functions
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };
  
  const contactInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: "Beirut, Lebanon"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+961 1 234 567"
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@arc-robotics.com"
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.arc-robotics.com"
    }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={arcLogo} 
                alt="ARC Logo" 
                className="h-16 w-16 rounded-xl object-contain"
              />
              <span className="text-2xl font-bold text-gradient">ARC Lebanon</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t('aboutDescription')}
            </p>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-secondary">Contact Us</h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-secondary" />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsors */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-secondary">Our Sponsors</h3>
            
            {/* Slideshow Container */}
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 bg-secondary/20 hover:bg-secondary/30 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Previous sponsors"
              >
                <ChevronLeft className="h-4 w-4 text-secondary" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 bg-secondary/20 hover:bg-secondary/30 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Next sponsors"
              >
                <ChevronRight className="h-4 w-4 text-secondary" />
              </button>
              
              {/* Sponsors Grid */}
              <div className="grid grid-cols-2 gap-4 px-8">
                {getCurrentSponsors().map((sponsor, index) => (
                  <div 
                    key={`${currentSlide}-${index}`}
                    className="bg-muted/30 rounded-lg p-4 text-center hover:bg-muted/50 transition-all duration-300 border border-border/50 hover:border-secondary/50"
                  >
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-3 overflow-hidden bg-muted/20">
                      <img 
                        src={sponsor.logo} 
                        alt={sponsor.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.sponsor-fallback') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="sponsor-fallback hidden w-full h-full items-center justify-center text-muted-foreground text-xs">
                        {sponsor.name.charAt(0)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{sponsor.name}</div>
                  </div>
                ))}
              </div>
              
              {/* Slide Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-secondary w-6' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              {t('copyright')}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">{t('followUs')}:</span>
              <div className="flex space-x-2">
                {['LinkedIn', 'Twitter', 'Instagram'].map((social, index) => (
                  <button 
                    key={index}
                    className="w-8 h-8 bg-muted/30 rounded-full flex items-center justify-center hover:bg-secondary/20 hover:text-secondary transition-smooth"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;