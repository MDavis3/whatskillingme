import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { LifestyleFactorImpact } from '../types';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';
import Card from './Card';

interface ImpactFactorProps {
  factor: LifestyleFactorImpact;
  onPress?: () => void;
  style?: ViewStyle;
}

const ImpactFactor: React.FC<ImpactFactorProps> = ({
  factor,
  onPress,
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
        return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${months === 1 ? 'month' : 'months'}`;
      }
    } else {
      const months = Math.round(absImpact * 12);
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    }
  };

  const impactColor = getImpactColor(factor.impact);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.8}
    >
      <Card style={{ ...styles.container, ...style }}>
        <View style={styles.header}>
          <Text style={styles.category}>{factor.category}</Text>
          <View style={[styles.impactBadge, { backgroundColor: impactColor }]}>
            <Text style={styles.impactText}>
              {factor.impact >= 0 ? '+' : '-'} {formatImpact(factor.impact)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.factor}>{factor.factor}</Text>
        <Text style={styles.description}>{factor.description}</Text>
        
        {onPress && (
          <View style={styles.footer}>
            <Text style={styles.recommendations}>
              {factor.recommendations.length} {factor.recommendations.length === 1 ? 'recommendation' : 'recommendations'}
            </Text>
            <Text style={styles.viewMore}>View more</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  category: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  impactBadge: {
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.base,
  },
  impactText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: COLORS.card,
  },
  factor: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.s,
    paddingTop: SPACING.s,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  recommendations: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  viewMore: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
});

export default ImpactFactor; 