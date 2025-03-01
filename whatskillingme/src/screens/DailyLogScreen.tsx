import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, LogEntry } from '../types';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';

type DailyLogRouteProp = RouteProp<RootStackParamList, 'DailyLog'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock function to get log entry by date
const getLogEntryByDate = (date: string): LogEntry | null => {
  // In a real app, this would fetch from a database or API
  const mockEntries: LogEntry[] = [
    {
      id: '1',
      userId: 'user1',
      date: '2023-06-15',
      content: 'Had a great day today. Went for a 30-minute run and ate healthy meals.',
      extractedFactors: {
        sleep: {
          duration: 7.5,
          quality: 8,
          notes: 'Slept well but woke up once',
        },
        nutrition: {
          meals: ['Oatmeal with berries', 'Grilled chicken salad', 'Salmon with vegetables'],
          water: 8,
          alcohol: 0,
          notes: 'Ate clean all day',
        },
        exercise: {
          duration: 30,
          intensity: 'moderate',
          type: 'running',
          notes: 'Morning run in the park',
        },
        stress: {
          level: 3,
          sources: ['work deadline'],
          management: ['meditation', 'deep breathing'],
          notes: 'Managed stress well today',
        },
        social: {
          interactions: 3,
          quality: 7,
          notes: 'Had lunch with a friend',
        },
      },
      dailyImpact: {
        overallScore: 85,
        timeImpact: 120, // 2 hours of life gained
        categoryBreakdown: {
          sleep: {
            score: 75,
            impact: 30,
          },
          nutrition: {
            score: 90,
            impact: 45,
          },
          exercise: {
            score: 80,
            impact: 30,
          },
          stress: {
            score: 85,
            impact: 10,
          },
          social: {
            score: 70,
            impact: 5,
          },
        },
      },
      createdAt: '2023-06-15T20:00:00Z',
      updatedAt: '2023-06-15T20:00:00Z',
    },
  ];

  return mockEntries.find(entry => entry.date === date) || null;
};

