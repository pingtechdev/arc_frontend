import { MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import arcLogo from '@/assets/arc/ARC_logo.png';

const Footer = () => {
  const { t } = useLocale();
  
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

  const sponsors = [
    { name: "TechCorp", logo: "TC" },
    { name: "RoboTech", logo: "RT" },
    { name: "InnovateLab", logo: "IL" },
    { name: "FutureTech", logo: "FT" },
  ];

  const partners = [
    { name: "IEEE Lebanon", logo: "IEEE" },
    { name: "AUB Engineering", logo: "AUB" },
    { name: "LAU Robotics", logo: "LAU" },
    { name: "USJ Tech", logo: "USJ" },
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
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-secondary">Our Sponsors</h3>
            <div className="grid grid-cols-2 gap-4">
              {sponsors.map((sponsor, index) => (
                <div 
                  key={index} 
                  className="bg-muted/30 rounded-lg p-4 text-center hover:bg-muted/50 transition-smooth border border-border/50"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm font-bold text-primary">{sponsor.logo}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{sponsor.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-secondary">Our Partners</h3>
            <div className="grid grid-cols-2 gap-4">
              {partners.map((partner, index) => (
                <div 
                  key={index} 
                  className="bg-muted/30 rounded-lg p-4 text-center hover:bg-muted/50 transition-smooth border border-border/50"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-xs font-bold text-accent">{partner.logo}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{partner.name}</div>
                </div>
              ))}
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