import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding2'>;

const Onboarding2Screen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNext = () => {
    navigation.navigate('Onboarding3');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressIndicator, { width: '40%' }]} />
          </View>
          <Text style={styles.progressText}>2 of 5</Text>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>How Longevity Log Works</Text>
          <Text style={styles.subtitle}>Your personal guide to a longer, healthier life</Text>
        </View>

        <View style={styles.illustrationContainer}>
          <Ionicons name="analytics-outline" size={100} color={COLORS.secondary} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.stepCard}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Log Your Day</Text>
              <Text style={styles.stepDescription}>
                Simply journal about your day in your own words. Our AI analyzes your lifestyle choices.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Get Personalized Insights</Text>
              <Text style={styles.stepDescription}>
                See how specific habits are affecting your lifespan, backed by scientific research.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Track Your Progress</Text>
              <Text style={styles.stepDescription}>
                Watch how your lifestyle changes impact your life milestones and projected lifespan.
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumberContainer}>
              <Text style={styles.stepNumber}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Achieve Your Milestones</Text>
              <Text style={styles.stepDescription}>
                Improve your chances of reaching important life events through better lifestyle choices.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.m,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginRight: SPACING.s,
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    width: 40,
    textAlign: 'right',
  },
  headerContainer: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  contentContainer: {
    marginBottom: SPACING.xl,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  stepNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  stepNumber: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  stepDescription: {
    fontSize: SIZES.font,
    color: COLORS.text,
    lineHeight: 20,
  },
  footer: {
    padding: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: SPACING.m,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: SPACING.m,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: SIZES.font,
    fontWeight: 'bold',
    marginRight: SPACING.s,
  },
});

export default Onboarding2Screen; 