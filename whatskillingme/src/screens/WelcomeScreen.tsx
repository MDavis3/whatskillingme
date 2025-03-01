import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';
import Button from '../components/Button';
import ScreenContainer from '../components/ScreenContainer';
import Card from '../components/Card';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleStartQuestionnaire = () => {
    navigation.navigate('Onboarding1');
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>What's Killing Me?</Text>
        <Text style={styles.subtitle}>Discover how your lifestyle impacts your lifespan</Text>
        
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>How it works:</Text>
          <Text style={styles.infoText}>
            1. Answer questions about your lifestyle habits
          </Text>
          <Text style={styles.infoText}>
            2. Get a personalized analysis of your lifespan impact
          </Text>
          <Text style={styles.infoText}>
            3. Receive actionable recommendations to improve your health
          </Text>
        </Card>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleStartQuestionnaire}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.disclaimer}>
          This app provides estimates based on scientific research and statistical averages.
          Results are not medical advice. Consult healthcare professionals for personal health decisions.
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.m,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxlarge,
    color: COLORS.primary,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  infoCard: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  infoTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  infoText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.m,
    borderRadius: SPACING.s,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.font,
    color: COLORS.white,
  },
  disclaimer: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default WelcomeScreen; 