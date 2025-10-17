import { useLocale } from '@/contexts/LocaleContext';
import AnimatedSection from './AnimatedSection';
import UnifiedGallery from './UnifiedGallery';
import { useState, useEffect } from 'react';

// Helper function to extract YouTube video ID from URL
const extractVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

const GallerySection = () => {
  const { t } = useLocale();
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch gallery images from CMS
  useEffect(() => {
    const fetchGalleryContent = async () => {
      try {
        const listResponse = await fetch('https://api.arc.pingtech.dev/api/v2/pages/?type=cms_app.HomePage', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        const listData = await listResponse.json();
        
        if (listData.items && listData.items.length > 0) {
          const homePageId = listData.items[0].id;
          const detailResponse = await fetch(`https://api.arc.pingtech.dev/api/v2/pages/${homePageId}/`, {
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          });
          const detailData = await detailResponse.json();
          
          console.log('✅ Gallery CMS Content loaded:', detailData);
          
          if (detailData.body && Array.isArray(detailData.body)) {
            // Extract gallery blocks
            const galleryBlocks = detailData.body.filter((block: any) => block.type === 'gallery');
            
            if (galleryBlocks.length > 0) {
              // galleryBlocks[0].value is an array of gallery images
              const images = galleryBlocks[0].value.map((item: any) => ({
                type: 'image',
                src: item.image?.large || item.image?.original || item.image?.url,
                title: item.caption || 'ARC Gallery Image',
                description: item.caption || ''
              })).filter((img: any) => img.src);
              
              setGalleryImages(images);
              console.log('✨ Gallery images loaded from CMS:', images.length);
            }
            
            // Extract YouTube video blocks
            const youtubeBlocks = detailData.body.filter((block: any) => block.type === 'youtube_videos');
            
            if (youtubeBlocks.length > 0) {
              const videos = youtubeBlocks[0].value.map((item: any) => ({
                type: 'video',
                title: item.title,
                youtubeUrl: item.youtube_url,
                thumbnail: item.thumbnail?.large || item.thumbnail?.original || item.thumbnail?.url,
                description: item.description || ''
              })).filter((video: any) => video.youtubeUrl);
              
              setYoutubeVideos(videos);
              console.log('🎥 YouTube videos loaded from CMS:', videos.length);
            }
          }
        }
      } catch (error) {
        console.error('❌ Failed to load gallery from CMS:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGalleryContent();
  }, []);

  return (
    <section id="gallery" className="section-py">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Gallery Title */}
        

        {/* Unified Gallery Section */}
        <AnimatedSection direction="fade" delay={0.2}>
          <UnifiedGallery
            title={t('galleryTitle')}
            description={t('galleryDescription')}
            className="mb-16"
            cmsImages={galleryImages}
          />
        </AnimatedSection>

        {/* YouTube Videos Section */}
        {youtubeVideos.length > 0 && (
          <AnimatedSection direction="fade" delay={0.4}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Featured Videos</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Watch our latest videos and highlights from ARC competitions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {youtubeVideos.map((video, index) => (
                <div key={index} className="group">
                  <div className="relative overflow-hidden rounded-xl bg-muted/30 border border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech">
                    <div className="aspect-video relative">
                      <img 
                        src={video.thumbnail || `https://img.youtube.com/vi/${extractVideoId(video.youtubeUrl)}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-secondary transition-colors">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-muted-foreground text-sm mb-4">
                          {video.description}
                        </p>
                      )}
                      <a 
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                      >
                        Watch on YouTube
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default GallerySection;