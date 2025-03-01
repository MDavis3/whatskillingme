import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding1'>;

const Onboarding1Screen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressIndicator, { width: '20%' }]} />
          </View>
          <Text style={styles.progressText}>1 of 5</Text>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>The Lifespan Challenge</Text>
          <Text style={styles.subtitle}>Understanding how your daily choices affect your longevity</Text>
        </View>

        <View style={styles.illustrationContainer}>
          <Ionicons name="hourglass-outline" size={100} color={COLORS.primary} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Did you know?</Text>
          
          <View style={styles.factCard}>
            <Ionicons name="information-circle-outline" size={24} color={COLORS.secondary} style={styles.factIcon} />
            <Text style={styles.factText}>
              Up to 80% of your lifespan is determined by lifestyle factors, not genetics.
            </Text>
          </View>
          
          <View style={styles.factCard}>
            <Ionicons name="nutrition-outline" size={24} color={COLORS.secondary} style={styles.factIcon} />
            <Text style={styles.factText}>
              Simple daily habits like diet, sleep, and exercise can add or subtract years from your life.
            </Text>
          </View>
          
          <View style={styles.factCard}>
            <Ionicons name="pulse-outline" size={24} color={COLORS.secondary} style={styles.factIcon} />
            <Text style={styles.factText}>
              Most people don't realize how their everyday choices are impacting their longevity.
            </Text>
          </View>
          
          <Text style={styles.contentDescription}>
            Longevity Log helps you understand and improve the impact of your lifestyle on your lifespan, 
            so you can live longer and healthier.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
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
  contentTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  factCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  factIcon: {
    marginRight: SPACING.s,
  },
  factText: {
    flex: 1,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  contentDescription: {
    fontSize: SIZES.font,
    color: COLORS.text,
    lineHeight: 22,
    marginTop: SPACING.m,
  },
  footer: {
    padding: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: SIZES.font,
    fontWeight: 'bold',
    marginRight: SPACING.s,
  },
});

export default Onboarding1Screen; 