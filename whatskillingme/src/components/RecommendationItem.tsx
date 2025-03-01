import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Recommendation } from '../types';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';
import Card from './Card';

interface RecommendationItemProps {
  recommendation: Recommendation;
  style?: ViewStyle;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({
  recommendation,
  style,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return COLORS.success;
      case 'medium':
        return COLORS.warning;
      case 'hard':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case 'immediate':
        return COLORS.success;
      case 'short-term':
        return COLORS.secondary;
      case 'long-term':
        return COLORS.textSecondary;
      default:
        return COLORS.textSecondary;
    }
  };

  const formatPotentialGain = (gain: number) => {
    const absGain = Math.abs(gain);
    
    if (absGain >= 1) {
      const years = Math.floor(absGain);
      const months = Math.round((absGain - years) * 12);
      
      if (months === 0) {
        return `${years} ${years === 1 ? 'year' : 'years'}`;
      } else if (years === 0) {
        return `${months} ${months === 1 ? 'month' : 'months'}`;
      } else {
        return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${months === 1 ? 'month' : 'months'}`;
      }
    } else {
      const months = Math.round(absGain * 12);
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    }
  };

  const difficultyColor = getDifficultyColor(recommendation.difficulty);
  const timeframeColor = getTimeframeColor(recommendation.timeToSeeResults);

  return (
    <Card style={{ ...styles.container, ...style }}>
      <View style={styles.header}>
        <View style={styles.gainContainer}>
          <Text style={styles.gainLabel}>Potential Gain</Text>
          <Text style={styles.gainValue}>+{formatPotentialGain(recommendation.potentialGain)}</Text>
        </View>
        
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: `${difficultyColor}20`, borderColor: difficultyColor }]}>
            <Text style={[styles.badgeText, { color: difficultyColor }]}>
              {recommendation.difficulty.charAt(0).toUpperCase() + recommendation.difficulty.slice(1)}
            </Text>
          </View>
          
          <View style={[styles.badge, { backgroundColor: `${timeframeColor}20`, borderColor: timeframeColor }]}>
            <Text style={[styles.badgeText, { color: timeframeColor }]}>
              {recommendation.timeToSeeResults.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.action}>{recommendation.action}</Text>
      <Text style={styles.description}>{recommendation.description}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.s,
  },
  gainContainer: {
    flexDirection: 'column',
  },
  gainLabel: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  gainValue: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.success,
  },
  badges: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: SPACING.xs,
  },
  badge: {
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.base,
    borderWidth: 1,
  },
  badgeText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
  },
  action: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
});

export default RecommendationItem; 