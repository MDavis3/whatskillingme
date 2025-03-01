import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { COLORS, SIZES, SHADOWS, SPACING } from '../constants/theme';

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'outlined' | 'elevated';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
  ...rest
}) => {
  const getCardStyle = (): ViewStyle => {
    let cardStyle: ViewStyle = {
      backgroundColor: COLORS.card,
      borderRadius: SIZES.radius * 1.5, // More rounded for bubbly feel
      padding: SPACING.m,
    };

    switch (variant) {
      case 'outlined':
        cardStyle = {
          ...cardStyle,
          borderWidth: 2,
          borderColor: COLORS.border,
          backgroundColor: COLORS.card,
        };
        break;
      case 'elevated':
        cardStyle = {
          ...cardStyle,
          backgroundColor: COLORS.card,
          ...SHADOWS.medium,
          borderWidth: 0,
        };
        break;
      default:
        cardStyle = {
          ...cardStyle,
          backgroundColor: COLORS.card,
          ...SHADOWS.small,
        };
    }

    return cardStyle;
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.container, getCardStyle(), style]}
        onPress={onPress}
        activeOpacity={0.9}
        {...rest}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, getCardStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius * 1.5,
    overflow: 'hidden',
    transform: [{ scale: 1.01 }], // Slightly larger for a bubbly effect
  },
});

export default Card; 