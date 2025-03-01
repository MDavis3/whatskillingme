import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Question } from '../types';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';
import Input from './Input';
import Select from './Select';
import CustomSlider from './Slider';

interface QuestionRendererProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  containerStyle?: ViewStyle;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  value,
  onChange,
  error,
  containerStyle,
}) => {
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <Input
            label={question.text}
            value={value || ''}
            onChangeText={onChange}
            error={error}
          />
        );
        
      case 'number':
        return (
          <Input
            label={question.text}
            value={value?.toString() || ''}
            onChangeText={(text) => {
              const numValue = parseFloat(text);
              if (!isNaN(numValue)) {
                onChange(numValue);
              } else if (text === '') {
                onChange(undefined);
              }
            }}
            keyboardType="numeric"
            error={error}
          />
        );
        
      case 'select':
        return (
          <Select
            label={question.text}
            options={question.options || []}
            value={value}
            onChange={onChange}
            error={error}
          />
        );
        
      case 'multiselect':
        // Multiselect implementation would go here
        // For now, we'll just use the Select component
        return (
          <Select
            label={question.text}
            options={question.options || []}
            value={value}
            onChange={onChange}
            error={error}
          />
        );
        
      case 'slider':
        return (
          <CustomSlider
            label={question.text}
            value={value !== undefined ? value : (question.min || 0)}
            onValueChange={onChange}
            minimumValue={question.min || 0}
            maximumValue={question.max || 100}
            step={question.step || 1}
            error={error}
          />
        );
        
      default:
        return (
          <Text style={styles.unsupportedText}>
            Unsupported question type: {question.type}
          </Text>
        );
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {renderQuestionInput()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
  },
  unsupportedText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.error,
    marginVertical: SPACING.s,
  },
});

export default QuestionRenderer; 