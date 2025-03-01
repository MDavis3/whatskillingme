import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type InsightsRouteProp = RouteProp<RootStackParamList, 'Insights'>;

// Mock data for insights
const mockInsights = {
  timeframe: 'month',
  totalImpact: 420, // minutes gained in the timeframe
  averageScore: 76,
  streaks: {
    current: 12,
    longest: 15,
  },
  categories: [
    {
      name: 'Sleep',
      score: 82,
      impact: 180,
      trend: 'up',
    },
    {
      name: 'Exercise',
      score: 68,
      impact: 120,
      trend: 'up',
    },
    {
      name: 'Nutrition',
      score: 75,
      impact: 90,
      trend: 'stable',
    },
    {
      name: 'Stress',
      score: 60,
      impact: -30,
      trend: 'down',
    },
    {
      name: 'Social',
      score: 85,
      impact: 60,
      trend: 'up',
    },
  ],
  recommendations: [
    {
      category: 'Stress',
      action: 'Try daily meditation for 10 minutes',
      potentialImpact: 45,
    },
    {
      category: 'Exercise',
      action: 'Increase workout intensity',
      potentialImpact: 30,
    },
  ],
};

const InsightsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<InsightsRouteProp>();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>(
    route.params?.timeframe || 'month'
  );
  const [insights, setInsights] = useState(mockInsights);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch insights based on timeframe
    // This would be replaced with an actual API call
    const fetchInsights = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setInsights({
          ...mockInsights,
          timeframe,
        });
        setIsLoading(false);
      }, 500);
    };

    fetchInsights();
  }, [timeframe]);

  const handleTimeframeChange = (newTimeframe: 'week' | 'month' | 'year') => {
    setTimeframe(newTimeframe);
  };

  // Placeholder components for chart visualizations
  const ImpactChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Life Impact Over Time</Text>
      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartPlaceholderText}>
          Chart visualization would go here
        </Text>
        <Text style={styles.impactTotal}>
          +{insights.totalImpact} minutes gained
        </Text>
        <Text style={styles.impactSubtext}>
          That's {Math.round(insights.totalImpact / 60 * 10) / 10} hours or {Math.round(insights.totalImpact / 60 / 24 * 100) / 100} days of healthy life
        </Text>
      </View>
    </View>
  );

  const CategoryBreakdown = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Category Breakdown</Text>
      {insights.categories.map((category, index) => (
        <View key={index} style={styles.categoryRow}>
          <View style={styles.categoryNameContainer}>
            <Text style={styles.categoryName}>{category.name}</Text>
            <View style={styles.trendContainer}>
              <Ionicons
                name={
                  category.trend === 'up'
                    ? 'arrow-up'
                    : category.trend === 'down'
                    ? 'arrow-down'
                    : 'remove'
                }
                size={14}
                color={
                  category.trend === 'up'
                    ? COLORS.success
                    : category.trend === 'down'
                    ? COLORS.error
                    : COLORS.textSecondary
                }
              />
            </View>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={styles.scoreValue}>{category.score}</Text>
          </View>
          <View style={styles.impactContainer}>
            <Text style={styles.impactLabel}>Impact</Text>
            <Text
              style={[
                styles.impactValue,
                {
                  color:
                    category.impact > 0 ? COLORS.success : COLORS.error,
                },
              ]}
            >
              {category.impact > 0 ? '+' : ''}
              {category.impact} min
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const TopRecommendations = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Top Recommendations</Text>
      {insights.recommendations.map((recommendation, index) => (
        <View key={index} style={styles.recommendationCard}>
          <View style={styles.recommendationHeader}>
            <Text style={styles.recommendationCategory}>
              {recommendation.category}
            </Text>
            <View style={styles.potentialImpactContainer}>
              <Ionicons name="trending-up" size={14} color={COLORS.success} />
              <Text style={styles.potentialImpactText}>
                +{recommendation.potentialImpact} min
              </Text>
            </View>
          </View>
          <Text style={styles.recommendationAction}>
            {recommendation.action}
          </Text>
          <TouchableOpacity style={styles.implementButton}>
            <Text style={styles.implementButtonText}>Implement</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const StreakSummary = () => (
    <View style={styles.streakContainer}>
      <Text style={styles.streakTitle}>Logging Streak</Text>
      <View style={styles.streakContent}>
        <View style={styles.streakItem}>
          <Text style={styles.streakValue}>{insights.streaks.current}</Text>
          <Text style={styles.streakLabel}>Current</Text>
        </View>
        <View style={styles.streakDivider} />
        <View style={styles.streakItem}>
          <Text style={styles.streakValue}>{insights.streaks.longest}</Text>
          <Text style={styles.streakLabel}>Longest</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScreenContainer>
      <Header title="Insights" />

      <View style={styles.timeframeSelector}>
        <TouchableOpacity
          style={[
            styles.timeframeButton,
            timeframe === 'week' && styles.timeframeButtonActive,
          ]}
          onPress={() => handleTimeframeChange('week')}
        >
          <Text
            style={[
              styles.timeframeText,
              timeframe === 'week' && styles.timeframeTextActive,
            ]}
          >
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeframeButton,
            timeframe === 'month' && styles.timeframeButtonActive,
          ]}
          onPress={() => handleTimeframeChange('month')}
        >
          <Text
            style={[
              styles.timeframeText,
              timeframe === 'month' && styles.timeframeTextActive,
            ]}
          >
            Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeframeButton,
            timeframe === 'year' && styles.timeframeButtonActive,
          ]}
          onPress={() => handleTimeframeChange('year')}
        >
          <Text
            style={[
              styles.timeframeText,
              timeframe === 'year' && styles.timeframeTextActive,
            ]}
          >
            Year
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <ImpactChart />
        <StreakSummary />
        <CategoryBreakdown />
        <TopRecommendations />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  timeframeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: SPACING.m,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    margin: SPACING.m,
  },
  timeframeButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radius,
    marginHorizontal: SPACING.xs,
  },
  timeframeButtonActive: {
    backgroundColor: COLORS.primary,
  },
  timeframeText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  timeframeTextActive: {
    color: COLORS.white,
  },
  chartContainer: {
    backgroundColor: COLORS.card,
    margin: SPACING.m,
    padding: SPACING.m,
    borderRadius: SIZES.radius,
  },
  chartTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.m,
  },
  chartPlaceholderText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.m,
  },
  impactTotal: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xlarge,
    color: COLORS.success,
  },
  impactSubtext: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  streakContainer: {
    backgroundColor: COLORS.card,
    margin: SPACING.m,
    padding: SPACING.m,
    borderRadius: SIZES.radius,
  },
  streakTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  streakContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  streakItem: {
    alignItems: 'center',
  },
  streakValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xlarge,
    color: COLORS.primary,
  },
  streakLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  streakDivider: {
    height: 40,
    width: 1,
    backgroundColor: COLORS.border,
  },
  sectionContainer: {
    backgroundColor: COLORS.card,
    margin: SPACING.m,
    padding: SPACING.m,
    borderRadius: SIZES.radius,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoryNameContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  trendContainer: {
    marginLeft: SPACING.xs,
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scoreLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  scoreValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  impactContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  impactLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  impactValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.font,
  },
  recommendationCard: {
    backgroundColor: COLORS.cardDark,
    padding: SPACING.m,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.m,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  recommendationCategory: {
    fontFamily: FONT.bold,
    fontSize: SIZES.font,
    color: COLORS.primary,
  },
  potentialImpactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
  },
  potentialImpactText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: COLORS.success,
    marginLeft: SPACING.xs,
  },
  recommendationAction: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  implementButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  implementButtonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.font,
    color: COLORS.white,
  },
});

export default InsightsScreen; 