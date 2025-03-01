import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Challenge } from '../types';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock data for challenges
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

const ChallengesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch challenges - would be replaced with actual API call
    const fetchChallenges = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setChallenges(mockChallenges);
        setIsLoading(false);
      }, 500);
    };

    fetchChallenges();
  }, []);

  const activeChallenges = challenges.filter(challenge => !challenge.isComplete);
  const completedChallenges = challenges.filter(challenge => challenge.isComplete);

  const handleStartChallenge = (challenge: Challenge) => {
    // In a real app, this would update the challenge status in the backend
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
          },
        },
      ]
    );
  };

  const renderChallengeItem = ({ item }: { item: Challenge }) => {
    const isActive = !item.isComplete;

    return (
      <TouchableOpacity 
        style={styles.challengeCard}
        onPress={() => navigation.navigate('ChallengeDetail', { challengeId: item.id })}
      >
        <View style={styles.challengeHeader}>
          <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={styles.difficultyContainer}>
            <Text style={styles.difficultyLabel}>Difficulty:</Text>
            <View style={styles.difficultyDots}>
              <View style={[
                styles.difficultyDot, 
                { backgroundColor: COLORS.primary }
              ]} />
              <View style={[
                styles.difficultyDot, 
                { backgroundColor: item.difficulty === 'medium' || item.difficulty === 'hard' ? COLORS.primary : COLORS.border }
              ]} />
              <View style={[
                styles.difficultyDot, 
                { backgroundColor: item.difficulty === 'hard' ? COLORS.primary : COLORS.border }
              ]} />
            </View>
          </View>
        </View>

        <Text style={styles.challengeTitle}>{item.title}</Text>
        <Text style={styles.challengeDescription}>{item.description}</Text>

        <View style={styles.challengeDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{item.duration} days</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="trending-up" size={16} color={COLORS.success} />
            <Text style={styles.detailText}>+{item.potentialImpact} days</Text>
          </View>
        </View>

        {isActive ? (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              handleStartChallenge(item);
            }}
          >
            <Text style={styles.actionButtonText}>Start Challenge</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            <Text style={styles.completedText}>Completed</Text>
          </View>
        )}
      </TouchableOpacity>
    );
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

  return (
    <ScreenContainer>
      <Header title="Challenges" />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText,
            ]}
          >
            Active ({activeChallenges.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}
          >
            Completed ({completedChallenges.length})
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'active' && activeChallenges.length === 0 ? (
        <EmptyState
          title="No Active Challenges"
          message="You don't have any active challenges. Start a new challenge to improve your longevity!"
          icon="trophy-outline"
          actionLabel="Browse Challenges"
          onAction={() => {}}
        />
      ) : activeTab === 'completed' && completedChallenges.length === 0 ? (
        <EmptyState
          title="No Completed Challenges"
          message="You haven't completed any challenges yet. Complete challenges to earn longevity points!"
          icon="checkmark-circle-outline"
          actionLabel="View Active Challenges"
          onAction={() => setActiveTab('active')}
        />
      ) : (
        <FlatList
          data={activeTab === 'active' ? activeChallenges : completedChallenges}
          renderItem={renderChallengeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.m,
    marginBottom: SPACING.m,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.cardDark,
    padding: SPACING.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.s,
    alignItems: 'center',
    borderRadius: SIZES.radius - 4,
  },
  activeTab: {
    backgroundColor: COLORS.card,
    ...SHADOWS.small,
  },
  tabText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.text,
  },
  listContainer: {
    padding: SPACING.m,
  },
  challengeCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  categoryTag: {
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
  },
  categoryText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginRight: SPACING.xs,
  },
  difficultyDots: {
    flexDirection: 'row',
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  challengeTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  challengeDescription: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  challengeDetails: {
    flexDirection: 'row',
    marginBottom: SPACING.m,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  detailText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.font,
    color: COLORS.white,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radius,
  },
  completedText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.success,
    marginLeft: SPACING.xs,
  },
});

export default ChallengesScreen; 