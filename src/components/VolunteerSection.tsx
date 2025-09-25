import { Users, Heart, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import volunteerImage from '@/assets/volunteer-1.jpg';

const VolunteerSection = () => {
  const benefits = [
    {
      icon: Users,
      title: "Community Impact",
      description: "Help shape the next generation of robotics engineers and innovators"
    },
    {
      icon: Heart,
      title: "Meaningful Experience",
      description: "Contribute to STEM education and make a lasting difference"
    },
    {
      icon: Star,
      title: "Skill Development",
      description: "Gain valuable experience in event management and technical mentoring"
    }
  ];

  return (
    <section id="volunteers" className="section-py bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Become a Volunteer</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our passionate community of volunteers and help make ARC the premier robotics competition. 
            Your contribution makes all the difference.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden glow-tech">
              <img 
                src={volunteerImage} 
                alt="Volunteers helping with robotics" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            
            {/* Overlay Stats */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-secondary">200+</div>
                    <div className="text-sm text-muted-foreground">Active Volunteers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">5+</div>
                    <div className="text-sm text-muted-foreground">Years Running</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">Why Volunteer with ARC?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Volunteering with ARC is more than just helping out – it's about being part of a movement 
                that's inspiring the next generation of innovators and problem-solvers.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <benefit.icon className="h-6 w-6 text-secondary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button className="btn-hero group text-base">
                Join Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;