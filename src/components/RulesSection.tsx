import { FileText, Download, Shield, Trophy, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RulesSection = () => {
  const categories = [
    {
      icon: Trophy,
      title: "Autonomous Navigation",
      description: "Robots must navigate through complex courses without human intervention",
      rules: ["Maximum size: 30x30x30 cm", "Autonomous operation only", "Time limit: 3 minutes"]
    },
    {
      icon: Users,
      title: "Robot Soccer",
      description: "Teams of robots compete in football matches with specific gameplay rules",
      rules: ["Team size: 3 robots", "Match duration: 2x10 minutes", "Ball detection required"]
    },
    {
      icon: Settings,
      title: "Line Following",
      description: "Precision challenge following marked paths at maximum speed",
      rules: ["Single robot entry", "Black line on white surface", "Speed and accuracy scored"]
    },
    {
      icon: Shield,
      title: "Sumo Wrestling",
      description: "Robot battles in a ring with pushing and strategy tactics",
      rules: ["Weight limit: 3kg", "Ring diameter: 154cm", "Best of 3 rounds"]
    }
  ];

  const generalRules = [
    "All participants must register before the deadline",
    "Robots must pass safety inspection before competition",
    "Teams can participate in multiple categories",
    "Fair play and sportsmanship are mandatory",
    "Protests must be filed within 30 minutes of the event",
    "Judges' decisions are final"
  ];

  return (
    <section id="rules" className="section-py bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Categories & Rules</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guidelines and regulations for all competition categories. 
            Ensure fair play and technical excellence.
          </p>
        </div>

        {/* Competition Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {categories.map((category, index) => (
            <Card key={index} className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <category.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{category.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-secondary">Key Rules:</h4>
                  <ul className="space-y-1">
                    {category.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="text-sm text-muted-foreground flex items-start">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* General Rules & Downloads */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* General Rules */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Shield className="h-6 w-6 text-secondary mr-3" />
              General Rules
            </h3>
            <div className="space-y-3">
              {generalRules.map((rule, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-xs font-bold text-secondary">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rule Documents */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <FileText className="h-6 w-6 text-secondary mr-3" />
              Rule Documents
            </h3>
            <div className="space-y-4">
              {[
                { name: "Complete Rule Book 2024", size: "2.1 MB", type: "PDF" },
                { name: "Safety Guidelines", size: "1.5 MB", type: "PDF" },
                { name: "Registration Form", size: "856 KB", type: "PDF" },
                { name: "Technical Specifications", size: "3.2 MB", type: "PDF" }
              ].map((document, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-secondary/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium">{document.name}</div>
                      <div className="text-sm text-muted-foreground">{document.type} • {document.size}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-primary rounded-2xl p-8 glow-tech">
            <h3 className="text-2xl font-bold text-white mb-4">Have Questions?</h3>
            <p className="text-white/90 mb-6">
              Check our comprehensive FAQ section or contact our technical committee for clarifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                View FAQ
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Contact Technical Committee
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;