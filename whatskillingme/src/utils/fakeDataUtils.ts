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
const positiveLifestyleItems: Partial<LifestyleItem>[] = [
  {
    description: "Went for a 30-minute run",
    category: "exercise",
    impact: 0.2, // ~73 days lifetime
    confidence: 0.9,
    recommendations: ["Try to increase to 45 minutes for even better results"]
  },
  {
    description: "Ate a balanced meal with vegetables",
    category: "diet",
    impact: 0.15, // ~55 days lifetime
    confidence: 0.85,
    recommendations: ["Add more leafy greens for additional benefits"]
  },
  {
    description: "Meditated for 15 minutes",
    category: "stress",
    impact: 0.1, // ~36 days lifetime
    confidence: 0.8,
    recommendations: ["Consider extending to 20 minutes daily"]
  },
  {
    description: "Got 8 hours of sleep",
    category: "sleep",
    impact: 0.25, // ~91 days lifetime
    confidence: 0.95,
    recommendations: ["Maintain consistent sleep schedule"]
  },
  {
    description: "Spent quality time with friends",
    category: "social",
    impact: 0.18, // ~66 days lifetime
    confidence: 0.75,
    recommendations: ["Regular social interactions boost mental health"]
  }
];

// Sample lifestyle items with negative impacts
const negativeLifestyleItems: Partial<LifestyleItem>[] = [
  {
    description: "Skipped exercise today",
    category: "exercise",
    impact: -0.15, // ~55 days lifetime
    confidence: 0.8,
    recommendations: ["Even a short 10-minute walk is better than nothing"]
  },
  {
    description: "Had fast food for dinner",
    category: "diet",
    impact: -0.25, // ~91 days lifetime
    confidence: 0.9,
    recommendations: ["Try meal prepping to avoid last-minute unhealthy choices"]
  },
  {
    description: "Only slept 5 hours",
    category: "sleep",
    impact: -0.3, // ~110 days lifetime
    confidence: 0.95,
    recommendations: ["Aim for at least 7 hours of sleep"]
  },
  {
    description: "Worked late and felt stressed",
    category: "stress",
    impact: -0.2, // ~73 days lifetime
    confidence: 0.85,
    recommendations: ["Take short breaks every hour to reduce stress"]
  },
  {
    description: "Smoked cigarettes",
    category: "habits",
    impact: -0.4, // ~146 days lifetime
    confidence: 0.98,
    recommendations: ["Consider nicotine replacement therapy to help quit"]
  }
];

// Generate a random lifestyle item
const generateRandomLifestyleItem = (positive: boolean = Math.random() > 0.5): LifestyleItem => {
  const items = positive ? positiveLifestyleItems : negativeLifestyleItems;
  const randomItem = items[Math.floor(Math.random() * items.length)];
  
  return {
    id: generateId(),
    description: randomItem.description || "",
    category: randomItem.category || "other",
    impact: randomItem.impact || 0,
    confidence: randomItem.confidence || 0.8,
    interactions: [],
    recommendations: randomItem.recommendations || [],
  };
};

// Generate a random log entry
const generateRandomLogEntry = (): LogEntry => {
  // Generate between 1-4 lifestyle items
  const numItems = Math.floor(Math.random() * 4) + 1;
  const items: LifestyleItem[] = [];
  
  for (let i = 0; i < numItems; i++) {
    items.push(generateRandomLifestyleItem());
  }
  
  // Calculate net impact
  const netImpact = items.reduce((sum, item) => sum + item.impact, 0);
  
  // Generate random content based on items
  const content = items.map(item => item.description).join(". ") + ".";
  
  const date = generateRandomDate();
  const now = new Date().toISOString();
  
  return {
    id: generateId(),
    date,
    rawContent: content,
    items,
    netImpact,
    createdAt: now,
  };
};

// Generate multiple random log entries
export const generateRandomLogEntries = (count: number): LogEntry[] => {
  const entries: LogEntry[] = [];
  
  for (let i = 0; i < count; i++) {
    entries.push(generateRandomLogEntry());
  }
  
  return entries;
};

// Save multiple fake log entries to storage
export const saveFakeLogEntries = async (count: number): Promise<void> => {
  const entries = generateRandomLogEntries(count);
  
  for (const entry of entries) {
    await saveLogEntry(entry);
  }
};

// Clear all fake data
export const clearAllLogEntries = async (): Promise<void> => {
  const logs = await getAllLogEntries();
  
  for (const log of logs) {
    await deleteLogEntry(log.id);
  }
};

// Generate a specific log entry with a very positive impact
export const generatePositiveLogEntry = (): LogEntry => {
  const items: LifestyleItem[] = [
    {
      id: generateId(),
      description: "Ran 5 miles and did strength training",
      category: "exercise",
      impact: 0.5, // ~182 days lifetime
      confidence: 0.9,
      interactions: [],
      recommendations: ["Great job! Keep up this routine for maximum benefits."]
    },
    {
      id: generateId(),
      description: "Ate a plant-based meal with lots of vegetables",
      category: "diet",
      impact: 0.4, // ~146 days lifetime
      confidence: 0.85,
      interactions: [],
      recommendations: ["Consider adding more variety of vegetables for additional nutrients."]
    },
    {
      id: generateId(),
      description: "Practiced meditation and deep breathing",
      category: "stress",
      impact: 0.3, // ~110 days lifetime
      confidence: 0.8,
      interactions: [],
      recommendations: ["Try extending your meditation session for even better results."]
    }
  ];
  
  const netImpact = items.reduce((sum, item) => sum + item.impact, 0);
  const content = "Today was a great day for my health. " + items.map(item => item.description).join(". ") + ".";
  
  const date = generateRandomDate();
  const now = new Date().toISOString();
  
  return {
    id: generateId(),
    date,
    rawContent: content,
    items,
    netImpact,
    createdAt: now,
  };
};

// Generate a specific log entry with a very negative impact
export const generateNegativeLogEntry = (): LogEntry => {
  const items: LifestyleItem[] = [
    {
      id: generateId(),
      description: "Smoked a pack of cigarettes",
      category: "habits",
      impact: -1.0, // ~365 days lifetime
      confidence: 0.98,
      interactions: [],
      recommendations: ["Consider nicotine replacement therapy to help quit smoking."]
    },
    {
      id: generateId(),
      description: "Consumed excessive alcohol",
      category: "habits",
      impact: -0.7, // ~255 days lifetime
      confidence: 0.9,
      interactions: [],
      recommendations: ["Try to limit alcohol consumption to moderate levels."]
    },
    {
      id: generateId(),
      description: "Ate fast food for all meals",
      category: "diet",
      impact: -0.5, // ~182 days lifetime
      confidence: 0.85,
      interactions: [],
      recommendations: ["Prepare healthy meals at home to avoid fast food."]
    }
  ];
  
  const netImpact = items.reduce((sum, item) => sum + item.impact, 0);
  const content = "Not a good day for my health habits. " + items.map(item => item.description).join(". ") + ".";
  
  const date = generateRandomDate();
  const now = new Date().toISOString();
  
  return {
    id: generateId(),
    date,
    rawContent: content,
    items,
    netImpact,
    createdAt: now,
  };
}; 