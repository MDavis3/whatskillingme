import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Platform,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList, LogEntry } from '../types';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { getAllLogEntries } from '../utils/storageUtils';

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

// Mock milestone data - in a real app, this would be personalized
interface Milestone {
  id: string;
  title: string;
  description: string;
  baseValue: number | string;
  currentValue: number | string;
  icon: string;
  positive: boolean;
}

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Base life expectancy in years
  const baseLifeExpectancy = 82.3;
  
  // Mock milestones - these would be personalized based on user input
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Retirement',
      description: 'Age you can comfortably retire',
      baseValue: 'Age 65',
      currentValue: 'Age 62',
      icon: 'umbrella-outline',
      positive: false
    },
    {
      id: '2',
      title: 'Meeting Great-Grandchildren',
      description: 'Probability of meeting your great-grandchildren',
      baseValue: '50%',
      currentValue: '78%',
      icon: 'people-outline',
      positive: true
    },
    {
      id: '3',
      title: 'Active Lifestyle into 80s',
      description: 'Probability of maintaining physical independence',
      baseValue: '35%',
      currentValue: '63%',
      icon: 'bicycle-outline',
      positive: true
    }
  ]);
  
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const allLogs = await getAllLogEntries();
        
        // Sort logs by date (newest first)
        const sortedLogs = [...allLogs].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setLogs(sortedLogs);
        
        // Update milestone probabilities based on log entries
        // This is a simplified mock implementation
        if (sortedLogs.length > 0) {
          const netImpact = calculateWeeklyImpact(sortedLogs);
          
          // In a real app, this would use more sophisticated calculations
          // based on specific lifestyle factors and their impact on different milestones
          updateMilestonesBasedOnImpact(netImpact);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLogs();
    
    // Set up a listener for when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', fetchLogs);
    
    // Clean up the listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);
  
  const updateMilestonesBasedOnImpact = (netImpact: number) => {
    // This is a simplified mock implementation
    // In a real app, this would use more sophisticated calculations
    setMilestones(prev => prev.map(milestone => {
      switch (milestone.id) {
        case '1': // Retirement
          const newRetirementAge = netImpact > 0 
            ? 'Age 62' // Better health allows earlier retirement
            : 'Age 68'; // Worse health requires working longer
          return {
            ...milestone,
            currentValue: newRetirementAge,
            positive: newRetirementAge === 'Age 62'
          };
        case '2': // Meeting Great-Grandchildren
          const baseProb = 50;
          // Scale down the impact for more reasonable changes
          const newProb2 = Math.min(95, Math.max(5, Math.round(baseProb + (netImpact * 5000))));
          return {
            ...milestone,
            currentValue: `${newProb2}%`,
            positive: newProb2 > baseProb
          };
        case '3': // Active Lifestyle
          const baseProb3 = 35;
          // Scale down the impact for more reasonable changes
          const newProb3 = Math.min(95, Math.max(5, Math.round(baseProb3 + (netImpact * 5000))));
          return {
            ...milestone,
            currentValue: `${newProb3}%`,
            positive: newProb3 > baseProb3
          };
        default:
          return milestone;
      }
    }));
  };
  
  const handleNewLog = () => {
    navigation.navigate('LogEntry', {});
  };
  
  // Calculate impact from the 7 most recent logs
  const calculateWeeklyImpact = (sortedLogs: LogEntry[]) => {
    if (sortedLogs.length === 0) return 0;
    
    // Get the 7 most recent logs (or fewer if there aren't 7)
    const recentLogs = sortedLogs.slice(0, 7);
    
    // Sum up the net impact of these logs
    return recentLogs.reduce((total, log) => total + log.netImpact, 0);
  };
  
  // Format impact in a more reasonable way
  const formatImpact = (years: number) => {
    // For social activities like spending time with friends, the impact should be small
    // For example, +15 seconds for a single day's activity
    
    // Convert years to minutes (1 year = 525,600 minutes)
    const minutes = Math.abs(years * 525600);
    
    if (minutes >= 1) {
      // If it's at least a minute, show minutes
      return `${years >= 0 ? '+' : '-'}${Math.min(60, Math.round(minutes))} min`;
    } else {
      // If it's less than a minute, show seconds
      const seconds = minutes * 60;
      return `${years >= 0 ? '+' : '-'}${Math.round(seconds)} sec`;
    }
  };
  
  const getImpactColor = (impact: number) => {
    return impact >= 0 ? COLORS.success : COLORS.error;
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading your dashboard...</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Longevity Log</Text>
        <Text style={styles.headerSubtitle}>Your Lifespan Dashboard</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Weekly Lifespan Impact</Text>
          
          {logs.length > 0 ? (
            <>
              <View style={styles.impactContainer}>
                <Text 
                  style={[
                    styles.impactValue, 
                    { color: getImpactColor(calculateWeeklyImpact(logs)) }
                  ]}
                >
                  {formatImpact(calculateWeeklyImpact(logs))}
                </Text>
              </View>
              
              <Text style={styles.summaryDescription}>
                Based on your 7 most recent log entries, this is the cumulative impact on your lifespan.
              </Text>
            </>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Ionicons name="document-text-outline" size={48} color={COLORS.textSecondary} />
              <Text style={styles.emptyStateText}>
                No logs yet. Create your first log to see your lifespan impact.
              </Text>
            </View>
          )}
        </View>
        
        {logs.length > 0 ? (
          <View style={styles.milestonesContainer}>
            <Text style={styles.milestonesTitle}>Your Life Milestones</Text>
            <Text style={styles.milestonesSubtitle}>How your habits affect important life events</Text>
            
            {milestones.map((milestone) => (
              <View key={milestone.id} style={styles.milestoneCard}>
                <View style={styles.milestoneIconContainer}>
                  <Ionicons name={milestone.icon as any} size={28} color={COLORS.white} />
                </View>
                
                <View style={styles.milestoneContent}>
                  <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                  <Text style={styles.milestoneDescription}>{milestone.description}</Text>
                  
                  <View style={styles.milestoneValues}>
                    <View style={styles.milestoneBaseValue}>
                      <Text style={styles.milestoneValueLabel}>Baseline</Text>
                      <Text style={styles.milestoneValueText}>{milestone.baseValue}</Text>
                    </View>
                    
                    <View style={styles.milestoneSeparator}>
                      <Ionicons 
                        name={milestone.positive ? "arrow-forward" : "arrow-back"} 
                        size={20} 
                        color={milestone.positive ? COLORS.success : COLORS.error} 
                      />
                    </View>
                    
                    <View style={styles.milestoneCurrentValue}>
                      <Text style={styles.milestoneValueLabel}>Current Projection</Text>
                      <Text 
                        style={[
                          styles.milestoneValueText, 
                          { color: milestone.positive ? COLORS.success : COLORS.error }
                        ]}
                      >
                        {milestone.currentValue}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
            
            <Text style={styles.milestonesDescription}>
              These milestones show how your current lifestyle choices are affecting your probability of achieving important life events.
            </Text>
          </View>
        ) : (
          <View style={styles.emptyLogsContainer}>
            <Text style={styles.emptyLogsText}>
              Start by creating your first log entry to track your lifestyle impact.
            </Text>
            <TouchableOpacity 
              style={styles.createFirstLogButton}
              onPress={handleNewLog}
            >
              <Text style={styles.createFirstLogButtonText}>Create First Log</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginTop: SIZES.base * 2,
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
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING.m,
  },
  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.medium,
  },
  summaryTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  impactContainer: {
    alignItems: 'center',
    marginVertical: SPACING.m,
  },
  impactValue: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
  },
  impactLabel: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  summaryDescription: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
    padding: SPACING.m,
  },
  emptyStateText: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.m,
  },
  milestonesContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.medium,
  },
  milestonesTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  milestonesSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.m,
    textAlign: 'center',
  },
  milestoneCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  milestoneIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  milestoneDescription: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.s,
  },
  milestoneValues: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  milestoneBaseValue: {
    flex: 1,
  },
  milestoneSeparator: {
    paddingHorizontal: SPACING.s,
  },
  milestoneCurrentValue: {
    flex: 1,
    alignItems: 'flex-end',
  },
  milestoneValueLabel: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  milestoneValueText: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  milestonesDescription: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.m,
  },
  emptyLogsContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.l,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  emptyLogsText: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.m,
  },
  createFirstLogButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  createFirstLogButtonText: {
    fontSize: SIZES.font,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default DashboardScreen; 