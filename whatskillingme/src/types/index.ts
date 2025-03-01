export interface LifestyleFactorImpact {
  factor: string;
  category: string;
  impact: number; // in years (positive or negative)
  confidence: number; // 0-1 scale
  description: string;
  recommendations: Recommendation[];
}

export interface Recommendation {
  action: string;
  potentialGain: number; // in years
  difficulty: 'easy' | 'medium' | 'hard';
  timeToSeeResults: 'immediate' | 'short-term' | 'long-term';
  description: string;
}

export interface UserProfile {
  id?: string;
  displayName: string;
  birthDate: string; // ISO format
  gender: string;
  height: number; // cm
  weight: number; // kg
  initialAssessmentComplete: boolean;
  baselineLifeExpectancy: number; // in years
  currentLifeExpectancy: number; // in years
  answers: Record<string, any>;
  results?: {
    totalImpact: number;
    factors: LifestyleFactorImpact[];
  };
  createdAt: string;
  updatedAt: string;
  milestones?: UserMilestone[];
  healthConditions?: string[];
}

export interface UserMilestone {
  id: string;
  title: string;
  description: string;
  targetAge: number;
  baselineProbability: number;
  currentProbability: number;
  isCustom: boolean;
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'slider';
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  required: boolean;
  dependsOn?: {
    questionId: string;
    value: any;
  };
}

// Daily log entry type
export interface LifestyleItem {
  id: string;
  description: string; // e.g., "Waking up at 12pm"
  category: 'sleep' | 'diet' | 'exercise' | 'stress' | 'social' | 'habits' | 'other';
  impact: number; // in years (positive or negative)
  confidence: number; // 0-1 indicating confidence in the assessment
  interactions: Array<{
    itemId: string;
    effect: 'enhances' | 'diminishes' | 'neutralizes';
    description: string;
  }>;
  recommendations: string[];
  sources?: string[]; // Scientific sources/studies
}

export interface LogEntry {
  id: string;
  date: string; // ISO format
  rawContent: string; // The original diary entry
  items: LifestyleItem[];
  netImpact: number; // Overall years gained/lost
  createdAt: string;
}

// Challenge type
export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in days
  potentialImpact: number; // in days of life gained
  completionCriteria: string;
  tips: string[];
  isComplete: boolean;
}

// Streak type
export interface Streak {
  id: string;
  userId: string;
  category: string;
  currentCount: number;
  longestCount: number;
  lastUpdated: string;
}

// Navigation types
export type RootStackParamList = {
  Welcome: undefined;
  Main: undefined;
  Dashboard: undefined;
  LogEntry: { date?: string; id?: string };
  Results: { logId: string };
  History: undefined;
  Profile: undefined;
  Questionnaire: {
    sectionId: string;
  };
  Recommendations: {
    factorId: string;
  };
  DailyLog: undefined;
  Insights: undefined;
  Community: undefined;
  Challenges: undefined;
  ChallengeDetail: {
    challengeId: string;
  };
  MainTabs: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Onboarding4: undefined;
  Onboarding5: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  History: undefined;
  NewLog: undefined;
  Results: undefined;
  Profile: undefined;
}; 