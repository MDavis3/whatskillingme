import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, UserMilestone } from '../types';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding5'>;

// Predefined milestones for selection
const PREDEFINED_MILESTONES: UserMilestone[] = [
  {
    id: '1',
    title: 'Retirement',
    description: 'Age you can comfortably retire',
    targetAge: 65,
    baselineProbability: 80,
    currentProbability: 80,
    isCustom: false
  },
  {
    id: '2',
    title: 'Meeting Great-Grandchildren',
    description: 'Probability of meeting your great-grandchildren',
    targetAge: 75,
    baselineProbability: 50,
    currentProbability: 50,
    isCustom: false
  },
  {
    id: '3',
    title: 'Active Lifestyle into 80s',
    description: 'Probability of maintaining physical independence',
    targetAge: 80,
    baselineProbability: 35,
    currentProbability: 35,
    isCustom: false
  },
  {
    id: '4',
    title: 'Traveling the World',
    description: 'Having the health and means to travel extensively',
    targetAge: 70,
    baselineProbability: 60,
    currentProbability: 60,
    isCustom: false
  },
  {
    id: '5',
    title: 'Learning a New Skill',
    description: 'Having the cognitive ability to master new skills',
    targetAge: 75,
    baselineProbability: 55,
    currentProbability: 55,
    isCustom: false
  }
];

const Onboarding5Screen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedMilestones, setSelectedMilestones] = useState<UserMilestone[]>([]);
  const [customMilestone, setCustomMilestone] = useState('');

  const handleNext = () => {
    // In a real app, we would store this information
    // For now, we'll just navigate to the main app
    navigation.navigate('Main');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const toggleMilestone = (milestone: UserMilestone) => {
    if (selectedMilestones.some(m => m.id === milestone.id)) {
      setSelectedMilestones(selectedMilestones.filter(m => m.id !== milestone.id));
    } else {
      setSelectedMilestones([...selectedMilestones, milestone]);
    }
  };

  const isMilestoneSelected = (id: string) => {
    return selectedMilestones.some(m => m.id === id);
  };

  const addCustomMilestone = () => {
    if (!customMilestone.trim()) {
      Alert.alert('Please enter a milestone');
      return;
    }

    const newMilestone: UserMilestone = {
      id: `custom-${Date.now()}`,
      title: customMilestone,
      description: 'Custom milestone',
      targetAge: 70, // Default target age
      baselineProbability: 50, // Default probability
      currentProbability: 50,
      isCustom: true
    };

    setSelectedMilestones([...selectedMilestones, newMilestone]);
    setCustomMilestone('');
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
              <View style={[styles.progressIndicator, { width: '100%' }]} />
            </View>
            <Text style={styles.progressText}>5 of 5</Text>
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.title}>Life Milestones</Text>
            <Text style={styles.subtitle}>Select important milestones you want to achieve in your life</Text>
          </View>

          <View style={styles.milestonesContainer}>
            <Text style={styles.sectionTitle}>Choose from common milestones:</Text>
            
            {PREDEFINED_MILESTONES.map((milestone) => (
              <TouchableOpacity
                key={milestone.id}
                style={[
                  styles.milestoneButton,
                  isMilestoneSelected(milestone.id) && styles.milestoneButtonSelected
                ]}
                onPress={() => toggleMilestone(milestone)}
              >
                <View style={styles.milestoneInfo}>
                  <Text 
                    style={[
                      styles.milestoneTitle,
                      isMilestoneSelected(milestone.id) && styles.milestoneTitleSelected
                    ]}
                  >
                    {milestone.title}
                  </Text>
                  <Text 
                    style={[
                      styles.milestoneDescription,
                      isMilestoneSelected(milestone.id) && styles.milestoneDescriptionSelected
                    ]}
                  >
                    {milestone.description} (Age {milestone.targetAge})
                  </Text>
                </View>
                
                {isMilestoneSelected(milestone.id) ? (
                  <Ionicons name="checkmark-circle" size={24} color={COLORS.white} />
                ) : (
                  <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}

            <View style={styles.customContainer}>
              <Text style={styles.sectionTitle}>Add your own milestone:</Text>
              
              <View style={styles.customInputContainer}>
                <TextInput
                  style={styles.customInput}
                  placeholder="Enter a personal milestone"
                  value={customMilestone}
                  onChangeText={setCustomMilestone}
                  placeholderTextColor={COLORS.textLight}
                />
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={addCustomMilestone}
                >
                  <Ionicons name="add" size={24} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>

            {selectedMilestones.filter(m => m.isCustom).length > 0 && (
              <View style={styles.selectedCustomContainer}>
                <Text style={styles.sectionTitle}>Your custom milestones:</Text>
                
                {selectedMilestones.filter(m => m.isCustom).map((milestone) => (
                  <View key={milestone.id} style={styles.customMilestoneItem}>
                    <Text style={styles.customMilestoneText}>{milestone.title}</Text>
                    <TouchableOpacity
                      onPress={() => toggleMilestone(milestone)}
                    >
                      <Ionicons name="close-circle" size={24} color={COLORS.error} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.infoContainer}>
              <Ionicons name="information-circle-outline" size={20} color={COLORS.secondary} />
              <Text style={styles.infoText}>
                We'll show you how your lifestyle choices affect the probability of achieving these milestones.
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
            <Text style={styles.nextButtonText}>Get Started</Text>
            <Ionicons name="checkmark" size={20} color={COLORS.white} />
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
  milestonesContainer: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.m,
    marginTop: SPACING.m,
  },
  milestoneButton: {
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
  milestoneButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  milestoneTitleSelected: {
    color: COLORS.white,
  },
  milestoneDescription: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  milestoneDescriptionSelected: {
    color: COLORS.white,
  },
  customContainer: {
    marginTop: SPACING.m,
  },
  customInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customInput: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    fontSize: SIZES.font,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.s,
    ...SHADOWS.small,
  },
  addButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  selectedCustomContainer: {
    marginTop: SPACING.m,
  },
  customMilestoneItem: {
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
  customMilestoneText: {
    fontSize: SIZES.font,
    color: COLORS.text,
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginTop: SPACING.l,
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

export default Onboarding5Screen; 