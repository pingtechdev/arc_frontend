import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EventsSection from '@/components/EventsSection';
import VolunteerSection from '@/components/VolunteerSection';
import GallerySection from '@/components/GallerySection';
import RulesSection from '@/components/RulesSection';
import OrganizersSection from '@/components/OrganizersSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <VolunteerSection />
      <GallerySection />
      <RulesSection />
      <OrganizersSection />
      <Footer />
    </div>
  );
};

export default Index;
