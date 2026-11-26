export interface SubjectInfo {
  id: 'physics' | 'chemistry' | 'mathematics';
  name: string;
  tagline: string;
  description: string;
  focusAreas: string[];
  keyHighlights: string[];
  color: string;
  bgLight: string;
  badgeColor: string;
}

export const SUBJECTS_DATA: SubjectInfo[] = [
  {
    id: 'physics',
    name: 'Physics',
    tagline: 'Conceptual Clarity & Problem-Solving Mastery',
    description: 'Strengthen conceptual understanding, numerical problem-solving and weak chapters through targeted preparation.',
    focusAreas: ['Mechanics & Rotational Dynamics', 'Electrostatics & Electromagnetism', 'Optics & Modern Physics', 'Thermodynamics & Waves'],
    keyHighlights: ['Personalized syllabus based on weak topics', 'IIT Delhi student tutor', 'Maximum 3 students per batch', 'Regular doubt solving in every class', 'Weekly private 1:1 mentorship'],
    color: '#2563EB',
    bgLight: '#EFF6FF',
    badgeColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    tagline: 'Physical, Organic & Inorganic Precision',
    description: 'Improve Physical, Organic and Inorganic Chemistry according to your individual academic requirements.',
    focusAreas: ['Physical Chemistry Numerical Precision', 'Organic Reaction Mechanisms & Named Reactions', 'Inorganic Periodic Trends & Coordination Compounds', 'Targeted NCERT & JEE Question Drill'],
    keyHighlights: ['Personalized syllabus tailored to weak areas', 'IIT Delhi student tutor', 'Maximum 3 students per batch', 'Regular doubt solving in every class', 'Weekly private 1:1 mentorship'],
    color: '#059669',
    bgLight: '#ECFDF5',
    badgeColor: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    tagline: 'Analytical Rigor & Speed Development',
    description: 'Develop stronger problem-solving skills, conceptual clarity and confidence in difficult topics.',
    focusAreas: ['Calculus & Differential Equations', 'Coordinate Geometry & Vectors', 'Algebra & Complex Numbers', 'Trigonometry & Probability'],
    keyHighlights: ['Personalized syllabus addressing high-weightage gaps', 'IIT Delhi student tutor', 'Maximum 3 students per batch', 'Regular doubt solving in every class', 'Weekly private 1:1 mentorship'],
    color: '#7C3AED',
    bgLight: '#F5F3FF',
    badgeColor: 'bg-purple-100 text-purple-700'
  }
];

export const PROGRAMME_FEATURES = [
  {
    title: 'Personalized 1:3 Live Classes',
    description: 'One tutor teaches a maximum of three students, ensuring personalized attention and meaningful interaction.',
    icon: 'Users'
  },
  {
    title: 'Four Classes Every Week',
    description: 'Four 90-minute live classes providing six hours of regular teaching every week.',
    icon: 'Calendar'
  },
  {
    title: 'IIT Delhi Tutors',
    description: 'Learn from currently enrolled IIT Delhi students who have experienced the JEE preparation journey themselves.',
    icon: 'GraduationCap'
  },
  {
    title: 'Personalized Syllabus',
    description: 'Focus on weak chapters and conceptual gaps rather than following a predetermined syllabus.',
    icon: 'FileText'
  },
  {
    title: 'Personalized Batch Formation',
    description: 'Students with similar preparation levels and academic weaknesses are grouped together.',
    icon: 'Layers'
  },
  {
    title: 'Doubt Solving in Every Class',
    description: 'Ask questions and clarify difficult concepts during every regular live class.',
    icon: 'HelpCircle'
  },
  {
    title: 'Dedicated Weekend Doubt Session',
    description: 'Attend an additional weekend session for unresolved doubts and difficult concepts.',
    icon: 'MessageSquareCheck'
  },
  {
    title: '20+ Mock Tests',
    description: 'Practise regularly, evaluate your performance and identify areas requiring improvement.',
    icon: 'CheckCircle2'
  },
  {
    title: 'Weekly 1:1 Mentorship',
    description: 'Receive a private 20-minute mentorship session every weekend.',
    icon: 'UserCheck'
  },
  {
    title: 'Personalized Weekly Roadmap',
    description: 'Get a customized weekly preparation plan according to your progress and academic requirements.',
    icon: 'Compass'
  },
  {
    title: 'Exam Strategy and Guidance',
    description: 'Receive guidance on revision, time management, consistency and managing examination stress.',
    icon: 'Target'
  },
  {
    title: 'Continuous Performance Monitoring',
    description: 'Your tutor monitors your preparation and adjusts your learning priorities accordingly.',
    icon: 'TrendingUp'
  }
];

