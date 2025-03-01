import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { RootStackParamList, LogEntry, LifestyleItem } from '../types';
import ScreenContainer from '../components/ScreenContainer';
import Header from '../components/Header';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select';
import CustomSlider from '../components/Slider';
import Loading from '../components/Loading';
import Divider from '../components/Divider';
import { analyzeLogEntryDev } from '../api/llmService';
import { saveLogEntry, getLogEntry, getAllLogEntries } from '../utils/storageUtils';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type LogEntryRouteProp = RouteProp<RootStackParamList, 'LogEntry'>;

// Mock data - in a real app, this would come from a service or API
const MOCK_LOG_ENTRY: LogEntry = {
  id: '1',
  date: new Date().toISOString(),
  rawContent: 'Today was a productive day. I went for a 30-minute run in the morning, ate healthy meals, and managed my stress well with meditation.',
  items: [
    {
      id: 'item1',
      description: 'Morning run for 30 minutes',
      category: 'exercise',
      impact: 0.05, // positive impact in years
      confidence: 0.8,
      interactions: [],
      recommendations: ['Increase duration to 45 minutes for more benefits']
    },
    {
      id: 'item2',
      description: 'Healthy meals with vegetables and protein',
      category: 'diet',
      impact: 0.03, // positive impact in years
      confidence: 0.7,
      interactions: [],
      recommendations: ['Add more variety of vegetables']
    },
    {
      id: 'item3',
      description: 'Meditation for stress management',
      category: 'stress',
      impact: 0.02, // positive impact in years
      confidence: 0.6,
      interactions: [],
      recommendations: ['Try to meditate daily for better results']
    }
  ],
  netImpact: 0.1, // Overall years gained
  createdAt: new Date().toISOString()
};

const LogEntryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<LogEntryRouteProp>();
  const { id, date } = route.params || {};

  const [logEntry, setLogEntry] = useState<LogEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(true); // Always start in editing mode
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  
  // Form state
  const [logContent, setLogContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (id) {
      fetchLogEntry();
    } else {
      // Creating a new entry
      setIsLoading(false);
    }
  }, [id]);

  // Add keyboard listeners to detect when keyboard is shown/hidden
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const fetchLogEntry = async () => {
    try {
      // In a real app, this would be an API call
      setIsLoading(true);
      
      if (id) {
        const entry = await getLogEntry(id);
        if (entry) {
          setLogEntry(entry);
          setLogContent(entry.rawContent);
        } else {
          // Fallback to mock data if entry not found
          setLogEntry(MOCK_LOG_ENTRY);
          setLogContent(MOCK_LOG_ENTRY.rawContent);
        }
      } else {
        // Use mock data for new entries
        setLogEntry(MOCK_LOG_ENTRY);
        setLogContent(MOCK_LOG_ENTRY.rawContent);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching log entry:', error);
      setIsLoading(false);
      Alert.alert('Error', 'Failed to load log entry');
    }
  };

  const handleAnalyze = async () => {
    if (logContent.trim().length < 50) {
      Alert.alert(
        'Entry Too Short', 
        'Please provide more details about your day for an accurate analysis. Include information about your sleep, diet, exercise, and other daily activities.'
      );
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // This will send the log to the LLM for analysis
      const analyzedLog = await analyzeLogEntryDev(logContent);
      
      // If we have a date parameter, use it instead of the current date
      if (date) {
        analyzedLog.date = date;
      }
      
      // Save the analyzed log
      const savedLogId = await saveLogEntry(analyzedLog);
      
      // Show brief success message
      Alert.alert(
        'Analysis Complete',
        `Your daily log has been analyzed! Let's see how it impacts your lifespan.`,
        [
          { text: 'Show Me', onPress: () => navigation.navigate('Results', { logId: savedLogId }) }
        ]
      );
    } catch (error) {
      console.error('Analysis error:', error);
      Alert.alert(
        'Analysis Failed',
        'We could not analyze your log entry. Please try again later.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formattedDate = date 
    ? new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit'
      })
    : new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit'
      });

  // Check if a log already exists for today
  useEffect(() => {
    const checkExistingLog = async () => {
      if (!id) {
        try {
          const today = new Date().toISOString().split('T')[0];
          const allLogs = await getAllLogEntries();
          const todayLog = allLogs.find(log => log.date.split('T')[0] === today);
          
          if (todayLog) {
            // A log already exists for today, navigate to it
            Alert.alert(
              'Log Already Exists',
              'You already have a log entry for today. You can edit your existing entry.',
              [
                { text: 'View Entry', onPress: () => navigation.navigate('LogEntry', { id: todayLog.id }) }
              ]
            );
          }
        } catch (error) {
          console.error('Error checking existing log:', error);
        }
      }
    };
    
    checkExistingLog();
  }, [id, navigation]);

  const renderReadOnlyView = () => {
    if (!logEntry) return null;
    
    // Function to format direct impact in minutes/seconds
    const formatDirectImpact = (impact: number) => {
      // Convert years to minutes (1 year = 525,600 minutes)
      const minutes = Math.abs(impact * 525600);
      
      if (minutes >= 1) {
        return `${impact >= 0 ? '+' : '-'}${Math.min(60, Math.round(minutes))} min`;
      } else {
        // Convert to seconds if less than a minute
        const seconds = minutes * 60;
        return `${impact >= 0 ? '+' : '-'}${Math.round(seconds)} sec`;
      }
    };
    
    // Function to format long-term impact in years or months
    const formatLongTermImpact = (impact: number) => {
      // Calculate the long-term impact (multiplying by 365 days * 30 years)
      const longTermMultiplier = 365 * 30;
      const longTermImpact = impact * longTermMultiplier;
      
      const isPositive = longTermImpact >= 0;
      const absImpact = Math.abs(longTermImpact);
      
      if (absImpact >= 1) {
        // If impact is at least 1 year, show in years
        return `${isPositive ? '+' : '-'}${absImpact.toFixed(1)} years`;
      } else {
        // If impact is less than 1 year, show in months
        const months = absImpact * 12;
        return `${isPositive ? '+' : '-'}${months.toFixed(1)} months`;
      }
    };
    
    return (
      <ScrollView style={styles.scrollView}>
        <Card style={styles.mainCard}>
          <Text style={styles.sectionTitle}>Journal Entry</Text>
          <Text style={styles.dateText}>Date: {formattedDate}</Text>
          <Text style={styles.logContent}>{logEntry.rawContent}</Text>
        </Card>
        
        <Card style={styles.mainCard}>
          <Text style={styles.sectionTitle}>Overall Impact</Text>
          <View style={styles.factorRow}>
            <Text style={styles.factorLabel}>Direct Impact:</Text>
            <Text style={[
              styles.factorValue,
              { color: logEntry.netImpact >= 0 ? COLORS.success : COLORS.error }
            ]}>
              {formatDirectImpact(logEntry.netImpact)}
            </Text>
          </View>
          <View style={styles.factorRow}>
            <Text style={styles.factorLabel}>Long-term Impact:</Text>
            <Text style={[
              styles.factorValue,
              { color: logEntry.netImpact >= 0 ? COLORS.success : COLORS.error }
            ]}>
              {formatLongTermImpact(logEntry.netImpact)}
            </Text>
          </View>
          <View style={styles.impactExplanationContainer}>
            <Text style={styles.impactExplanation}>
              Direct impact shows the immediate effect on your lifespan. Long-term impact shows what would happen if you lived this day each day for the rest of your life.
            </Text>
          </View>
        </Card>
        
        <Button
          title="Edit Log Entry"
          onPress={() => setIsEditing(true)}
          style={styles.button}
        />
      </ScrollView>
    );
  };

  const renderEditView = () => {
    return (
      <ScrollView style={styles.scrollView}>
        <Card style={styles.mainCard}>
          <Text style={styles.sectionTitle}>Your Health Journal</Text>
          <Text style={styles.instructions}>
            Describe your health-related activities for this day. Include details about:
          </Text>
          <View style={styles.instructionsList}>
            <Text style={styles.instructionItem}>• Sleep (duration and quality)</Text>
            <Text style={styles.instructionItem}>• Diet (meals, snacks, water intake)</Text>
            <Text style={styles.instructionItem}>• Exercise (type, duration, intensity)</Text>
            <Text style={styles.instructionItem}>• Stress management (meditation, relaxation)</Text>
            <Text style={styles.instructionItem}>• Social interactions</Text>
            <Text style={styles.instructionItem}>• Any health-related habits or changes</Text>
          </View>
          <TextInput
            style={styles.logInput}
            multiline
            placeholder="Today I woke up at..."
            placeholderTextColor={COLORS.textSecondary}
            value={logContent}
            onChangeText={setLogContent}
            editable={!isAnalyzing}
          />
        </Card>
        
        <View style={styles.buttonRow}>
          <Button
            title={isAnalyzing ? "Analyzing..." : "Analyze My Day"}
            onPress={handleAnalyze}
            style={styles.analyzeButton}
            disabled={isAnalyzing || logContent.trim().length < 50}
          />
          
          {isKeyboardVisible && (
            <TouchableOpacity 
              style={styles.dismissKeyboardButton}
              onPress={() => Keyboard.dismiss()}
            >
              <Ionicons name="arrow-down" size={24} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
        
        {isAnalyzing && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Analyzing your day...</Text>
          </View>
        )}
      </ScrollView>
    );
  };

  if (isLoading) {
    return <Loading text="Loading your log entry..." fullScreen />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Longevity Log</Text>
          <Text style={styles.headerSubtitle}>Your Health Journal</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        
        {isEditing ? renderEditView() : renderReadOnlyView()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: SPACING.m,
  },
  card: {
    marginBottom: SPACING.m,
  },
  mainCard: {
    marginBottom: SPACING.m,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    ...SHADOWS.medium,
  },
  itemCard: {
    marginBottom: SPACING.m,
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    ...SHADOWS.small,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginBottom: SPACING.s,
    color: COLORS.text,
  },
  itemTitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    marginBottom: SPACING.s,
    color: COLORS.textSecondary,
  },
  journalContent: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 24,
  },
  factorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  factorLabel: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    flex: 1,
  },
  factorValue: {
    fontSize: SIZES.font,
    color: COLORS.text,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  notesContainer: {
    marginTop: SPACING.s,
    backgroundColor: 'rgba(255, 140, 178, 0.05)',
    padding: SPACING.s,
    borderRadius: SIZES.radius,
  },
  notesLabel: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  notesContent: {
    fontSize: SIZES.font,
    color: COLORS.text,
    lineHeight: 22,
  },
  impactExplanationContainer: {
    marginTop: SPACING.s,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: SPACING.m,
    borderRadius: SIZES.radius,
  },
  impactExplanation: {
    fontSize: SIZES.font,
    color: COLORS.text,
    lineHeight: 22,
  },
  button: {
    marginVertical: SPACING.m,
  },
  logInput: {
    height: 200,
    textAlignVertical: 'top',
    padding: SPACING.s,
    fontSize: SIZES.medium,
    color: COLORS.text,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: SIZES.radius * 1.2,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.l,
  },
  loadingText: {
    marginTop: SPACING.s,
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
  },
  dateContainer: {
    minWidth: 80,
  },
  dateText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'right',
  },
  instructions: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.s,
    lineHeight: 22,
  },
  instructionsList: {
    marginBottom: SPACING.m,
  },
  instructionItem: {
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    lineHeight: 20,
  },
  header: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.l,
  },
  headerTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.m,
  },
  analyzeButton: {
    flex: 1,
  },
  dismissKeyboardButton: {
    backgroundColor: COLORS.secondary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.s,
    ...SHADOWS.small,
  },
  logContent: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 22,
    marginTop: SPACING.s,
  },
});

export default LogEntryScreen; 