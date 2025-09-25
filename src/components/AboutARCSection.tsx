import { History, Award, Globe, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AboutARCSection = () => {
  const milestones = [
    {
      year: "2019",
      title: "ARC Founded",
      description: "Established as Lebanon's first dedicated robotics competition platform"
    },
    {
      year: "2020",
      title: "First Championship",
      description: "Inaugural competition with 25 teams from across Lebanon"
    },
    {
      year: "2021",
      title: "International Recognition",
      description: "Partnered with global robotics organizations and IEEE"
    },
    {
      year: "2022",
      title: "Expansion",
      description: "Added new categories and welcomed 100+ participating teams"
    },
    {
      year: "2023",
      title: "Record Breaking",
      description: "Largest competition with 150+ teams and international participants"
    },
    {
      year: "2024",
      title: "Future Vision",
      description: "Launching educational programs and year-round activities"
    }
  ];

  const achievements = [
    {
      icon: Users,
      number: "1,500+",
      label: "Students Impacted"
    },
    {
      icon: Award,
      number: "200+",
      label: "Awards Given"
    },
    {
      icon: Globe,
      number: "15+",
      label: "Partner Universities"
    }
  ];

  return (
    <section id="about-arc" className="section-py">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">About ARC</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The story of how a vision to promote robotics education became Lebanon's 
            premier technology competition platform.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <History className="h-8 w-8 text-secondary" />
              <h3 className="text-3xl font-bold">Our Story</h3>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              ARC began with a simple yet ambitious goal: to create a platform where Lebanese 
              students and engineers could showcase their robotics skills and compete at an 
              international level.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              What started as a small competition among local universities has grown into 
              the region's most prestigious robotics event, attracting participants from 
              across the Middle East and beyond.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, ARC stands as a testament to Lebanese innovation and technical excellence, 
              fostering the next generation of robotics engineers and entrepreneurs.
            </p>

            <div className="pt-4">
              <Button className="btn-hero group">
                Learn More About Our Impact
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-center mb-8">Our Impact</h4>
            <div className="grid gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <achievement.icon className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">{achievement.number}</div>
                        <div className="text-muted-foreground">{achievement.label}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Our Journey</h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-secondary to-accent rounded-full" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'} ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <Card className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-secondary mb-2">{milestone.year}</div>
                        <h4 className="text-lg font-semibold mb-2">{milestone.title}</h4>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-secondary rounded-full border-4 border-background shadow-glow" />
                  </div>
                  
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="text-center">
          <div className="bg-gradient-primary rounded-2xl p-12 glow-tech">
            <h3 className="text-3xl font-bold text-white mb-6">Our Vision for the Future</h3>
            <p className="text-white/90 text-lg max-w-4xl mx-auto leading-relaxed mb-8">
              To establish Lebanon as a regional hub for robotics innovation, creating pathways 
              for students to pursue careers in robotics and automation while contributing to 
              the global technology ecosystem.
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
              Join Our Vision
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutARCSection;