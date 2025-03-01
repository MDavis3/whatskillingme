import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';
import Button from '../components/Button';
import ScreenContainer from '../components/ScreenContainer';
import Card from '../components/Card';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Questionnaire'>;
type QuestionnaireScreenRouteProp = RouteProp<RootStackParamList, 'Questionnaire'>;

const QuestionnaireScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<QuestionnaireScreenRouteProp>();
  const { sectionId } = route.params;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Sample questions for demonstration
  const questions = [
    {
      id: '1',
      text: 'How many days per week do you exercise?',
      options: ['0-1 days', '2-3 days', '4-5 days', '6-7 days']
    },
    {
      id: '2',
      text: 'How would you rate your stress levels on average?',
      options: ['Very low', 'Low', 'Moderate', 'High', 'Very high']
    },
    {
      id: '3',
      text: 'How many servings of fruits and vegetables do you eat daily?',
      options: ['0-1 servings', '2-3 servings', '4-5 servings', '6+ servings']
    }
  ];
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to results when all questions are answered
      navigation.navigate('Results');
    }
  };
  
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigation.goBack();
    }
  };
  
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Section: {sectionId}</Text>
          <Text style={styles.progress}>Question {currentQuestion + 1} of {questions.length}</Text>
          
          <Card style={styles.questionCard}>
            <Text style={styles.questionText}>{questions[currentQuestion].text}</Text>
            
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                title={option}
                onPress={() => {}}
                style={styles.optionButton}
                textStyle={styles.optionText}
                size="medium"
              />
            ))}
          </Card>
          
          <View style={styles.navigationButtons}>
            <Button 
              title="Back" 
              onPress={handleBack}
              size="medium"
              style={styles.backButton}
            />
            <Button 
              title={currentQuestion === questions.length - 1 ? "Finish" : "Next"} 
              onPress={handleNext}
              size="medium"
              style={styles.nextButton}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: SPACING.m,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
    marginBottom: SPACING.s,
  },
  progress: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginBottom: SPACING.m,
  },
  questionCard: {
    padding: SPACING.m,
    marginBottom: SPACING.l,
  },
  questionText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  optionButton: {
    marginBottom: SPACING.s,
    backgroundColor: COLORS.card,
  },
  optionText: {
    color: COLORS.text,
    fontFamily: FONT.medium,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.m,
  },
  backButton: {
    flex: 1,
    marginRight: SPACING.s,
    backgroundColor: COLORS.card,
  },
  nextButton: {
    flex: 1,
    marginLeft: SPACING.s,
  },
});

export default QuestionnaireScreen; 