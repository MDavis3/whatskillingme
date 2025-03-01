import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';

interface SectionHeaderProps {
  title: string;
  description?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  containerStyle,
  titleStyle,
  descriptionStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>
        {title}
      </Text>
      
      {description && (
        <Text style={[styles.description, descriptionStyle]}>
          {description}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.l,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xlarge,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
  },
});

export default SectionHeader; 