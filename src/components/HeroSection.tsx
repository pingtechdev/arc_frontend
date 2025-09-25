import { ArrowRight, Play, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-robotics.jpg';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Robotics Competition" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-card/50 border border-secondary/20 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-secondary mr-2" />
            <span className="text-sm font-medium text-secondary">Advanced Robotics Competition</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="text-gradient">ARC</span>
              <br />
              <span className="text-foreground">ROBOTICS</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join the ultimate robotics competition where innovation meets engineering excellence. 
              Compete, learn, and shape the future of technology.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('events')}
              className="btn-hero group"
            >
              Explore Events
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('volunteers')}
              className="border-muted text-foreground hover:bg-muted"
            >
              <Play className="mr-2 h-5 w-5" />
              Become a Volunteer
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary">500+</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary">50+</div>
              <div className="text-sm text-muted-foreground">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary">3</div>
              <div className="text-sm text-muted-foreground">Competition Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-secondary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-secondary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;