import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding4'>;

// Predefined health conditions for selection
const HEALTH_CONDITIONS = [
  'High Blood Pressure',
  'Diabetes',
  'Heart Disease',
  'Asthma',
  'Obesity',
  'Anxiety/Depression',
  'Sleep Apnea',
  'Arthritis',
  'None of the above'
];

const Onboarding4Screen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [otherCondition, setOtherCondition] = useState('');

  const handleNext = () => {
    // In a real app, we would store this information
    navigation.navigate('Onboarding5');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const toggleCondition = (condition: string) => {
    if (condition === 'None of the above') {
      // If "None of the above" is selected, clear all other selections
      setSelectedConditions(['None of the above']);
      return;
    }

    // If any other condition is selected, remove "None of the above" if it's selected
    let newSelectedConditions = [...selectedConditions];
    
    if (newSelectedConditions.includes('None of the above')) {
      newSelectedConditions = newSelectedConditions.filter(c => c !== 'None of the above');
    }

    // Toggle the selected condition
    if (newSelectedConditions.includes(condition)) {
      newSelectedConditions = newSelectedConditions.filter(c => c !== condition);
    } else {
      newSelectedConditions.push(condition);
    }

    setSelectedConditions(newSelectedConditions);
  };

  const isConditionSelected = (condition: string) => {
    return selectedConditions.includes(condition);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressIndicator, { width: '80%' }]} />
            </View>
            <Text style={styles.progressText}>4 of 5</Text>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.title}>Health Conditions</Text>
            <Text style={styles.subtitle}>Select any conditions you currently have or are managing</Text>
          </View>

          <View style={styles.conditionsContainer}>
            {HEALTH_CONDITIONS.map((condition) => (
              <TouchableOpacity
                key={condition}
                style={[
                  styles.conditionButton,
                  isConditionSelected(condition) && styles.conditionButtonSelected
                ]}
                onPress={() => toggleCondition(condition)}
              >
                <Text 
                  style={[
                    styles.conditionButtonText,
                    isConditionSelected(condition) && styles.conditionButtonTextSelected
                  ]}
                >
                  {condition}
                </Text>
                {isConditionSelected(condition) && (
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.white} />
                )}
              </TouchableOpacity>
            ))}

            <View style={styles.otherContainer}>
              <Text style={styles.otherLabel}>Other condition (optional):</Text>
              <TextInput
                style={styles.otherInput}
                placeholder="Type any other condition here"
                value={otherCondition}
                onChangeText={setOtherCondition}
                placeholderTextColor={COLORS.textLight}
              />
            </View>

            <View style={styles.infoContainer}>
              <Ionicons name="information-circle-outline" size={20} color={COLORS.secondary} />
              <Text style={styles.infoText}>
                This information helps us provide more accurate lifespan projections and personalized recommendations.
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color={COLORS.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.m,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.l,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginRight: SPACING.s,
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    width: 40,
    textAlign: 'right',
  },
  headerContainer: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
  },
  conditionsContainer: {
    marginBottom: SPACING.xl,
  },
  conditionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginBottom: SPACING.s,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  conditionButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  conditionButtonText: {
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  conditionButtonTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  otherContainer: {
    marginTop: SPACING.m,
    marginBottom: SPACING.m,
  },
  otherLabel: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  otherInput: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    fontSize: SIZES.font,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginTop: SPACING.m,
    ...SHADOWS.small,
  },
  infoText: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginLeft: SPACING.s,
  },
  footer: {
    padding: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: SPACING.m,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: SPACING.m,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: SIZES.font,
    fontWeight: 'bold',
    marginRight: SPACING.s,
  },
});

export default Onboarding4Screen; 