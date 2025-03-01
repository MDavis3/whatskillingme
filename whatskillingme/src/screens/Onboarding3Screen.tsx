import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding3'>;

const Onboarding3Screen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => {
    // In a real app, we would validate and store this information
    navigation.navigate('Onboarding4');
  };

  const handleBack = () => {
    navigation.goBack();
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
              <View style={[styles.progressIndicator, { width: '60%' }]} />
            </View>
            <Text style={styles.progressText}>3 of 5</Text>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.title}>Tell Us About Yourself</Text>
            <Text style={styles.subtitle}>We'll personalize your experience based on your information</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                placeholderTextColor={COLORS.textLight}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your age"
                value={age}
                onChangeText={setAge}
                keyboardType="number-pad"
                placeholderTextColor={COLORS.textLight}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={COLORS.textLight}
              />
            </View>

            <View style={styles.privacyContainer}>
              <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.secondary} />
              <Text style={styles.privacyText}>
                Your information is private and secure. We use it only to personalize your experience.
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color={COLORS.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.nextButton,
              (!name || !age) && styles.nextButtonDisabled
            ]} 
            onPress={handleNext}
            disabled={!name || !age}
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
  formContainer: {
    marginBottom: SPACING.xl,
  },
  inputContainer: {
    marginBottom: SPACING.l,
  },
  inputLabel: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    fontSize: SIZES.font,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginTop: SPACING.m,
    ...SHADOWS.small,
  },
  privacyText: {
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
  nextButtonDisabled: {
    backgroundColor: COLORS.textLight,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: SIZES.font,
    fontWeight: 'bold',
    marginRight: SPACING.s,
  },
});

export default Onboarding3Screen; 