export const COMPARISON_DATA = [
  {
    feature: 'Student Batch Size',
    conventional: 'Large student batches (50-200+ students)',
    gapZero: 'Maximum 3 students per batch',
    advantage: true
  },
  {
    feature: 'Curriculum & Syllabus',
    conventional: 'Predetermined, rigid syllabus for everyone',
    gapZero: 'Personalized syllabus tailored to weak areas',
    advantage: true
  },
  {
    feature: 'Focus Areas',
    conventional: 'Same topics taught to every student',
    gapZero: 'Zeroes in on your individual weak chapters',
    advantage: true
  },
  {
    feature: 'Tutor Interaction',
    conventional: 'Limited individual attention & hesitation',
    gapZero: 'Direct, continuous personalized interaction',
    advantage: true
  },
  {
    feature: 'Preparation Roadmap',
    conventional: 'General batch-wide timetable',
    gapZero: 'Personalized weekly dynamic roadmap',
    advantage: true
  },
  {
    feature: 'Private Mentorship',
    conventional: 'Limited or non-existent 1:1 mentorship',
    gapZero: 'Weekly private 20-minute 1:1 mentorship',
    advantage: true
  }
];

export const PROBLEM_CARDS = [
  {
    title: 'Large Batches & Limited Attention',
    description: 'In classes of 50 to 100+ students, questions go unasked and personal learning gaps remain unnoticed.',
    icon: 'UserX'
  },
  {
    title: 'Low or Stagnant Mock Scores',
    description: 'Putting in 10+ hours a day without seeing your test scores increase because the root issues are unaddressed.',
    icon: 'TrendingDown'
  },
  {
    title: 'Unresolved Doubts & Conceptual Gaps',
    description: 'Small conceptual hesitations snowball into major hurdles during full-length examination simulations.',
    icon: 'AlertCircle'
  },
  {
    title: 'Fixed Syllabuses Ignoring Weaknesses',
    description: 'Forced to sit through revisions of chapters you already know well while your weakest areas are neglected.',
    icon: 'Layers'
  },
  {
    title: 'Confusion About Topic Prioritization',
    description: 'With limited time before JEE Main 2027, guessing what to study next wastes critical preparation hours.',
    icon: 'HelpCircle'
  },
  {
    title: 'Lack of Personal Accountability',
    description: 'No one tracks whether your individual weekly study targets were met or adjusts your strategy when stuck.',
    icon: 'Clock'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 'Step 1',
    title: 'Book Free Counselling',
    description: 'Register for a free 20-minute personalized counselling session with an IIT Delhi student.',
    icon: 'CalendarCheck'
  },
  {
    step: 'Step 2',
    title: 'Identify Your Weak Areas',
    description: 'Understand your preparation level, recent mock test performance and academic weaknesses.',
    icon: 'Search'
  },
  {
    step: 'Step 3',
    title: 'Get Personalized Guidance',
    description: 'Receive practical recommendations about which topics to prioritize during your remaining preparation time.',
    icon: 'Lightbulb'
  },
  {
    step: 'Step 4',
    title: 'Join Your Personalized Batch',
    description: 'If you choose to enrol, get matched with a suitable tutor and students with similar academic requirements.',
    icon: 'UserPlus'
  },
  {
    step: 'Step 5',
    title: 'Learn, Practise and Improve',
    description: 'Attend personalized classes, solve doubts, practise mock tests and receive individual mentorship.',
    icon: 'Award'
  }
];
