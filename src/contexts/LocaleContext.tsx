import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const translations = {
    // Navigation
    home: 'Home',
    whoWeAre: 'Who we are',
    events: 'Events',
    becomeVolunteer: 'Become a Volunteer',
    gallery: 'Gallery',
    categoriesRules: 'Categories & Rules',
    organizers: 'Organizers',
    loginRegister: 'Login/Register',
    highlights: 'Highlights',
    followUs: 'Follow Us',
    copyright: '© 2024 ARC - Advanced Robotics Competition. All rights reserved.',
    
    // Hero Section
    heroTitle: 'Annual Robotics Competition',
    heroSubtitle: 'Unleashing Innovation Through Robotics Excellence',
    heroDescription: 'Join Lebanon\'s premier robotics competition where young minds innovate, compete, and shape the future of technology.',
    registerNow: 'Register Now',
    learnMore: 'Learn More',
    
    // Hero Cycling Texts
    heroText1: 'Technology For Our Children',
    heroDesc1: 'Every year we gather you all for the bigger robotics competition',
    heroText2: 'For Smart Generation',
    heroDesc2: 'Raise Up Your knowledge\nImprove your skills with the latest Technologies',
    heroText3: 'Kalimat',
    heroDesc3: 'For the Better Future\nJoin this year with one of the biggest competitions',
    
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
    quickLinks: 'Quick Links',
    sponsors: 'Our Sponsors',
    
    // About Section Values
    innovation: 'Innovation',
    innovationDesc: 'Pushing the boundaries of robotics and engineering',
    community: 'Community',
    communityDesc: 'Building a network of passionate robotics enthusiasts',
    excellence: 'Excellence',
    excellenceDesc: 'Striving for the highest standards in competition',
    learning: 'Learning',
    learningDesc: 'Fostering continuous growth and knowledge sharing',
    ourMission: 'Our Mission',
    missionDesc1: 'To create a platform where students, professionals, and robotics enthusiasts can showcase their skills, learn from each other, and drive innovation in the field of robotics and automation.',
    missionDesc2: 'Since our inception, we\'ve been committed to fostering a community that values technical excellence, creative problem-solving, and collaborative learning.',
    yearsActive: 'Years Active',
    participants: 'Participants',
    competitionCategories: 'Competition Categories',
    autonomousNav: 'Autonomous Navigation',
    robotSoccer: 'Robot Soccer',
    lineFollowing: 'Line Following',
    mazeSolving: 'Maze Solving',
    sumoWrestling: 'Sumo Wrestling',
    
    // Events Section
    arcChampionship: 'ARC Championship 2024',
    championshipDate: 'March 15-17, 2024',
    championshipTime: '9:00 AM - 6:00 PM',
    aubLocation: 'American University of Beirut',
    championshipParticipants: '50+ Teams',
    championshipDesc: 'The main championship featuring all competition categories with international participants.',
    registrationOpen: 'Registration Open',
    workshopTitle: 'Workshop: Robotics Fundamentals',
    workshopDate: 'February 10, 2024',
    workshopTime: '10:00 AM - 4:00 PM',
    lauLocation: 'LAU Engineering Campus',
    workshopParticipants: '100 Students',
    workshopDesc: 'Hands-on workshop covering robotics basics, programming, and competition preparation.',
    comingSoon: 'Coming Soon',
    juniorChallenge: 'Junior Robotics Challenge',
    juniorDate: 'April 20, 2024',
    juniorTime: '9:00 AM - 3:00 PM',
    usjLocation: 'USJ Technology Center',
    juniorParticipants: '30+ Schools',
    juniorDesc: 'Special competition designed for high school students to encourage early participation.',
    registrationOpensSoon: 'Registration Opens Soon',
    dontMissOut: 'Don\'t Miss Out!',
    newsletterDesc: 'Subscribe to our newsletter to get the latest updates on events, registration deadlines, and exclusive content.',
    subscribeNow: 'Subscribe Now',
    
    // Volunteer Section
    whyVolunteer: 'Why Volunteer with ARC?',
    volunteerDesc: 'Volunteering with ARC is more than just helping out – it\'s about being part of a movement that\'s inspiring the next generation of innovators and problem-solvers.',
    communityImpact: 'Community Impact',
    communityImpactDesc: 'Help shape the next generation of robotics engineers and innovators',
    meaningfulExperience: 'Meaningful Experience',
    meaningfulExperienceDesc: 'Contribute to STEM education and make a lasting difference',
    skillDevelopment: 'Skill Development',
    skillDevelopmentDesc: 'Gain valuable experience in event management and technical mentoring',
    activeVolunteers: 'Active Volunteers',
    yearsRunning: 'Years Running',
    
    // Gallery Section
    exploreHighlights: 'Explore highlights from previous competitions, workshops, and events. Witness the excitement and innovation of ARC.',
    videoGalleryTitle: 'Video Gallery',
    videoGalleryDescription: 'Watch the most exciting moments from our robotics competition',
    competitionGalleryTitle: 'Competition Gallery',
    competitionGalleryDescription: 'Experience the excitement and innovation of our latest robotics competition',
    arcHighlights: 'ARC 2025 Highlights',
    arcHighlightsDescription: 'Experience the excitement and innovation of our latest robotics competition',
    competitionDays: 'Competition Days',
    teams: 'Teams',
    championshipFinals: 'Championship Finals 2023',
    finalsDesc: 'Intense robot battles in the main arena',
    autonomousChallenge: 'Autonomous Navigation Challenge',
    challengeDesc: 'Robots navigating complex obstacle courses',
    teamCollaboration: 'Team Collaboration',
    collaborationDesc: 'Students working together on their robots',
    awardCeremony: 'Award Ceremony',
    ceremonyDesc: 'Celebrating the winners of ARC 2023',
    behindScenes: 'Behind the Scenes',
    behindScenesDesc: 'Preparation and setup for the competition',
    robotShowcase: 'Robot Showcase',
    showcaseDesc: 'Innovative designs from participating teams',
    viewImage: 'View Image',
    viewVideo: 'View Video',
    viewCompleteGallery: 'View Complete Gallery',
    
    // Rules Section
    comprehensiveGuidelines: 'Comprehensive guidelines and regulations for all competition categories. Ensure fair play and technical excellence.',
    autonomousNavDesc: 'Robots must navigate through complex courses without human intervention',
    robotSoccerDesc: 'Teams of robots compete in football matches with specific gameplay rules',
    lineFollowingDesc: 'Precision challenge following marked paths at maximum speed',
    sumoWrestlingDesc: 'Robot battles in a ring with pushing and strategy tactics',
    keyRules: 'Key Rules:',
    maxSize: 'Maximum size: 30x30x30 cm',
    autonomousOnly: 'Autonomous operation only',
    timeLimit: 'Time limit: 3 minutes',
    teamSize: 'Team size: 3 robots',
    matchDuration: 'Match duration: 2x10 minutes',
    ballDetection: 'Ball detection required',
    singleRobot: 'Single robot entry',
    blackLine: 'Black line on white surface',
    speedAccuracy: 'Speed and accuracy scored',
    weightLimit: 'Weight limit: 3kg',
    ringDiameter: 'Ring diameter: 154cm',
    bestOfThree: 'Best of 3 rounds',
    generalRules: 'General Rules',
    registerDeadline: 'All participants must register before the deadline',
    safetyInspection: 'Robots must pass safety inspection before competition',
    multipleCategories: 'Teams can participate in multiple categories',
    fairPlay: 'Fair play and sportsmanship are mandatory',
    protestsTime: 'Protests must be filed within 30 minutes of the event',
    judgesFinal: 'Judges\' decisions are final',
    ruleDocuments: 'Rule Documents',
    completeRuleBook: 'Complete Rule Book 2024',
    safetyGuidelines: 'Safety Guidelines',
    registrationForm: 'Registration Form',
    technicalSpecs: 'Technical Specifications',
    haveQuestions: 'Have Questions?',
    faqDesc: 'Check our comprehensive FAQ section or contact our technical committee for clarifications.',
    viewFAQ: 'View FAQ',
    contactTechnical: 'Contact Technical Committee',
    
    // About ARC Section
    ourStory: 'Our Story',
    storyDesc1: 'ARC began with a simple yet ambitious goal: to create a platform where Lebanese students and engineers could showcase their robotics skills and compete at an international level.',
    storyDesc2: 'What started as a small competition among local universities has grown into the region\'s most prestigious robotics event, attracting participants from across the Middle East and beyond.',
    storyDesc3: 'Today, ARC stands as a testament to Lebanese innovation and technical excellence, fostering the next generation of robotics engineers and entrepreneurs.',
    learnMoreImpact: 'Learn More About Our Impact',
    ourImpact: 'Our Impact',
    studentsImpacted: 'Students Impacted',
    awardsGiven: 'Awards Given',
    partnerUniversities: 'Partner Universities',
    ourJourney: 'Our Journey',
    arcFounded: 'ARC Founded',
    arcFoundedDesc: 'Established as Lebanon\'s first dedicated robotics competition platform',
    firstChampionship: 'First Championship',
    firstChampionshipDesc: 'Inaugural competition with 25 teams from across Lebanon',
    internationalRecognition: 'International Recognition',
    internationalRecognitionDesc: 'Partnered with global robotics organizations and IEEE',
    expansion: 'Expansion',
    expansionDesc: 'Added new categories and welcomed 100+ participating teams',
    recordBreaking: 'Record Breaking',
    recordBreakingDesc: 'Largest competition with 150+ teams and international participants',
    futureVision: 'Future Vision',
    futureVisionDesc: 'Launching educational programs and year-round activities',
    ourVision: 'Our Vision for the Future',
    visionDesc: 'To establish Lebanon as a regional hub for robotics innovation, creating pathways for students to pursue careers in robotics and automation while contributing to the global technology ecosystem.',
    joinOurVision: 'Join Our Vision'
};

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && savedLocale === 'en') {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = 'ltr';
  }, [locale]);

  const t = (key: string): string => {
    return translations[key as keyof typeof translations] || key;
  };

  const value: LocaleContextType = {
    locale,
    setLocale,
    t,
    isRTL: false,
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