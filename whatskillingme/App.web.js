import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from './src/constants/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's Killing Me?</Text>
      <Text style={styles.subtitle}>Web Version Coming Soon</Text>
      <Text style={styles.description}>
        This application is currently optimized for mobile devices.
        Please use the Expo Go app on your mobile device to experience the full application.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxlarge,
    color: COLORS.primary,
    marginBottom: SPACING.m,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: SPACING.l,
    textAlign: 'center',
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 500,
  },
}); 