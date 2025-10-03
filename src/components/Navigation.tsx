import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/contexts/LocaleContext';
import ThemeToggle from './ThemeToggle';
import arcLogo from '@/assets/arc/ARC_logo.png';

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
    { label: t('organizers'), action: () => scrollToSection('organizers') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Solid Container Background */}
      <div className="bg-card border-b border-border shadow-lg">
        
        {/* Navigation Content */}
        <div className="relative max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-20 relative">
            {/* Logo */}
            <div className="group cursor-pointer z-50 flex-shrink-0 mr-6">
              <div className="h-16 w-16 flex items-center justify-center">
                <img 
                  src={arcLogo} 
                  alt="ARC Logo" 
                  className="h-16 w-16 rounded-xl object-contain transition-all duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="logo-fallback hidden h-16 w-16 rounded-xl bg-muted flex items-center justify-center text-foreground font-bold text-2xl">
                  A
                </div>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className={`hidden lg:flex items-center flex-shrink-0 ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="relative px-3 py-2 text-sm font-medium text-foreground hover:text-foreground transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/10 group whitespace-nowrap border border-transparent hover:border-red-500/20"
                >
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>{item.label}</span>
                    <div className="w-1 h-1 bg-red-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </button>
              ))}
            {/* Enhanced Controls Section */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-red-500/20">
              {/* Theme Toggle with Modern Styling */}
              <div className="flex items-center space-x-1 bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm rounded-lg p-1 border border-red-500/10">
                <div className="p-1 rounded-md hover:bg-red-500/10 transition-all duration-300">
                  <ThemeToggle />
                </div>
              </div>
              
              {/* Enhanced Login Button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="relative border-red-500/60 text-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 font-medium rounded-lg px-3 py-2 text-sm overflow-hidden group"
              >
                <span className="relative z-10 flex items-center space-x-1">
                  <span>{t('loginRegister')}</span>
                  <div className="w-1 h-1 bg-red-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 rounded-xl hover:bg-muted/50 transition-all duration-300"
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pt-6 pb-6 space-y-2 bg-muted/50 border-t border-border max-h-[80vh] overflow-y-auto">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={item.action}
                className="block w-full text-left px-4 py-3 text-base text-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/10 rounded-xl transition-all duration-300 font-medium group whitespace-nowrap border border-transparent hover:border-red-500/20"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <span className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500/60 rounded-full group-hover:bg-red-500 group-hover:scale-125 transition-all duration-300" />
                  <span>{item.label}</span>
                  <div className="w-1.5 h-1.5 bg-red-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto" />
                </span>
              </button>
            ))}
            <div className="pt-4 border-t border-red-500/20">
              <div className="flex justify-center space-x-3 mb-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-background/50 to-background/30 backdrop-blur-sm rounded-xl p-2 border border-red-500/10">
                  <div className="p-1 rounded-lg hover:bg-red-500/10 transition-all duration-300">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-red-500/60 text-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transition-all duration-300 font-medium rounded-xl py-3 text-base relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>{t('loginRegister')}</span>
                  <div className="w-1.5 h-1.5 bg-red-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navigation;