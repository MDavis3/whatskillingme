import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';

interface CustomSliderProps {
  label?: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  minimumLabel?: string;
  maximumLabel?: string;
  showValue?: boolean;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  valueStyle?: TextStyle;
  errorStyle?: TextStyle;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  label,
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step = 1,
  minimumLabel,
  maximumLabel,
  showValue = true,
  error,
  containerStyle,
  labelStyle,
  valueStyle,
  errorStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        {label && (
          <Text style={[styles.label, labelStyle]}>
            {label}
          </Text>
        )}
        {showValue && (
          <Text style={[styles.value, valueStyle]}>
            {value}
          </Text>
        )}
      </View>
      
      <Slider
        style={styles.slider}
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.border}
        thumbTintColor={COLORS.primary}
      />
      
      <View style={styles.labelsContainer}>
        {minimumLabel ? (
          <Text style={styles.rangeLabel}>{minimumLabel}</Text>
        ) : (
          <Text style={styles.rangeLabel}>{minimumValue}</Text>
        )}
        
        {maximumLabel ? (
          <Text style={styles.rangeLabel}>{maximumLabel}</Text>
        ) : (
          <Text style={styles.rangeLabel}>{maximumValue}</Text>
        )}
      </View>
      
      {error && (
        <Text style={[styles.error, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  label: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  value: {
    fontFamily: FONT.bold,
    fontSize: SIZES.font,
    color: COLORS.primary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -SPACING.xs,
  },
  rangeLabel: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  error: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});

export default CustomSlider; 