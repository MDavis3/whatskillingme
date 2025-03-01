import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, SIZES, SHADOWS, SPACING } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  // Determine button styles based on variant and size
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};
    
    // Variant styles
    switch (variant) {
      case 'primary':
        buttonStyle = {
          backgroundColor: COLORS.primary,
          borderWidth: 0,
        };
        break;
      case 'secondary':
        buttonStyle = {
          backgroundColor: COLORS.secondary,
          borderWidth: 0,
        };
        break;
      case 'outline':
        buttonStyle = {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: COLORS.primary,
        };
        break;
      default:
        buttonStyle = {
          backgroundColor: COLORS.primary,
          borderWidth: 0,
        };
    }
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: SPACING.xs,
          paddingHorizontal: SPACING.m,
          borderRadius: SIZES.radius,
        };
        break;
      case 'medium':
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: SPACING.s,
          paddingHorizontal: SPACING.l,
          borderRadius: SIZES.radius,
        };
        break;
      case 'large':
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: SPACING.m,
          paddingHorizontal: SPACING.xl,
          borderRadius: SIZES.radius * 1.5, // Extra rounded for large buttons
        };
        break;
      default:
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: SPACING.s,
          paddingHorizontal: SPACING.l,
          borderRadius: SIZES.radius,
        };
    }
    
    // Disabled style
    if (disabled) {
      buttonStyle = {
        ...buttonStyle,
        opacity: 0.5,
      };
    }
    
    // Add shadow
    buttonStyle = {
      ...buttonStyle,
      ...SHADOWS.medium,
    };
    
    return buttonStyle;
  };
  
  // Determine text styles based on variant
  const getTextStyle = () => {
    let textStyleObj: TextStyle = {
      fontSize: SIZES.font,
      fontWeight: '600',
      textAlign: 'center',
    };
    
    switch (variant) {
      case 'primary':
        textStyleObj = {
          ...textStyleObj,
          color: COLORS.white,
        };
        break;
      case 'secondary':
        textStyleObj = {
          ...textStyleObj,
          color: COLORS.white,
        };
        break;
      case 'outline':
        textStyleObj = {
          ...textStyleObj,
          color: COLORS.primary,
        };
        break;
      default:
        textStyleObj = {
          ...textStyleObj,
          color: COLORS.white,
        };
    }
    
    // Size-based text styles
    switch (size) {
      case 'small':
        textStyleObj = {
          ...textStyleObj,
          fontSize: SIZES.small,
        };
        break;
      case 'medium':
        textStyleObj = {
          ...textStyleObj,
          fontSize: SIZES.font,
        };
        break;
      case 'large':
        textStyleObj = {
          ...textStyleObj,
          fontSize: SIZES.medium,
        };
        break;
      default:
        textStyleObj = {
          ...textStyleObj,
          fontSize: SIZES.font,
        };
    }
    
    return textStyleObj;
  };
  
  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? COLORS.primary : COLORS.white}
        />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius * 1.5, // Extra rounded corners for bubbly feel
    transform: [{ scale: 1.02 }], // Slightly larger for a bubbly effect
  },
  text: {
    marginLeft: 8,
  },
});

export default Button; 