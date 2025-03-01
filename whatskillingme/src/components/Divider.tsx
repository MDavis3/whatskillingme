import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';

interface DividerProps {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const Divider: React.FC<DividerProps> = ({
  label,
  orientation = 'horizontal',
  thickness = 1,
  color = COLORS.border,
  containerStyle,
  labelStyle,
}) => {
  if (orientation === 'vertical') {
    return (
      <View
        style={[
          styles.verticalDivider,
          { width: thickness, backgroundColor: color },
          containerStyle,
        ]}
      />
    );
  }

  if (label) {
    return (
      <View style={[styles.labelContainer, containerStyle]}>
        <View
          style={[
            styles.line,
            { height: thickness, backgroundColor: color },
          ]}
        />
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
        <View
          style={[
            styles.line,
            { height: thickness, backgroundColor: color },
          ]}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.horizontalDivider,
        { height: thickness, backgroundColor: color },
        containerStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontalDivider: {
    width: '100%',
    marginVertical: SPACING.m,
  },
  verticalDivider: {
    height: '100%',
    marginHorizontal: SPACING.m,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.m,
  },
  line: {
    flex: 1,
  },
  label: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginHorizontal: SPACING.m,
  },
});

export default Divider; 