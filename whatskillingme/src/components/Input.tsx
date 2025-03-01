import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SPACING } from '../constants/theme';

// Define the type for Ionicons names
type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: IoniconsName;
  rightIcon?: IoniconsName;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  isPassword = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedInput,
          error && styles.errorInput,
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={COLORS.textSecondary}
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.textLight}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...rest}
        />
        
        {isPassword ? (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.rightIcon}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
            disabled={!onRightIconPress}
          >
            <Ionicons
              name={rightIcon}
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
  },
  label: {
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius * 1.2, // More rounded for bubbly feel
    backgroundColor: COLORS.cardDark,
    paddingHorizontal: SPACING.m,
    height: 50,
  },
  focusedInput: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(255, 140, 178, 0.05)', // Very light pink background when focused
  },
  errorInput: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: SIZES.font,
    paddingVertical: SPACING.s,
  },
  leftIcon: {
    marginRight: SPACING.s,
  },
  rightIcon: {
    marginLeft: SPACING.s,
    padding: SPACING.xs,
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.small,
    marginTop: SPACING.xs,
  },
});

export default Input; 