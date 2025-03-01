import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';
import Button from '../components/Button';
import ScreenContainer from '../components/ScreenContainer';
import Card from '../components/Card';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Recommendations'>;
type RecommendationsScreenRouteProp = RouteProp<RootStackParamList, 'Recommendations'>;

// Sample recommendations data
const recommendationsData = {
  exercise: {
    name: 'Exercise',
    impact: +2.3,
    recommendations: [
      {
        id: 'ex1',
        title: 'Daily Walking',
        description: 'Walk for at least 30 minutes every day to improve cardiovascular health.',
        difficulty: 'Easy',
        timeFrame: 'Short-term',
        potentialGain: 0.8,
      },
      {
        id: 'ex2',
        title: 'Strength Training',
        description: 'Add strength training 2-3 times per week to build muscle mass and improve metabolism.',
        difficulty: 'Medium',
        timeFrame: 'Medium-term',
        potentialGain: 1.2,
      },
      {
        id: 'ex3',
        title: 'High-Intensity Interval Training',
        description: 'Incorporate HIIT workouts 1-2 times per week for maximum cardiovascular benefit.',
        difficulty: 'Hard',
        timeFrame: 'Long-term',
        potentialGain: 1.5,
      },
    ],
  },
  diet: {
    name: 'Diet',
    impact: -1.5,
    recommendations: [
      {
        id: 'diet1',
        title: 'Increase Vegetable Intake',
        description: 'Aim for at least 5 servings of vegetables daily.',
        difficulty: 'Easy',
        timeFrame: 'Short-term',
        potentialGain: 0.7,
      },
      {
        id: 'diet2',
        title: 'Reduce Processed Foods',
        description: 'Cut processed foods by 50% and replace with whole foods.',
        difficulty: 'Medium',
        timeFrame: 'Medium-term',
        potentialGain: 1.0,
      },
      {
        id: 'diet3',
        title: 'Mediterranean Diet',
        description: 'Adopt a Mediterranean diet rich in olive oil, fish, nuts, and whole grains.',
        difficulty: 'Medium',
        timeFrame: 'Long-term',
        potentialGain: 1.5,
      },
    ],
  },
  sleep: {
    name: 'Sleep',
    impact: +0.8,
    recommendations: [
      {
        id: 'sleep1',
        title: 'Consistent Sleep Schedule',
        description: 'Go to bed and wake up at the same time every day, even on weekends.',
        difficulty: 'Medium',
        timeFrame: 'Short-term',
        potentialGain: 0.3,
      },
      {
        id: 'sleep2',
        title: 'Optimize Sleep Environment',
        description: 'Keep your bedroom dark, quiet, and cool for optimal sleep quality.',
        difficulty: 'Easy',
        timeFrame: 'Short-term',
        potentialGain: 0.2,
      },
    ],
  },
  stress: {
    name: 'Stress',
    impact: -1.2,
    recommendations: [
      {
        id: 'stress1',
        title: 'Daily Meditation',
        description: 'Practice meditation for 10-15 minutes daily to reduce stress levels.',
        difficulty: 'Medium',
        timeFrame: 'Medium-term',
        potentialGain: 0.6,
      },
      {
        id: 'stress2',
        title: 'Regular Breaks',
        description: 'Take short breaks throughout the day to reset and reduce accumulated stress.',
        difficulty: 'Easy',
        timeFrame: 'Short-term',
        potentialGain: 0.3,
      },
      {
        id: 'stress3',
        title: 'Limit News Consumption',
        description: 'Reduce exposure to negative news and social media to lower anxiety levels.',
        difficulty: 'Medium',
        timeFrame: 'Short-term',
        potentialGain: 0.4,
      },
    ],
  },
};

const RecommendationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RecommendationsScreenRouteProp>();
  const { factorId } = route.params;
  
  // Get the factor data based on the factorId
  const factorData = recommendationsData[factorId as keyof typeof recommendationsData];
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  if (!factorData) {
    return (
      <ScreenContainer>
        <View style={styles.container}>
          <Text style={styles.title}>Recommendations</Text>
          <Text style={styles.errorText}>No recommendations found for this factor.</Text>
          <Button 
            title="Go Back" 
            onPress={handleBack}
            size="large"
            style={styles.backButton}
          />
        </View>
      </ScreenContainer>
    );
  }
  
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{factorData.name} Recommendations</Text>
          
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Current Impact</Text>
            <Text 
              style={[
                styles.impactValue, 
                factorData.impact > 0 ? styles.positiveImpact : styles.negativeImpact
              ]}
            >
              {factorData.impact > 0 ? '+' : ''}{factorData.impact} years
            </Text>
            <Text style={styles.summaryDescription}>
              Making these recommended changes could significantly improve your life expectancy.
            </Text>
          </Card>
          
          <Text style={styles.sectionTitle}>Recommended Actions</Text>
          
          {factorData.recommendations.map((recommendation) => (
            <Card key={recommendation.id} style={styles.recommendationCard}>
              <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
              <Text style={styles.recommendationDescription}>{recommendation.description}</Text>
              
              <View style={styles.recommendationDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Difficulty:</Text>
                  <Text style={styles.detailValue}>{recommendation.difficulty}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Time Frame:</Text>
                  <Text style={styles.detailValue}>{recommendation.timeFrame}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Potential Gain:</Text>
                  <Text style={[styles.detailValue, styles.positiveImpact]}>
                    +{recommendation.potentialGain} years
                  </Text>
                </View>
              </View>
            </Card>
          ))}
          
          <Button 
            title="Back to Results" 
            onPress={handleBack}
            size="large"
            style={styles.backButton}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: SPACING.m,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxlarge,
    color: COLORS.primary,
    marginBottom: SPACING.m,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SPACING.l,
  },
  summaryCard: {
    padding: SPACING.m,
    marginBottom: SPACING.l,
    alignItems: 'center',
  },
  summaryTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  impactValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xlarge,
    marginBottom: SPACING.m,
  },
  positiveImpact: {
    color: COLORS.success,
  },
  negativeImpact: {
    color: COLORS.error,
  },
  summaryDescription: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  recommendationCard: {
    padding: SPACING.m,
    marginBottom: SPACING.m,
  },
  recommendationTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  recommendationDescription: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  recommendationDetails: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: SPACING.s,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  detailLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  backButton: {
    marginTop: SPACING.l,
  },
});

export default RecommendationsScreen; 