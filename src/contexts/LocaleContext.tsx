import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'en' | 'ar';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    whoWeAre: 'Who we are',
    events: 'Events',
    becomeVolunteer: 'Become a Volunteer',
    gallery: 'Gallery',
    categoriesRules: 'Categories & Rules',
    aboutARC: 'About ARC',
    loginRegister: 'Login/Register',
    
    // Hero Section
    heroTitle: 'ARC Robotics Competition',
    heroSubtitle: 'Unleashing Innovation Through Robotics Excellence',
    heroDescription: 'Join Lebanon\'s premier robotics competition where young minds innovate, compete, and shape the future of technology.',
    registerNow: 'Register Now',
    learnMore: 'Learn More',
    
    // About Section
    aboutTitle: 'Empowering Future Innovators',
    aboutDescription: 'ARC Robotics Competition is Lebanon\'s leading platform for robotics enthusiasts, fostering creativity, technical excellence, and innovation among students and professionals.',
    
    // Events
    eventsTitle: 'Upcoming Events',
    eventsDescription: 'Join our exciting robotics competitions and workshops',
    
    // Volunteer Section
    volunteerTitle: 'Join Our Mission',
    volunteerDescription: 'Be part of something bigger. Help us inspire the next generation of robotics innovators.',
    joinNow: 'Join Now',
    
    // Gallery
    galleryTitle: 'Competition Gallery',
    galleryDescription: 'Witness the incredible innovations and memorable moments from our competitions',
    
    // Rules
    rulesTitle: 'Competition Categories & Rules',
    rulesDescription: 'Everything you need to know about participating in ARC competitions',
    
    // Footer
    footerDescription: 'Leading robotics competition in Lebanon, fostering innovation and excellence.',
    contactInfo: 'Contact Information',
    followUs: 'Follow Us',
    quickLinks: 'Quick Links',
    sponsors: 'Our Sponsors',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    whoWeAre: 'من نحن',
    events: 'الفعاليات',
    becomeVolunteer: 'كن متطوعاً',
    gallery: 'المعرض',
    categoriesRules: 'الفئات والقوانين',
    aboutARC: 'حول أي آر سي',
    loginRegister: 'تسجيل الدخول/التسجيل',
    
    // Hero Section
    heroTitle: 'مسابقة أي آر سي للروبوتات',
    heroSubtitle: 'إطلاق الإبداع من خلال التميز في الروبوتات',
    heroDescription: 'انضم إلى مسابقة الروبوتات الرائدة في لبنان حيث تبدع العقول الشابة وتتنافس لتشكيل مستقبل التكنولوجيا.',
    registerNow: 'سجل الآن',
    learnMore: 'اعرف المزيد',
    
    // About Section
    aboutTitle: 'تمكين المبدعين المستقبليين',
    aboutDescription: 'مسابقة أي آر سي للروبوتات هي المنصة الرائدة في لبنان لعشاق الروبوتات، تعزز الإبداع والتميز التقني والابتكار بين الطلاب والمهنيين.',
    
    // Events
    eventsTitle: 'الفعاليات القادمة',
    eventsDescription: 'انضم إلى مسابقات وورش عمل الروبوتات المثيرة',
    
    // Volunteer Section
    volunteerTitle: 'انضم إلى مهمتنا',
    volunteerDescription: 'كن جزءاً من شيء أكبر. ساعدنا في إلهام الجيل القادم من مبدعي الروبوتات.',
    joinNow: 'انضم الآن',
    
    // Gallery
    galleryTitle: 'معرض المسابقة',
    galleryDescription: 'اشهد الابتكارات المذهلة واللحظات التي لا تُنسى من مسابقاتنا',
    
    // Rules
    rulesTitle: 'فئات المسابقة والقوانين',
    rulesDescription: 'كل ما تحتاج لمعرفته حول المشاركة في مسابقات أي آر سي',
    
    // Footer
    footerDescription: 'مسابقة الروبوتات الرائدة في لبنان، تعزز الابتكار والتميز.',
    contactInfo: 'معلومات الاتصال',
    followUs: 'تابعونا',
    quickLinks: 'روابط سريعة',
    sponsors: 'رعاتنا',
  }
};

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'ar')) {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const t = (key: string): string => {
    return translations[locale][key as keyof typeof translations['en']] || key;
  };

  const value: LocaleContextType = {
    locale,
    setLocale,
    t,
    isRTL: locale === 'ar',
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};