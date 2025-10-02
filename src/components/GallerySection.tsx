import { useLocale } from '@/contexts/LocaleContext';
import AnimatedSection from './AnimatedSection';
import UnifiedGallery from './UnifiedGallery';

const GallerySection = () => {
  const { t } = useLocale();

  return (
    <section id="gallery" className="section-py">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Gallery Title */}
        <AnimatedSection className="text-center mb-16" direction="fade">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{t('competitionGalleryTitle')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('competitionGalleryDescription')}
          </p>
        </AnimatedSection>

        {/* Unified Gallery Section */}
        <AnimatedSection direction="fade" delay={0.2}>
          <UnifiedGallery
            title={t('galleryTitle')}
            description={t('galleryDescription')}
            className="mb-16"
          />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default GallerySection;