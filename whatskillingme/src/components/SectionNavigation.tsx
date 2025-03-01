import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { SPACING } from '../constants/theme';
import Button from './Button';

interface SectionNavigationProps {
  onNext?: () => void;
  onPrevious?: () => void;
  onSubmit?: () => void;
  isFirstSection?: boolean;
  isLastSection?: boolean;
  isSubmitting?: boolean;
  containerStyle?: ViewStyle;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({
  onNext,
  onPrevious,
  onSubmit,
  isFirstSection = false,
  isLastSection = false,
  isSubmitting = false,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {!isFirstSection && onPrevious && (
        <Button
          title="Previous"
          onPress={onPrevious}
          variant="outline"
          style={styles.button}
        />
      )}
      
      <View style={styles.spacer} />
      
      {isLastSection && onSubmit ? (
        <Button
          title="Submit"
          onPress={onSubmit}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.button}
        />
      ) : onNext ? (
        <Button
          title="Next"
          onPress={onNext}
          style={styles.button}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.l,
    marginBottom: SPACING.m,
  },
  button: {
    minWidth: 100,
  },
  spacer: {
    flex: 1,
  },
});

export default SectionNavigation; 