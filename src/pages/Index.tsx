import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EventsSection from '@/components/EventsSection';
import VolunteerSection from '@/components/VolunteerSection';
import GallerySection from '@/components/GallerySection';
import RulesSection from '@/components/RulesSection';
import Footer from '@/components/Footer';
import CMSContentWrapper from '@/components/CMSContentWrapper';

const Index = () => {
  return (
    <CMSContentWrapper fallbackMessage="Loading ARC Competition content...">
      <div className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <VolunteerSection />
        <GallerySection />
        <RulesSection />
        <Footer />
      </div>
    </CMSContentWrapper>
  );
};

export default Index;
