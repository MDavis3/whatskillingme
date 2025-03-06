/*
 * This file is not used in the simplified version of the app.
 * It contains utilities for generating fake data for testing purposes.
 * It has been commented out but preserved for future reference.
 */

/*
import { LogEntry, LifestyleItem } from '../types';
import { saveLogEntry, getAllLogEntries, deleteLogEntry } from './storageUtils';

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Generate a random date within the last 3 months
const generateRandomDate = () => {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);
  
  const randomTimestamp = threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime());
  return new Date(randomTimestamp).toISOString();
};

// Sample lifestyle categories
const categories = ['sleep', 'diet', 'exercise', 'stress', 'social', 'habits', 'other'] as const;

// Sample lifestyle items with positive impacts
const positiveLifestyleItems = [
  {
    description: 'Getting 8 hours of sleep',
    category: 'sleep',
    impact: 0.000019, // +10 minutes
    confidence: 0.9,
    recommendations: ['Maintain consistent sleep schedule', 'Avoid screens before bed']
  },
  {
    description: 'Morning meditation for 15 minutes',
    category: 'stress',
    impact: 0.000019, // +10 minutes
    confidence: 0.8,
    recommendations: ['Try guided meditation apps', 'Increase duration gradually']
  },
  {
    description: '30 minutes of moderate exercise',
    category: 'exercise',
    impact: 0.000038, // +20 minutes
    confidence: 0.95,
    recommendations: ['Aim for 150 minutes weekly', 'Mix cardio and strength training']
  },
  {
    description: 'Eating a vegetable-rich meal',
    category: 'diet',
    impact: 0.000029, // +15 minutes
    confidence: 0.85,
    recommendations: ['Aim for 5 servings of vegetables daily', 'Vary colors for diverse nutrients']
  },
  {
    description: 'Quality time with friends',
    category: 'social',
    impact: 0.000019, // +10 minutes
    confidence: 0.75,
    recommendations: ['Prioritize meaningful connections', 'Schedule regular social activities']
  },
  {
    description: 'Reading for 30 minutes',
    category: 'habits',
    impact: 0.000010, // +5 minutes
    confidence: 0.7,
    recommendations: ['Choose engaging material', 'Make it a daily habit']
  },
  {
    description: 'Drinking 8 glasses of water',
    category: 'diet',
    impact: 0.000019, // +10 minutes
    confidence: 0.8,
    recommendations: ['Carry a water bottle', 'Set hydration reminders']
  }
];

// Sample lifestyle items with negative impacts
const negativeLifestyleItems = [
  {
    description: 'Only sleeping 5 hours',
    category: 'sleep',
    impact: -0.000038, // -20 minutes
    confidence: 0.9,
    recommendations: ['Prioritize sleep', 'Create a bedtime routine']
  },
  {
    description: 'High stress workday',
    category: 'stress',
    impact: -0.000029, // -15 minutes
    confidence: 0.8,
    recommendations: ['Practice stress management techniques', 'Take short breaks']
  },
  {
    description: 'Sedentary day with no exercise',
    category: 'exercise',
    impact: -0.000038, // -20 minutes
    confidence: 0.85,
    recommendations: ['Incorporate movement breaks', 'Schedule exercise time']
  },
  {
    description: 'Fast food meal',
    category: 'diet',
    impact: -0.000048, // -25 minutes
    confidence: 0.9,
    recommendations: ['Prepare meals in advance', 'Choose healthier options when eating out']
  },
  {
    description: 'Social isolation',
    category: 'social',
    impact: -0.000029, // -15 minutes
    confidence: 0.75,
    recommendations: ['Reach out to friends or family', 'Join community activities']
  },
  {
    description: 'Excessive screen time',
    category: 'habits',
    impact: -0.000019, // -10 minutes
    confidence: 0.7,
    recommendations: ['Set screen time limits', 'Take regular breaks']
  },
  {
    description: 'Alcohol consumption',
    category: 'habits',
    impact: -0.000057, // -30 minutes
    confidence: 0.85,
    recommendations: ['Limit alcohol intake', 'Have alcohol-free days']
  }
];

// Generate a random lifestyle item
const generateRandomLifestyleItem = (positive: boolean = Math.random() > 0.5): LifestyleItem => {
  const items = positive ? positiveLifestyleItems : negativeLifestyleItems;
  const template = items[Math.floor(Math.random() * items.length)];
  
  return {
    id: generateId(),
    description: template.description,
    category: template.category,
    impact: template.impact,
    confidence: template.confidence,
    interactions: [],
    recommendations: template.recommendations,
    sources: ['Research Journal of Health, 2023']
  };
};

// Generate a random log entry
const generateRandomLogEntry = (): LogEntry => {
  const isPositive = Math.random() > 0.5;
  const itemCount = Math.floor(Math.random() * 3) + 1; // 1-3 items
  const items: LifestyleItem[] = [];
  let netImpact = 0;
  
  for (let i = 0; i < itemCount; i++) {
    const item = generateRandomLifestyleItem(isPositive);
    items.push(item);
    netImpact += item.impact;
  }
  
  const date = generateRandomDate();
  const dayActivities = isPositive 
    ? ['I had a productive day', 'I felt energetic', 'I made healthy choices'] 
    : ['I had a stressful day', 'I felt tired', 'I made some poor choices'];
  
  const randomActivity = dayActivities[Math.floor(Math.random() * dayActivities.length)];
  
  return {
    id: generateId(),
    date,
    rawContent: `${randomActivity} today. ${items.map(item => item.description).join('. ')}.`,
    items,
    netImpact,
    createdAt: date
  };
};

// Generate multiple random log entries
export const generateRandomLogEntries = (count: number): LogEntry[] => {
  const entries: LogEntry[] = [];
  
  for (let i = 0; i < count; i++) {
    entries.push(generateRandomLogEntry());
  }
  
  // Sort by date, newest first
  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Save multiple fake log entries to storage
export const saveFakeLogEntries = async (count: number): Promise<void> => {
  const entries = generateRandomLogEntries(count);
  
  for (const entry of entries) {
    await saveLogEntry(entry);
  }
};

// Clear all log entries from storage
export const clearAllLogEntries = async (): Promise<void> => {
  const entries = await getAllLogEntries();
  
  for (const entry of entries) {
    await deleteLogEntry(entry.id);
  }
};

// Generate a positive log entry with specific content
export const generatePositiveLogEntry = (): LogEntry => {
  const items: LifestyleItem[] = [
    {
      id: generateId(),
      description: 'Getting 8 hours of sleep',
      category: 'sleep',
      impact: 0.000019, // +10 minutes
      confidence: 0.9,
      interactions: [],
      recommendations: ['Maintain consistent sleep schedule', 'Avoid screens before bed'],
      sources: ['Walker, M. (2017). Why We Sleep: The New Science of Sleep and Dreams']
    },
    {
      id: generateId(),
      description: '30 minutes of moderate exercise',
      category: 'exercise',
      impact: 0.000038, // +20 minutes
      confidence: 0.95,
      interactions: [],
      recommendations: ['Aim for 150 minutes weekly', 'Mix cardio and strength training'],
      sources: ['American Heart Association (2018). Physical Activity Guidelines']
    },
    {
      id: generateId(),
      description: 'Eating a vegetable-rich meal',
      category: 'diet',
      impact: 0.000029, // +15 minutes
      confidence: 0.85,
      interactions: [],
      recommendations: ['Aim for 5 servings of vegetables daily', 'Vary colors for diverse nutrients'],
      sources: ['Harvard T.H. Chan School of Public Health (2021). The Nutrition Source']
    }
  ];
  
  let netImpact = 0;
  for (const item of items) {
    netImpact += item.impact;
  }
  
  const date = new Date().toISOString();
  
  return {
    id: generateId(),
    date,
    rawContent: "I had a great day today. I slept 8 hours, went for a 30-minute jog, and had a salad for lunch.",
    items,
    netImpact,
    createdAt: date
  };
};

// Generate a negative log entry with specific content
export const generateNegativeLogEntry = (): LogEntry => {
  const items: LifestyleItem[] = [
    {
      id: generateId(),
      description: 'Only sleeping 5 hours',
      category: 'sleep',
      impact: -0.000038, // -20 minutes
      confidence: 0.9,
      interactions: [],
      recommendations: ['Prioritize sleep', 'Create a bedtime routine'],
      sources: ['Walker, M. (2017). Why We Sleep: The New Science of Sleep and Dreams']
    },
    {
      id: generateId(),
      description: 'Sedentary day with no exercise',
      category: 'exercise',
      impact: -0.000038, // -20 minutes
      confidence: 0.85,
      interactions: [],
      recommendations: ['Incorporate movement breaks', 'Schedule exercise time'],
      sources: ['American Heart Association (2018). Physical Activity Guidelines']
    },
    {
      id: generateId(),
      description: 'Fast food meal',
      category: 'diet',
      impact: -0.000048, // -25 minutes
      confidence: 0.9,
      interactions: [],
      recommendations: ['Prepare meals in advance', 'Choose healthier options when eating out'],
      sources: ['Harvard T.H. Chan School of Public Health (2021). The Nutrition Source']
    }
  ];
  
  let netImpact = 0;
  for (const item of items) {
    netImpact += item.impact;
  }
  
  const date = new Date().toISOString();
  
  return {
    id: generateId(),
    date,
    rawContent: "Had a rough day today. Only got 5 hours of sleep, sat at my desk all day, and had fast food for dinner.",
    items,
    netImpact,
    createdAt: date
  };
};
*/ 