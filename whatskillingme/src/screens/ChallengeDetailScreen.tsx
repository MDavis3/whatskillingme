import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Challenge } from '../types';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';

type ChallengeDetailRouteProp = RouteProp<RootStackParamList, 'ChallengeDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock function to get challenge by ID
const getChallengeById = (id: string): Challenge | undefined => {
  const mockChallenges: Challenge[] = [
    {
      id: '1',
      title: '10,000 Steps Daily',
      description: 'Walk 10,000 steps every day for a week to improve cardiovascular health and boost longevity.',
      category: 'Exercise',
      difficulty: 'medium',
      duration: 7, // days
      potentialImpact: 2, // days of life gained
      completionCriteria: 'Complete 10,000 steps for 7 consecutive days',
      tips: [
        'Use a fitness tracker to count steps',
        'Take the stairs instead of elevator',
        'Park farther away from entrances',
        'Take walking meetings',
      ],
      isComplete: false,
    },
    {
      id: '2',
      title: 'Meditation Habit Builder',
      description: 'Meditate for at least 10 minutes daily to reduce stress and improve mental wellbeing.',
      category: 'Stress',
      difficulty: 'easy',
      duration: 14, // days
      potentialImpact: 3, // days of life gained
      completionCriteria: 'Meditate for at least 10 minutes daily for 14 days',
      tips: [
        'Use a meditation app for guidance',
        'Start with shorter sessions if needed',
        'Try different meditation styles',
        'Same time each day builds habit',
      ],
      isComplete: false,
    },
    {
      id: '3',
      title: 'Sugar Detox',
      description: 'Eliminate added sugars from your diet for 21 days to reset taste buds and improve metabolic health.',
      category: 'Nutrition',
      difficulty: 'hard',
      duration: 21, // days
      potentialImpact: 5, // days of life gained
      completionCriteria: 'No foods with added sugar for 21 days',
      tips: [
        'Read food labels carefully',
        'Prepare meals at home',
        'Use fruit to satisfy sweet cravings',
        'Stay hydrated',
      ],
      isComplete: true,
    },
    {
      id: '4',
      title: 'Sleep Optimization',
      description: 'Improve your sleep quality by maintaining a consistent sleep schedule for 10 days.',
      category: 'Sleep',
      difficulty: 'medium',
      duration: 10, // days
      potentialImpact: 4, // days of life gained
      completionCriteria: 'Go to bed and wake up at the same time for 10 days',
      tips: [
        'No screens 1 hour before bed',
        'Keep bedroom cool and dark',
        'Avoid caffeine after noon',
        'Create a relaxing bedtime routine',
      ],
      isComplete: false,
    },
  ];

  return mockChallenges.find(challenge => challenge.id === id);
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Exercise':
      return '#4CAF50'; // Green
    case 'Nutrition':
      return '#FF9800'; // Orange
    case 'Sleep':
      return '#2196F3'; // Blue
    case 'Stress':
      return '#9C27B0'; // Purple
    default:
      return COLORS.primary;
  }
};

const getDifficultyText = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy':
      return 'Easy';
    case 'medium':
      return 'Medium';
    case 'hard':
      return 'Hard';
    default:
      return 'Unknown';
  }
};

const ChallengeDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ChallengeDetailRouteProp>();
  const { challengeId } = route.params;
  
  const challenge = getChallengeById(challengeId);
  
  if (!challenge) {
    return (
      <ScreenContainer>
        <Header title="Challenge Details" showBackButton />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Challenge not found</Text>
        </View>
      </ScreenContainer>
    );
  }

  const handleStartChallenge = () => {
    Alert.alert(
      'Start Challenge',
      `Are you ready to start the "${challenge.title}" challenge?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Start',
          onPress: () => {
            // Update challenge status logic would go here
            Alert.alert('Challenge Started!', 'Good luck on your journey to better health!');
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleCompleteChallenge = () => {
    Alert.alert(
      'Complete Challenge',
      'Did you complete all the requirements for this challenge?',
      [
        {
          text: 'No, Not Yet',
          style: 'cancel',
        },
        {
          text: 'Yes, Complete It',
          onPress: () => {
            // Update challenge status logic would go here
            Alert.alert('Congratulations!', `You've earned ${challenge.potentialImpact} days of additional life expectancy!`);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <Header title="Challenge Details" showBackButton />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.categoryContainer}>
          <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(challenge.category) }]}>
            <Text style={styles.categoryText}>{challenge.category}</Text>
          </View>
        </View>
        
        <Text style={styles.title}>{challenge.title}</Text>
        <Text style={styles.description}>{challenge.description}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>{challenge.duration} days</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="trending-up" size={20} color={COLORS.success} />
            <Text style={styles.infoText}>+{challenge.potentialImpact} days of life</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="fitness-outline" size={20} color={COLORS.warning} />
            <Text style={styles.infoText}>Difficulty: {getDifficultyText(challenge.difficulty)}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completion Criteria</Text>
          <View style={styles.criteriaContainer}>
            <Ionicons name="checkmark-circle-outline" size={24} color={COLORS.primary} />
            <Text style={styles.criteriaText}>{challenge.completionCriteria}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips for Success</Text>
          {challenge.tips.map((tip, index) => (
            <View key={index} style={styles.tipContainer}>
              <Ionicons name="bulb-outline" size={20} color={COLORS.primary} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
        
        {!challenge.isComplete ? (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleStartChallenge}
          >
            <Text style={styles.actionButtonText}>Start Challenge</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.completedContainer}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
            <Text style={styles.completedText}>Challenge Completed</Text>
          </View>
        )}
        
        {!challenge.isComplete && (
          <TouchableOpacity 
            style={styles.completeButton}
            onPress={handleCompleteChallenge}
          >
            <Text style={styles.completeButtonText}>Mark as Completed</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.m,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.error,
  },
  categoryContainer: {
    marginBottom: SPACING.m,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
  },
  categoryText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xlarge,
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SPACING.l,
    lineHeight: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.l,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.l,
    marginBottom: SPACING.s,
  },
  infoText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  section: {
    marginBottom: SPACING.l,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  criteriaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.m,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  criteriaText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginLeft: SPACING.s,
    flex: 1,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s,
    backgroundColor: COLORS.card,
    padding: SPACING.m,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  tipText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginLeft: SPACING.s,
    flex: 1,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.m,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginBottom: SPACING.m,
    ...SHADOWS.medium,
  },
  actionButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  completeButton: {
    backgroundColor: COLORS.cardDark,
    paddingVertical: SPACING.m,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  completeButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardDark,
    paddingVertical: SPACING.m,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.xl,
  },
  completedText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.success,
    marginLeft: SPACING.s,
  },
});

export default ChallengeDetailScreen; 