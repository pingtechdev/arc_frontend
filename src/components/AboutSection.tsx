import { Target, Users, Trophy, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "Pushing the boundaries of robotics and engineering"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a network of passionate robotics enthusiasts"
    },
    {
      icon: Trophy,
      title: "Excellence",
      description: "Striving for the highest standards in competition"
    },
    {
      icon: Lightbulb,
      title: "Learning",
      description: "Fostering continuous growth and knowledge sharing"
    }
  ];

  return (
    <section id="about" className="section-py">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Who We Are</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ARC is Lebanon's premier robotics competition, bringing together the brightest minds 
            to compete, innovate, and shape the future of technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To create a platform where students, professionals, and robotics enthusiasts can 
              showcase their skills, learn from each other, and drive innovation in the field of 
              robotics and automation.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Since our inception, we've been committed to fostering a community that values 
              technical excellence, creative problem-solving, and collaborative learning.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">5+</div>
                <div className="text-sm text-muted-foreground">Years Active</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">1000+</div>
                <div className="text-sm text-muted-foreground">Participants</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-primary rounded-2xl p-8 glow-tech">
              <h4 className="text-2xl font-bold text-white mb-4">Competition Categories</h4>
              <div className="space-y-4">
                {[
                  "Autonomous Navigation",
                  "Robot Soccer",
                  "Line Following",
                  "Maze Solving",
                  "Sumo Wrestling"
                ].map((category, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-white/90">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <value.icon className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;