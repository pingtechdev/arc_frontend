import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import arcLogo from '@/assets/arc-logo.png';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', action: () => scrollToSection('home') },
    { label: 'Who we are', action: () => scrollToSection('about') },
    { label: 'Events', action: () => scrollToSection('events') },
    { label: 'Become a Volunteer', action: () => scrollToSection('volunteers') },
    { label: 'Gallery', action: () => scrollToSection('gallery') },
    { label: 'Categories & Rules', action: () => scrollToSection('rules') },
    { label: 'About ARC', action: () => scrollToSection('about-arc') },
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
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-foreground hover:text-secondary transition-smooth text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button variant="outline" size="sm" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
              Login/Register
            </Button>
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
              <div className="px-3 py-2">
                <Button variant="outline" size="sm" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  Login/Register
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