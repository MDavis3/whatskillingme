import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  actionLabel?: string;
  onAction?: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
  actionStyle?: TextStyle;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon = 'alert-circle-outline',
  iconSize = 64,
  iconColor = COLORS.textSecondary,
  actionLabel,
  onAction,
  containerStyle,
  titleStyle,
  messageStyle,
  actionStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Ionicons name={icon} size={iconSize} color={iconColor} />
      
      <Text style={[styles.title, titleStyle]}>
        {title}
      </Text>
      
      {message && (
        <Text style={[styles.message, messageStyle]}>
          {message}
        </Text>
      )}
      
      {actionLabel && onAction && (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
          <Text style={[styles.action, actionStyle]}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginTop: SPACING.m,
    textAlign: 'center',
  },
  message: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginTop: SPACING.s,
    textAlign: 'center',
  },
  action: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.primary,
    marginTop: SPACING.m,
    textAlign: 'center',
  },
});

export default EmptyState; 