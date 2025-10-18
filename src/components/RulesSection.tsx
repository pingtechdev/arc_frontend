import { FileText, Eye, Shield, Trophy, Settings, Users, Zap, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocale } from '@/contexts/LocaleContext';
import AnimatedSection from './AnimatedSection';
import PDFViewer from './PDFViewer';
import { useState, useEffect } from 'react';
import { API_URLS } from '../lib/apiConfig';

const RulesSection = () => {
  const { t } = useLocale();
  const [ruleCategories, setRuleCategories] = useState<any[]>([]);
  const [generalRules, setGeneralRules] = useState<any[]>([]);
  const [ruleDocuments, setRuleDocuments] = useState<any[]>([]);
  const [rulesCTA, setRulesCTA] = useState<any>(null);
  
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

  const defaultGeneralRules = [
    t('registerDeadline'),
    t('safetyInspection'),
    t('multipleCategories'),
    t('fairPlay'),
    t('protestsTime'),
    t('judgesFinal')
  ];

  const getIcon = (iconName: string) => {
    const icons: any = {
      'Trophy': Trophy, 'Users': Users, 'Settings': Settings, 'Shield': Shield,
      'Cpu': Cpu, 'Zap': Zap
    };
    return icons[iconName] || Trophy;
  };

  useEffect(() => {
    const fetchRulesContent = async () => {
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
          
          console.log('✅ Rules CMS Content loaded');
          
          if (detailData.body && Array.isArray(detailData.body)) {
            // Rule categories
            const catBlocks = detailData.body.filter((b: any) => b.type === 'rule_categories');
            if (catBlocks.length > 0 && Array.isArray(catBlocks[0].value)) {
              const cmsCategories = catBlocks[0].value.map((cat: any) => ({
                icon: getIcon(cat.icon_name),
                title: cat.title,
                description: cat.description,
                rules: cat.rules || []
              }));
              setRuleCategories(cmsCategories);
            }
            
            // General rules
            const genRulesBlocks = detailData.body.filter((b: any) => b.type === 'general_rules');
            if (genRulesBlocks.length > 0 && Array.isArray(genRulesBlocks[0].value)) {
              setGeneralRules(genRulesBlocks[0].value);
            }
            
            // Rule documents
            const docBlocks = detailData.body.filter((b: any) => b.type === 'rule_documents');
            if (docBlocks.length > 0 && Array.isArray(docBlocks[0].value)) {
              setRuleDocuments(docBlocks[0].value);
            }
            
            // FAQ CTA
            const ctaBlocks = detailData.body.filter((b: any) => b.type === 'rules_faq_cta');
            if (ctaBlocks.length > 0) {
              setRulesCTA(ctaBlocks[0].value);
            }
          }
        }
      } catch (error) {
        console.error('❌ Failed to load rules content:', error);
      }
    };
    
    fetchRulesContent();
  }, []);

  const activeCategories = ruleCategories.length > 0 ? ruleCategories : categories;
  const activeGeneralRules = generalRules.length > 0 ? generalRules : defaultGeneralRules;
  const activeDocuments = ruleDocuments.length > 0 ? ruleDocuments : [
    { name: t('completeRuleBook'), file_size: "2.1 MB", file_type: "PDF" },
    { name: t('safetyGuidelines'), file_size: "1.5 MB", file_type: "PDF" },
    { name: t('registrationForm'), file_size: "856 KB", file_type: "PDF" },
    { name: t('technicalSpecs'), file_size: "3.2 MB", file_type: "PDF" }
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
        {/* <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {activeCategories.map((category, index) => (
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
        </div> */}

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
                {activeGeneralRules.map((rule, index) => (
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
                {activeDocuments.map((document, index) => (
                  <AnimatedSection key={index} delay={index * 0.1} direction="slideRight" distance={30}>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-secondary/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <div className="font-medium">{document.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {document.file_type || document.type} • {document.file_size || document.size}
                          </div>
                        </div>
                      </div>
                      <PDFViewer document={document} />
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* FAQ Section */}
        {/* <AnimatedSection className="mt-16 text-center" direction="zoom" delay={0.6}>
          <div className="bg-gradient-primary rounded-2xl p-8 glow-tech">
            <h3 className="text-2xl font-bold text-white mb-4">
              {rulesCTA?.title || t('haveQuestions')}
            </h3>
            <p className="text-white/90 mb-6">
              {rulesCTA?.description || t('faqDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => rulesCTA?.primary_button_link ? window.location.href = rulesCTA.primary_button_link : null}
              >
                {rulesCTA?.primary_button_text || t('viewFAQ')}
              </Button>
              {rulesCTA?.secondary_button_text && (
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => rulesCTA?.secondary_button_link ? window.location.href = rulesCTA.secondary_button_link : null}
                >
                  {rulesCTA.secondary_button_text}
                </Button>
              )}
            </div>
          </div>
        </AnimatedSection> */}
      </div>
    </section>
  );
};

export default RulesSection;