// Format date for display
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const DailyLogScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DailyLogRouteProp>();
  const { date = getTodayDate() } = route.params || {};
  
  const [logEntry, setLogEntry] = useState<LogEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [journalContent, setJournalContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch log entry for the specified date
    const fetchLogEntry = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const entry = getLogEntryByDate(date);
        setLogEntry(entry);
        if (entry) {
          setJournalContent(entry.content);
        }
        setIsLoading(false);
      }, 500);
    };

    fetchLogEntry();
  }, [date]);

  const handleSaveJournal = () => {
    // In a real app, this would save to a database or API
    Alert.alert(
      'Save Journal Entry',
      'Your journal entry has been saved successfully!',
      [{ text: 'OK', onPress: () => setIsEditing(false) }]
    );
    
    // Update local state
    if (logEntry) {
      setLogEntry({
        ...logEntry,
        content: journalContent,
        updatedAt: new Date().toISOString(),
      });
    } else {
      // Create new entry
      const newEntry: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        userId: 'user1',
        date,
        content: journalContent,
        extractedFactors: {
          sleep: {
            duration: 0,
            quality: 0,
            notes: '',
          },
          nutrition: {
            meals: [],
            water: 0,
            alcohol: 0,
            notes: '',
          },
          exercise: {
            duration: 0,
            intensity: 'low',
            type: '',
            notes: '',
          },
          stress: {
            level: 0,
            sources: [],
            management: [],
            notes: '',
          },
          social: {
            interactions: 0,
            quality: 0,
            notes: '',
          },
        },
        dailyImpact: {
          overallScore: 0,
          timeImpact: 0,
          categoryBreakdown: {},
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLogEntry(newEntry);
    }
  };

  const handleLogFactors = () => {
    // Navigate to detailed logging screen
    if (logEntry) {
      navigation.navigate('LogEntry', { id: logEntry.id, date });
    } else {
      // Create a new entry first
      Alert.alert(
        'Create Journal Entry',
        'Please save your journal entry first before logging detailed factors.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderEmptyState = () => (
    <EmptyState
      title="No Log Entry Yet"
      message="Start tracking your daily habits to see how they impact your longevity."
      icon="journal-outline"
      actionLabel="Create Journal Entry"
      onAction={() => setIsEditing(true)}
    />
  );

  const renderJournalSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Journal</Text>
        {!isEditing && logEntry && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Ionicons name="pencil" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      {isEditing ? (
        <View style={styles.journalEditContainer}>
          <TextInput
            style={styles.journalInput}
            value={journalContent}
            onChangeText={setJournalContent}
            placeholder="How was your day? What did you eat? How did you feel?"
            multiline
            textAlignVertical="top"
          />
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveJournal}
          >
            <Text style={styles.saveButtonText}>Save Journal</Text>
          </TouchableOpacity>
        </View>
      ) : logEntry ? (
        <View style={styles.journalContainer}>
          <Text style={styles.journalText}>{logEntry.content}</Text>
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.addJournalButton}
          onPress={() => setIsEditing(true)}
        >
          <Ionicons name="add-circle-outline" size={20} color={COLORS.primary} />
          <Text style={styles.addJournalText}>Add Journal Entry</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderFactorsSection = () => {
    if (!logEntry) return null;
    
    const { extractedFactors } = logEntry;
    
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lifestyle Factors</Text>
          <TouchableOpacity onPress={handleLogFactors}>
            <Ionicons name="create-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.factorsContainer}>
          {/* Sleep */}
          <View style={styles.factorCard}>
            <View style={styles.factorHeader}>
              <Ionicons name="moon-outline" size={20} color={COLORS.primary} />
              <Text style={styles.factorTitle}>Sleep</Text>
            </View>
            <View style={styles.factorDetails}>
              <Text style={styles.factorValue}>{extractedFactors.sleep.duration} hours</Text>
              <Text style={styles.factorSubtitle}>Quality: {extractedFactors.sleep.quality}/10</Text>
            </View>
          </View>
          
          {/* Exercise */}
          <View style={styles.factorCard}>
            <View style={styles.factorHeader}>
              <Ionicons name="fitness-outline" size={20} color="#4CAF50" />
              <Text style={styles.factorTitle}>Exercise</Text>
            </View>
            <View style={styles.factorDetails}>
              <Text style={styles.factorValue}>{extractedFactors.exercise.duration} min</Text>
              <Text style={styles.factorSubtitle}>{extractedFactors.exercise.type} ({extractedFactors.exercise.intensity})</Text>
            </View>
          </View>
          
          {/* Nutrition */}
          <View style={styles.factorCard}>
            <View style={styles.factorHeader}>
              <Ionicons name="nutrition-outline" size={20} color="#FF9800" />
              <Text style={styles.factorTitle}>Nutrition</Text>
            </View>
            <View style={styles.factorDetails}>
              <Text style={styles.factorValue}>{extractedFactors.nutrition.meals.length} meals</Text>
              <Text style={styles.factorSubtitle}>{extractedFactors.nutrition.water} glasses of water</Text>
            </View>
          </View>
          
          {/* Stress */}
          <View style={styles.factorCard}>
            <View style={styles.factorHeader}>
              <Ionicons name="pulse-outline" size={20} color="#F44336" />
              <Text style={styles.factorTitle}>Stress</Text>
            </View>
            <View style={styles.factorDetails}>
              <Text style={styles.factorValue}>Level: {extractedFactors.stress.level}/10</Text>
              <Text style={styles.factorSubtitle}>{extractedFactors.stress.management.join(', ')}</Text>
            </View>
          </View>
          
          {/* Social */}
          <View style={styles.factorCard}>
            <View style={styles.factorHeader}>
              <Ionicons name="people-outline" size={20} color="#2196F3" />
              <Text style={styles.factorTitle}>Social</Text>
            </View>
            <View style={styles.factorDetails}>
              <Text style={styles.factorValue}>{extractedFactors.social.interactions} interactions</Text>
              <Text style={styles.factorSubtitle}>Quality: {extractedFactors.social.quality}/10</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderImpactSection = () => {
    if (!logEntry || !logEntry.dailyImpact) return null;
    
    const { dailyImpact } = logEntry;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Impact</Text>
        
        <View style={styles.impactCard}>
          <View style={styles.impactHeader}>
            <Text style={styles.impactTitle}>Overall Score</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{dailyImpact.overallScore}</Text>
            </View>
          </View>
          
          <View style={styles.impactDetail}>
            <Ionicons 
              name={dailyImpact.timeImpact >= 0 ? "trending-up" : "trending-down"} 
              size={24} 
              color={dailyImpact.timeImpact >= 0 ? COLORS.success : COLORS.error} 
            />
            <Text style={[
              styles.impactValue,
              { color: dailyImpact.timeImpact >= 0 ? COLORS.success : COLORS.error }
            ]}>
              {dailyImpact.timeImpact >= 0 ? '+' : ''}{dailyImpact.timeImpact} minutes of life
            </Text>
          </View>
          
          <View style={styles.categoryBreakdown}>
            <Text style={styles.breakdownTitle}>Category Breakdown</Text>
            
            {Object.entries(dailyImpact.categoryBreakdown).map(([category, data]) => (
              <View key={category} style={styles.categoryRow}>
                <Text style={styles.categoryName}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
                <View style={styles.categoryScoreBar}>
                  <View 
                    style={[
                      styles.categoryScoreFill, 
                      { width: `${data.score}%`, backgroundColor: getCategoryColor(category) }
                    ]} 
                  />
                </View>
                <Text style={styles.categoryImpact}>
                  {data.impact > 0 ? '+' : ''}{data.impact} min
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'sleep':
        return '#9C27B0'; // Purple
      case 'exercise':
        return '#4CAF50'; // Green
      case 'nutrition':
        return '#FF9800'; // Orange
      case 'stress':
        return '#F44336'; // Red
      case 'social':
        return '#2196F3'; // Blue
      default:
        return COLORS.primary;
    }
  };

  return (
    <ScreenContainer>
      <Header 
        title="Daily Log" 
        showBackButton
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate('Insights', { timeframe: 'week' })}>
            <Ionicons name="bar-chart-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        }
      />
      
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {!logEntry && !isEditing ? renderEmptyState() : (
            <>
              {renderJournalSection()}
              {renderFactorsSection()}
              {renderImpactSection()}
            </>
          )}
        </ScrollView>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.m,
  },
  dateContainer: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.cardDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dateText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SPACING.l,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  journalContainer: {
    backgroundColor: COLORS.card,
    padding: SPACING.m,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  journalText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
    lineHeight: 22,
  },
  journalEditContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  journalInput: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
    padding: SPACING.m,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.font,
    color: COLORS.white,
  },
  addJournalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardDark,
    padding: SPACING.m,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  addJournalText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  factorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  factorCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  factorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  factorTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  factorDetails: {
    marginTop: SPACING.xs,
  },
  factorValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  factorSubtitle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  impactCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    ...SHADOWS.small,
  },
  impactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  impactTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  scoreContainer: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.font,
    color: COLORS.white,
  },
  impactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  impactValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    marginLeft: SPACING.xs,
  },
  categoryBreakdown: {
    marginTop: SPACING.s,
  },
  breakdownTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  categoryName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.text,
    width: 80,
  },
  categoryScoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.cardDark,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: SPACING.s,
  },
  categoryScoreFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryImpact: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    width: 50,
    textAlign: 'right',
  },
});

export default DailyLogScreen; 