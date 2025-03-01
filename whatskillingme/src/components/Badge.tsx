import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'small' | 'medium' | 'large';

interface BadgeProps {
  label?: string | number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  dot = false,
  containerStyle,
  textStyle,
}) => {
  const getBackgroundColor = (): string => {
    switch (variant) {
      case 'primary':
        return COLORS.primary;
      case 'secondary':
        return COLORS.secondary;
      case 'success':
        return COLORS.success;
      case 'warning':
        return COLORS.warning;
      case 'error':
        return COLORS.error;
      case 'info':
        return COLORS.info;
      default:
        return COLORS.primary;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    if (dot) {
      switch (size) {
        case 'small':
          return {
            width: 8,
            height: 8,
            borderRadius: 4,
          };
        case 'medium':
          return {
            width: 12,
            height: 12,
            borderRadius: 6,
          };
        case 'large':
          return {
            width: 16,
            height: 16,
            borderRadius: 8,
          };
      }
    }

    switch (size) {
      case 'small':
        return {
          paddingHorizontal: SPACING.xs,
          paddingVertical: 2,
          borderRadius: SIZES.base,
        };
      case 'medium':
        return {
          paddingHorizontal: SPACING.s,
          paddingVertical: SPACING.xs,
          borderRadius: SIZES.base,
        };
      case 'large':
        return {
          paddingHorizontal: SPACING.m,
          paddingVertical: SPACING.s,
          borderRadius: SIZES.base,
        };
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case 'small':
        return {
          fontSize: SIZES.small - 2,
        };
      case 'medium':
        return {
          fontSize: SIZES.small,
        };
      case 'large':
        return {
          fontSize: SIZES.font,
        };
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        getSizeStyle(),
        containerStyle,
      ]}
    >
      {!dot && label !== undefined && (
        <Text style={[styles.text, getTextSize(), textStyle]}>
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONT.bold,
    color: COLORS.card,
    textAlign: 'center',
  },
});

export default Badge; 