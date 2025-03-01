import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';
import Card from './Card';

interface TotalImpactSummaryProps {
  totalImpact: number;
  style?: ViewStyle;
}

const TotalImpactSummary: React.FC<TotalImpactSummaryProps> = ({
  totalImpact,
  style,
}) => {
  const getImpactColor = (impact: number) => {
    if (impact <= -5) return COLORS.impactVeryNegative;
    if (impact < 0) return COLORS.impactNegative;
    if (impact === 0) return COLORS.impactNeutral;
    if (impact <= 5) return COLORS.impactPositive;
    return COLORS.impactVeryPositive;
  };

  const formatImpact = (impact: number) => {
    const absImpact = Math.abs(impact);
    
    if (absImpact >= 1) {
      const years = Math.floor(absImpact);
      const months = Math.round((absImpact - years) * 12);
      
      if (months === 0) {
        return `${years} ${years === 1 ? 'year' : 'years'}`;
      } else if (years === 0) {
        return `${months} ${months === 1 ? 'month' : 'months'}`;
      } else {
        return `${years} ${years === 1 ? 'year' : 'years'} and ${months} ${months === 1 ? 'month' : 'months'}`;
      }
    } else {
      const months = Math.round(absImpact * 12);
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    }
  };

  const impactColor = getImpactColor(totalImpact);
  const isPositive = totalImpact >= 0;

  return (
    <Card style={{ ...styles.container, ...style }} elevation="large">
      <Text style={styles.title}>Your Total Lifespan Impact</Text>
      
      <View style={[styles.impactContainer, { backgroundColor: `${impactColor}20` }]}>
        <Text style={styles.impactLabel}>
          {isPositive ? 'You\'re gaining approximately' : 'You\'re losing approximately'}
        </Text>
        <Text style={[styles.impactValue, { color: impactColor }]}>
          {isPositive ? '+' : '-'} {formatImpact(totalImpact)}
        </Text>
        <Text style={styles.impactDescription}>
          {isPositive 
            ? 'of estimated lifespan based on your current lifestyle.' 
            : 'from your estimated lifespan based on your current lifestyle.'}
        </Text>
      </View>
      
      <Text style={styles.disclaimer}>
        This estimate is based on scientific research and statistical averages. Individual results may vary based on genetics, environment, and other factors.
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.m,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: SPACING.m,
    textAlign: 'center',
  },
  impactContainer: {
    padding: SPACING.m,
    borderRadius: SIZES.base,
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  impactLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  impactValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxlarge,
    marginVertical: SPACING.s,
    textAlign: 'center',
  },
  impactDescription: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    textAlign: 'center',
  },
  disclaimer: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default TotalImpactSummary; 