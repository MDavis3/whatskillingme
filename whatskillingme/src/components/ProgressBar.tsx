import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  showPercentage?: boolean;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showPercentage = true,
  height = 8,
  backgroundColor = COLORS.border,
  progressColor = COLORS.primary,
  containerStyle,
  textStyle,
}) => {
  // Ensure progress is between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const percentage = Math.round(clampedProgress * 100);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.progressContainer, { height, backgroundColor }]}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${percentage}%`,
              height,
              backgroundColor: progressColor,
            },
          ]}
        />
      </View>
      
      {showPercentage && (
        <Text style={[styles.percentage, textStyle]}>
          {percentage}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.s,
  },
  progressContainer: {
    borderRadius: SIZES.base,
    overflow: 'hidden',
    width: '100%',
  },
  progressBar: {
    borderRadius: SIZES.base,
  },
  percentage: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'right',
  },
});

export default ProgressBar; 