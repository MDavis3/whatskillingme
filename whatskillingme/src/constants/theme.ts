import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  // Primary colors
  primary: '#FF6B6B', // Vibrant coral pink
  primaryDark: '#E55C5C',
  primaryLight: '#FF8585',
  
  // Secondary colors
  secondary: '#00B4D8', // Vibrant cool teal
  secondaryDark: '#0095B3',
  secondaryLight: '#33C5E1',
  
  // Accent colors
  accent1: '#F4D35E', // Muted saffron
  accent2: '#F7EFE5', // Warm, creamy off-white
  
  // Neutral colors
  background: '#F7EFE5', // Warm, creamy off-white for backgrounds
  card: '#FFFFFF',
  cardDark: '#F9F9F9', // Slightly darker card for contrast
  text: '#3A3A3A', // Soft charcoal for readability
  textSecondary: '#666666', // Medium gray for secondary text
  textLight: '#999999', // Light gray for placeholders
  border: '#E0E0E0', // Light border
  
  // Semantic colors
  success: '#00B4D8', // Vibrant cool teal
  warning: '#F4D35E', // Muted saffron
  error: '#FF6B6B', // Vibrant coral pink
  info: '#00B4D8', // Vibrant cool teal
  white: '#FFFFFF',
  
  // Impact colors (for visualizing lifespan impact)
  impactVeryNegative: '#FF6B6B', // Vibrant coral pink
  impactNegative: '#FF8585', // Lighter coral
  impactNeutral: '#F7EFE5', // Warm off-white
  impactPositive: '#33C5E1', // Light teal
  impactVeryPositive: '#00B4D8', // Vibrant cool teal
};

export const FONT = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

export const SIZES = {
  // Global sizes
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xlarge: 24,
  xxlarge: 32,
  
  // Screen dimensions
  width,
  height,
  
  // Border radius
  radius: 16, // More rounded corners for bubbly feel
};

export const SHADOWS = {
  small: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3.0,
    elevation: 3,
  },
  large: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.14,
    shadowRadius: 4.0,
    elevation: 4,
  },
};

export const SPACING = {
  xs: SIZES.base / 2, // 4
  s: SIZES.base, // 8
  m: SIZES.base * 2, // 16
  l: SIZES.base * 3, // 24
  xl: SIZES.base * 4, // 32
  xxl: SIZES.base * 6, // 48
};

export default {
  COLORS,
  FONT,
  SIZES,
  SHADOWS,
  SPACING,
}; 