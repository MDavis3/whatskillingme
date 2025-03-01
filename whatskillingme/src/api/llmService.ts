import axios from 'axios';
import { LogEntry } from '../types';

// Gemini API key - in production, this should be stored securely
// and accessed through environment variables
const API_KEY = 'AIzaSyDNg6Tj0UHd2IybxNK5RxJ9w8UXm-GrFh0';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// The system prompt that guides the LLM's analysis
const SYSTEM_PROMPT = `
You are an expert longevity analyst with deep knowledge of scientific research on lifestyle factors affecting lifespan.

TASK:
Analyze the user's daily journal entry and extract distinct lifestyle factors. For each factor:
1. Categorize it (sleep, diet, exercise, etc.)
2. Estimate its impact on lifespan
3. Consider interaction effects with other identified factors
4. Provide evidence-based quantification in minutes/seconds of life impact
5. Suggest actionable improvements

FORMAT YOUR RESPONSE AS JSON:
{
  "items": [
    {
      "id": "unique-id",
      "description": "Concise description of the lifestyle factor",
      "category": "sleep|diet|exercise|stress|social|habits|other",
      "impact": -0.0000029, // Estimated lifespan impact in years (negative for reduction)
                          // This should be a VERY small value, as a single day's action typically
                          // only impacts lifespan by seconds or a few minutes at most
                          // Example: -0.0000029 years = -15 seconds
                          // Example: -0.000019 years = -10 minutes
      "confidence": 0.8, // 0-1 scale indicating scientific confidence
      "interactions": [
        {
          "itemId": "id-of-interacting-factor",
          "effect": "enhances|diminishes|neutralizes",
          "description": "How this interaction works"
        }
      ],
      "recommendations": ["Specific actionable recommendation"],
      "sources": ["Brief scientific source or study reference"]
    }
  ],
  "netImpact": -0.0000057 // Overall estimated lifespan impact in years
                        // Example: -0.0000057 years = -30 seconds
                        // This should be very small for a single day's activities
}

ANALYSIS PRINCIPLES:
- Base estimates on peer-reviewed research
- Be EXTREMELY realistic about impact magnitudes - a single day's action typically impacts lifespan by seconds or a few minutes at most, not hours or days
- For reference: 1 second = 0.00000003 years, 1 minute = 0.0000019 years, 1 hour = 0.000114 years
- Even significant activities like exercise typically only add seconds or minutes to lifespan for a single day
- Social activities like spending time with friends might add 15-30 seconds for a single day
- Consider both immediate and long-term effects
- Acknowledge uncertainty where appropriate
- Focus on the most significant factors first
- Personalize analysis to the individual's specific situation

If you identify concerning patterns that could significantly impact lifespan (e.g., signs of depression, harmful substance use), include these with appropriate sensitivity.
`;

export const analyzeLogEntry = async (logContent: string): Promise<LogEntry> => {
  try {
    // Prepare the request payload for Gemini API
    const payload = {
      contents: [
        {
          parts: [
            { text: SYSTEM_PROMPT },
            { text: `User's journal entry: ${logContent}` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
      }
    };

    // Make the API request
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    // Extract the response text
    const responseText = response.data.candidates[0].content.parts[0].text;
    
    // Extract the JSON part from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from LLM response');
    }
    
    const analysisData = JSON.parse(jsonMatch[0]);
    
    // Create a unique ID and timestamp
    const timestamp = new Date().toISOString();
    const id = `log-${Date.now()}`;
    
    return {
      id,
      date: timestamp,
      rawContent: logContent,
      items: analysisData.items || [],
      netImpact: analysisData.netImpact || 0,
      createdAt: timestamp
    };
  } catch (error) {
    console.error('Error analyzing log entry:', error);
    throw error;
  }
};

// Mock function for testing without API calls
export const mockAnalyzeLogEntry = async (logContent: string): Promise<LogEntry> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const timestamp = new Date().toISOString();
  const id = `log-${Date.now()}`;
  
  // Check if the log content contains "spent time with friends" or similar
  const isSocialActivity = /spent.*time.*friend|social|hang.*out|meet.*friend/i.test(logContent);
  
  if (isSocialActivity) {
    // For social activities, provide a small positive impact
    return {
      id,
      date: timestamp,
      rawContent: logContent,
      items: [
        {
          id: 'social-1',
          description: 'Spent quality time with friends',
          category: 'social',
          impact: 0.0000029, // +15 seconds
          confidence: 0.85,
          interactions: [],
          recommendations: [
            'Continue nurturing social connections regularly',
            'Try to engage in meaningful conversations during social gatherings'
          ],
          sources: ['Holt-Lunstad, J. et al. (2010). Social Relationships and Mortality Risk: A Meta-analytic Review']
        }
      ],
      netImpact: 0.0000029, // +15 seconds
      createdAt: timestamp
    };
  }
  
  // Default mock data with realistic impact values
  return {
    id,
    date: timestamp,
    rawContent: logContent,
    items: [
      {
        id: 'sleep-1',
        description: 'Waking up at 12:00 PM',
        category: 'sleep',
        impact: -0.0000057, // -30 seconds
        confidence: 0.85,
        interactions: [
          {
            itemId: 'diet-1',
            effect: 'enhances',
            description: 'Late wake-up time leads to delayed first meal, extending fasting period'
          }
        ],
        recommendations: [
          'Gradually shift wake-up time earlier by 15 minutes each day',
          'Expose yourself to natural light immediately upon waking'
        ],
        sources: ['Walker, M. (2017). Why We Sleep: The New Science of Sleep and Dreams']
      },
      {
        id: 'diet-1',
        description: 'First meal at 6:40 PM (extended fasting)',
        category: 'diet',
        impact: 0.0000038, // +20 seconds
        confidence: 0.7,
        interactions: [],
        recommendations: [
          'Maintain time-restricted eating but consider a slightly earlier eating window',
          'Ensure adequate nutrition during eating window'
        ],
        sources: ['Longo, V. D., & Panda, S. (2016). Fasting, circadian rhythms, and time-restricted feeding in healthy lifespan']
      },
      {
        id: 'hydration-1',
        description: 'Drinking only half a glass of water daily',
        category: 'diet',
        impact: -0.0000057, // -30 seconds
        confidence: 0.9,
        interactions: [],
        recommendations: [
          'Gradually increase water intake to at least 8 glasses per day',
          'Set reminders to drink water throughout your waking hours'
        ],
        sources: ['National Academies of Sciences, Engineering, and Medicine. (2004). Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate']
      }
    ],
    netImpact: -0.0000076, // -40 seconds
    createdAt: timestamp
  };
};

// For development, use the mock function
// For production, use the real function
export const analyzeLogEntryDev = __DEV__ ? mockAnalyzeLogEntry : analyzeLogEntry; 