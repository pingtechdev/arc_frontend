import { MapPin, Phone, Mail, Globe, ExternalLink, ChevronLeft, ChevronRight, Youtube, Facebook, Instagram } from 'lucide-react';
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
  const [currentOrgSlide, setCurrentOrgSlide] = useState(0);
  const sponsorsPerSlide = 4;
  const organizersPerSlide = 4;
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Default sponsors fallback
  const defaultSponsors = [
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

  // Default organizers fallback
  const defaultOrganizers = [
    { name: "ARC Team", logo: arcLogo, role: "Main Organizer" },
    { name: "Lebanese University", logo: arcLogo, role: "Co-Organizer" },
    { name: "Robotics Society", logo: arcLogo, role: "Co-Organizer" },
    { name: "Tech Institute", logo: arcLogo, role: "Partner" },
    { name: "Innovation Hub", logo: arcLogo, role: "Partner" },
    { name: "Engineering Club", logo: arcLogo, role: "Partner" },
  ];

  // Default social links
  const defaultSocialLinks = [
    { name: "Instagram", url: "https://www.instagram.com/arc.lebanon?igsh=MWVzY2lzNHhkc2xhZQ%3D%3D&utm_source=qr", icon: "Instagram" },
    { name: "Facebook", url: "https://www.facebook.com/share/1DAEd6CYae/?mibextid=wwXIfr", icon: "Facebook" },
  ];

  // Fetch site settings from CMS
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v2/settings/', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        const data = await response.json();
        console.log('✅ Site Settings loaded:', data);
        setSiteSettings(data);
      } catch (error) {
        console.error('❌ Failed to load site settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  // Use CMS sponsors if available, otherwise use default
  const sponsors = siteSettings?.sponsors && siteSettings.sponsors.length > 0
    ? siteSettings.sponsors.map((s: any) => ({
        name: s.value.name,
        logo: s.value.logo?.large || s.value.logo?.original || s.value.logo?.url,
        website: s.value.website
      }))
    : defaultSponsors;
  
  // Use CMS organizers if available, otherwise use default
  const organizers = siteSettings?.organizers && siteSettings.organizers.length > 0
    ? siteSettings.organizers.map((o: any) => ({
        name: o.value.name,
        logo: o.value.logo?.large || o.value.logo?.original || o.value.logo?.url,
        role: o.value.role,
        description: o.value.description
      }))
    : defaultOrganizers;
  
  // Calculate total slides needed
  const totalSlides = Math.ceil(sponsors.length / sponsorsPerSlide);
  const totalOrgSlides = Math.ceil(organizers.length / organizersPerSlide);
  
  // Auto-advance slideshow for sponsors
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval);
  }, [totalSlides]);
  
  // Auto-advance slideshow for organizers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOrgSlide((prev) => (prev + 1) % totalOrgSlides);
    }, 3500); // Change slide every 3.5 seconds (slightly different timing)
    
    return () => clearInterval(interval);
  }, [totalOrgSlides]);
  
  // Get current sponsors to display
  const getCurrentSponsors = () => {
    const startIndex = currentSlide * sponsorsPerSlide;
    return sponsors.slice(startIndex, startIndex + sponsorsPerSlide);
  };
  
  // Get current organizers to display
  const getCurrentOrganizers = () => {
    const startIndex = currentOrgSlide * organizersPerSlide;
    return organizers.slice(startIndex, startIndex + organizersPerSlide);
  };
  
  // Navigation functions for sponsors
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };
  
  // Navigation functions for organizers
  const goToOrgPrevious = () => {
    setCurrentOrgSlide((prev) => (prev - 1 + totalOrgSlides) % totalOrgSlides);
  };
  
  const goToOrgNext = () => {
    setCurrentOrgSlide((prev) => (prev + 1) % totalOrgSlides);
  };
  
  // Default contact info
  const defaultContactInfo = [
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
  
  // Map icon names from CMS to actual icon components
  const getIconComponent = (iconName: string) => {
    const icons: any = {
      'MapPin': MapPin,
      'Phone': Phone,
      'Mail': Mail,
      'Globe': Globe
    };
    return icons[iconName] || Mail;
  };

  // Get social media icon component
  const getSocialIcon = (socialName: string) => {
    const socialIcons: any = {
      'YouTube': Youtube,
      'Facebook': Facebook,
      'Instagram': Instagram,
      'LinkedIn': ExternalLink,
      'Twitter': ExternalLink,
    };
    const IconComponent = socialIcons[socialName] || ExternalLink;
    return <IconComponent className="h-4 w-4" />;
  };
  
  // Use CMS contact info if available
  const contactInfo = siteSettings?.contact_info && siteSettings.contact_info.length > 0
    ? siteSettings.contact_info.map((c: any) => ({
        icon: getIconComponent(c.value.icon_name),
        label: c.value.label,
        value: c.value.value
      }))
    : defaultContactInfo;

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Brand & Contact Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-5 mb-8">
              <img 
                src={siteSettings?.site_logo?.large || siteSettings?.site_logo?.original || arcLogo} 
                alt={siteSettings?.site_name || "ARC Logo"} 
                className="h-24 w-24 rounded-xl object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.footer-logo-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="footer-logo-fallback hidden h-24 w-24 rounded-xl bg-muted flex items-center justify-center text-foreground font-bold text-4xl">
                {siteSettings?.site_name?.charAt(0) || 'A'}
              </div>
              <span className="text-4xl font-bold text-gradient">
                {siteSettings?.site_name || "ARC Lebanon"}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {siteSettings?.site_description || siteSettings?.footer_about_text || "ARC Robotics Competition is Lebanon's leading platform for robotics enthusiasts, fostering creativity, technical excellence, and innovation among students and professionals."}
            </p>
            
            {/* Contact Information */}
            <h3 className="text-lg font-semibold mb-4 text-secondary">Contact Us</h3>
            <div className="space-y-3">
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
          <div className="lg:col-span-1">
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

          {/* Organizers */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-secondary">Organizers</h3>
            
            {/* Slideshow Container */}
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={goToOrgPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 bg-secondary/20 hover:bg-secondary/30 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Previous organizers"
              >
                <ChevronLeft className="h-4 w-4 text-secondary" />
              </button>
              
              <button
                onClick={goToOrgNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 bg-secondary/20 hover:bg-secondary/30 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Next organizers"
              >
                <ChevronRight className="h-4 w-4 text-secondary" />
              </button>
              
              {/* Organizers Grid */}
              <div className="grid grid-cols-2 gap-4 px-8">
                {getCurrentOrganizers().map((organizer, index) => (
                  <div 
                    key={`${currentOrgSlide}-${index}`}
                    className="bg-muted/30 rounded-lg p-4 text-center hover:bg-muted/50 transition-all duration-300 border border-border/50 hover:border-secondary/50"
                  >
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-3 overflow-hidden bg-muted/20">
                      <img 
                        src={organizer.logo} 
                        alt={organizer.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.organizer-fallback') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="organizer-fallback hidden w-full h-full items-center justify-center text-muted-foreground text-xs">
                        {organizer.name.charAt(0)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{organizer.name}</div>
                  </div>
                ))}
              </div>
              
              {/* Slide Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalOrgSlides }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentOrgSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentOrgSlide 
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
              {siteSettings?.copyright_text || t('copyright')}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">{t('followUs')}:</span>
              <div className="flex space-x-2">
                {siteSettings?.social_links && siteSettings.social_links.length > 0 ? (
                  siteSettings.social_links.map((social: any, index: number) => (
                    <a 
                      key={index}
                      href={social.value.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-muted/30 rounded-full flex items-center justify-center hover:bg-secondary/20 hover:text-secondary transition-smooth"
                      title={social.value.name}
                    >
                      {getSocialIcon(social.value.name)}
                    </a>
                  ))
                ) : (
                  defaultSocialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-muted/30 rounded-full flex items-center justify-center hover:bg-secondary/20 hover:text-secondary transition-smooth"
                      title={social.name}
                    >
                      {getSocialIcon(social.name)}
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;