import { FileText, Download, Shield, Trophy, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocale } from '@/contexts/LocaleContext';
import AnimatedSection from './AnimatedSection';

const RulesSection = () => {
  const { t } = useLocale();
  
  const categories = [
    {
      icon: Trophy,
      title: t('autonomousNav'),
      description: t('autonomousNavDesc'),
      rules: [t('maxSize'), t('autonomousOnly'), t('timeLimit')]
    },
    {
      icon: Users,
      title: t('robotSoccer'),
      description: t('robotSoccerDesc'),
      rules: [t('teamSize'), t('matchDuration'), t('ballDetection')]
    },
    {
      icon: Settings,
      title: t('lineFollowing'),
      description: t('lineFollowingDesc'),
      rules: [t('singleRobot'), t('blackLine'), t('speedAccuracy')]
    },
    {
      icon: Shield,
      title: t('sumoWrestling'),
      description: t('sumoWrestlingDesc'),
      rules: [t('weightLimit'), t('ringDiameter'), t('bestOfThree')]
    }
  ];

  const generalRules = [
    t('registerDeadline'),
    t('safetyInspection'),
    t('multipleCategories'),
    t('fairPlay'),
    t('protestsTime'),
    t('judgesFinal')
  ];

  return (
    <section id="rules" className="section-py bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16" direction="fade">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{t('rulesTitle')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('comprehensiveGuidelines')}
          </p>
        </AnimatedSection>

        {/* Competition Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {categories.map((category, index) => (
            <AnimatedSection key={index} delay={index * 0.1} direction="right" stagger={true}>
              <Card className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-tech">
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
                  <h4 className="font-semibold text-sm text-secondary">{t('keyRules')}</h4>
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
            </AnimatedSection>
          ))}
        </div>

        {/* General Rules & Downloads */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* General Rules */}
          <AnimatedSection direction="left" delay={0.2}>
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Shield className="h-6 w-6 text-secondary mr-3" />
                {t('generalRules')}
              </h3>
              <div className="space-y-3">
                {generalRules.map((rule, index) => (
                  <AnimatedSection key={index} delay={index * 0.05} direction="slideLeft" distance={30}>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs font-bold text-secondary">{index + 1}</span>
                      </div>
                      <p className="text-muted-foreground">{rule}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Rule Documents */}
          <AnimatedSection direction="right" delay={0.4}>
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <FileText className="h-6 w-6 text-secondary mr-3" />
                {t('ruleDocuments')}
              </h3>
              <div className="space-y-4">
                {[
                  { name: t('completeRuleBook'), size: "2.1 MB", type: "PDF" },
                  { name: t('safetyGuidelines'), size: "1.5 MB", type: "PDF" },
                  { name: t('registrationForm'), size: "856 KB", type: "PDF" },
                  { name: t('technicalSpecs'), size: "3.2 MB", type: "PDF" }
                ].map((document, index) => (
                  <AnimatedSection key={index} delay={index * 0.1} direction="slideRight" distance={30}>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-secondary/50 transition-colors">
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
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* FAQ Section */}
        <AnimatedSection className="mt-16 text-center" direction="zoom" delay={0.6}>
          <div className="bg-gradient-primary rounded-2xl p-8 glow-tech">
            <h3 className="text-2xl font-bold text-white mb-4">{t('haveQuestions')}</h3>
            <p className="text-white/90 mb-6">
              {t('faqDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                {t('viewFAQ')}
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                {t('contactTechnical')}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default RulesSection;