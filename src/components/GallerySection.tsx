import { useLocale } from '@/contexts/LocaleContext';
import AnimatedSection from './AnimatedSection';
import UnifiedGallery from './UnifiedGallery';
import { useState, useEffect } from 'react';
import { API_URLS } from '../lib/apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ExternalLink } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Fetch gallery images from CMS
  useEffect(() => {
    const fetchGalleryContent = async () => {
      try {
        const listResponse = await fetch(`${API_URLS.PAGES}?type=cms_app.HomePage`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        const listData = await listResponse.json();
        
        if (listData.items && listData.items.length > 0) {
          const homePageId = listData.items[0].id;
          const detailResponse = await fetch(`${API_URLS.PAGES}${homePageId}/`, {
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

  const openVideoModal = (video: any) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

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
                    <div 
                      className="aspect-video relative cursor-pointer"
                      onClick={() => openVideoModal(video)}
                    >
                      <img 
                        src={video.thumbnail || `https://img.youtube.com/vi/${extractVideoId(video.youtubeUrl)}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white ml-1" />
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
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openVideoModal(video)}
                          className="inline-flex items-center text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Play Video
                        </button>
                        <a 
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-secondary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Watch on YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* YouTube Video Modal */}
        <AnimatePresence>
          {isVideoModalOpen && selectedVideo && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeVideoModal}
            >
              <motion.div
                className="relative max-w-6xl max-h-[90vh] w-full mx-4 bg-white rounded-2xl overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeVideoModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Video Content */}
                <div className="relative">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${extractVideoId(selectedVideo.youtubeUrl)}?autoplay=1&rel=0&modestbranding=1`}
                      title={selectedVideo.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
                    {selectedVideo.description && (
                      <p className="text-muted-foreground mb-4">{selectedVideo.description}</p>
                    )}
                    <div className="flex space-x-4">
                      <a 
                        href={selectedVideo.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Watch on YouTube
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;