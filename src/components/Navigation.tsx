import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/contexts/LocaleContext';
import ThemeToggle from './ThemeToggle';
import LocaleToggle from './LocaleToggle';
import arcLogo from '@/assets/arc-logo.png';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isRTL } = useLocale();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: t('home'), action: () => scrollToSection('home') },
    { label: t('whoWeAre'), action: () => scrollToSection('about') },
    { label: t('events'), action: () => scrollToSection('events') },
    { label: t('becomeVolunteer'), action: () => scrollToSection('volunteers') },
    { label: t('gallery'), action: () => scrollToSection('gallery') },
    { label: t('categoriesRules'), action: () => scrollToSection('rules') },
    { label: t('aboutARC'), action: () => scrollToSection('about-arc') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={arcLogo} 
              alt="ARC Logo" 
              className="h-10 w-10 rounded-full glow-tech"
            />
            <span className="text-xl font-bold text-gradient">ARC</span>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-foreground hover:text-secondary transition-smooth text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <LocaleToggle />
              <Button variant="outline" size="sm" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                {t('loginRegister')}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border border-border rounded-lg mt-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-secondary hover:bg-muted rounded-md transition-smooth"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-3 py-2 space-y-2">
                <div className="flex justify-center space-x-2">
                  <ThemeToggle />
                  <LocaleToggle />
                </div>
                <Button variant="outline" size="sm" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  {t('loginRegister')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;