import { Eye, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GallerySection = () => {
  // Placeholder gallery items
  const galleryItems = [
    {
      type: 'image',
      title: 'Championship Finals 2023',
      description: 'Intense robot battles in the main arena'
    },
    {
      type: 'video',
      title: 'Autonomous Navigation Challenge',
      description: 'Robots navigating complex obstacle courses'
    },
    {
      type: 'image',
      title: 'Team Collaboration',
      description: 'Students working together on their robots'
    },
    {
      type: 'image',
      title: 'Award Ceremony',
      description: 'Celebrating the winners of ARC 2023'
    },
    {
      type: 'video',
      title: 'Behind the Scenes',
      description: 'Preparation and setup for the competition'
    },
    {
      type: 'image',
      title: 'Robot Showcase',
      description: 'Innovative designs from participating teams'
    }
  ];

  return (
    <section id="gallery" className="section-py">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore highlights from previous competitions, workshops, and events. 
            Witness the excitement and innovation of ARC.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div 
              key={index} 
              className="group relative bg-muted/30 rounded-xl overflow-hidden hover:glow-tech transition-all duration-300 aspect-video"
            >
              {/* Placeholder Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* Media Type Icon */}
              <div className="absolute top-4 right-4">
                <div className="w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                  {item.type === 'video' ? (
                    <Play className="h-5 w-5 text-secondary" />
                  ) : (
                    <Eye className="h-5 w-5 text-secondary" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button variant="secondary" size="sm">
                  View {item.type === 'video' ? 'Video' : 'Image'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
            View Complete Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;