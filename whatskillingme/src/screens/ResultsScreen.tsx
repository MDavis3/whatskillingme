import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Share,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList, LogEntry, LifestyleItem } from '../types';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { getLogEntry } from '../utils/storageUtils';
import Header from '../components/Header';
import Card from '../components/Card';

type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;
type ResultsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Function to calculate net impact from lifestyle items
const calculateNetImpact = (items: LifestyleItem[]): number => {
  return items.reduce((total, item) => total + item.impact, 0);
};

// New function to format direct impact in minutes/seconds
const formatDirectImpact = (impact: number) => {
  // Convert years to minutes (1 year = 525,600 minutes)
  const minutes = Math.abs(impact * 525600);
  
  if (minutes >= 1) {
    return {
      text: `${impact >= 0 ? '+' : '-'}${Math.min(60, Math.round(minutes))} min`,
      color: impact >= 0 ? COLORS.success : COLORS.error
    };
  } else {
    // Convert to seconds if less than a minute
    const seconds = minutes * 60;
    return {
      text: `${impact >= 0 ? '+' : '-'}${Math.round(seconds)} sec`,
      color: impact >= 0 ? COLORS.success : COLORS.error
    };
  }
};

// Updated function to format long-term impact
const formatLifespanImpact = (impact: number) => {
  // For social activities and other small daily impacts, calculate the long-term effect
  // if the behavior continued daily for decades
  
  // Calculate the long-term impact (multiplying by 365 days * 30 years)
  const longTermMultiplier = 365 * 30;
  const longTermImpact = impact * longTermMultiplier;
  
  const isPositive = longTermImpact >= 0;
  const absImpact = Math.abs(longTermImpact);
  
  if (absImpact >= 1) {
    // If impact is at least 1 year, show in years
    return {
      text: `${isPositive ? '+' : '-'}${absImpact.toFixed(1)} years lifetime`,
      color: isPositive ? COLORS.success : COLORS.error
    };
  } else {
    // If impact is less than 1 year, show in months
    const months = absImpact * 12;
    return {
      text: `${isPositive ? '+' : '-'}${months.toFixed(1)} months lifetime`,
      color: isPositive ? COLORS.success : COLORS.error
    };
  }
};

const ResultsScreen = () => {
  const route = useRoute<ResultsScreenRouteProp>();
  const navigation = useNavigation<ResultsScreenNavigationProp>();
  const [logEntry, setLogEntry] = useState<LogEntry | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { logId } = route.params;
  
  useEffect(() => {
    const fetchLog = async () => {
      try {
        const log = await getLogEntry(logId);
        setLogEntry(log);
      } catch (error) {
        console.error('Error fetching log:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLog();
  }, [logId]);
  
  const handleShare = async () => {
    if (!logEntry) return;
    
    const netImpact = calculateNetImpact(logEntry.items);
    const daysImpact = Math.abs(netImpact * 365).toFixed(1);
    const impactDirection = netImpact >= 0 ? 'added' : 'reduced';

    const message = `My lifestyle choices today have ${impactDirection} my estimated lifespan by ${daysImpact} days if continued long-term. #WhatsKillingMe`;

    try {
      await Share.share({
        message,
        title: 'My Health Impact Results',
      });
    } catch (error) {
      console.error('Error sharing results:', error);
    }
  };
  
  const navigateToTodaysEntry = () => {
    navigation.navigate('LogEntry', { date: new Date().toISOString() });
  };
  
  const navigateToEditEntry = () => {
    if (logEntry) {
      navigation.navigate('LogEntry', { id: logId, date: logEntry.date });
    }
  };
  
  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Impact Results" showBackButton={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading your results...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (!logEntry) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Impact Results" showBackButton={true} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Could not load log entry.</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const netImpact = calculateNetImpact(logEntry.items);
  const formattedDate = new Date(logEntry.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit'
  });
  const daysImpact = Math.abs(netImpact * 365).toFixed(1);
  const isPositive = netImpact >= 0;
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Impact Results" showBackButton={true} />
      <ScrollView style={styles.scrollView}>
        <Card style={styles.summaryCard}>
          <Text style={styles.dateLabel}>Entry Date: {formattedDate}</Text>
          <Text style={styles.summaryTitle}>Today's Lifespan Impact</Text>
          
          <View style={styles.impactTypesContainer}>
            <View style={styles.impactTypeCard}>
              <Text style={styles.impactTypeTitle}>Direct Impact</Text>
              <Text style={styles.impactTypeDescription}>
                Immediate effect on your lifespan:
              </Text>
              <View style={[styles.impactContainer, { backgroundColor: isPositive ? 'rgba(39, 174, 96, 0.05)' : 'rgba(231, 76, 60, 0.05)' }]}>
                <Text style={[styles.impactValue, { color: isPositive ? COLORS.success : COLORS.error }]}>
                  {formatDirectImpact(netImpact).text}
                </Text>
              </View>
            </View>
            
            <View style={styles.impactTypeCard}>
              <Text style={styles.impactTypeTitle}>Long-term Impact</Text>
              <Text style={styles.impactTypeDescription}>
                If you lived every day like this one:
              </Text>
              <View style={[styles.impactContainer, { backgroundColor: isPositive ? 'rgba(39, 174, 96, 0.05)' : 'rgba(231, 76, 60, 0.05)' }]}>
                <Text style={[styles.impactValue, { color: isPositive ? COLORS.success : COLORS.error }]}>
                  {isPositive ? '+' : '-'}{daysImpact} days
                </Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.impactExplanation}>
            This projection is based on scientific research about how daily habits affect longevity.
          </Text>
        </Card>
        
        <Text style={styles.sectionTitle}>Lifestyle Factors</Text>
        {logEntry.items.map((item, index) => {
          const directImpact = formatDirectImpact(item.impact);
          const longTermImpact = formatLifespanImpact(item.impact);
          
          return (
            <Card key={index} style={styles.factorCard}>
              <View style={styles.factorHeader}>
                <Text style={styles.factorTitle}>{item.category}</Text>
                <Text style={[styles.directImpactBadge, { color: directImpact.color }]}>
                  {directImpact.text}
                </Text>
              </View>
              <Text style={styles.factorDescription}>{item.description}</Text>
              <View style={styles.impactRow}>
                <Text style={styles.impactLabel}>Long-term Impact:</Text>
                <Text style={[styles.impactText, { color: longTermImpact.color }]}>{longTermImpact.text}</Text>
              </View>
              {item.recommendations && item.recommendations.length > 0 && (
                <View style={styles.recommendationContainer}>
                  <Text style={styles.recommendationLabel}>Recommendation:</Text>
                  <Text style={styles.recommendationText}>{item.recommendations[0]}</Text>
                </View>
              )}
            </Card>
          );
        })}
        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={20} color={COLORS.white} />
            <Text style={styles.shareButtonText}>Share Results</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.todayEntryButton} onPress={navigateToEditEntry}>
            <Ionicons name="create-outline" size={20} color={COLORS.white} />
            <Text style={styles.shareButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.bottomSpacing}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
    padding: SIZES.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SIZES.small,
    color: COLORS.text,
    fontSize: SIZES.medium,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.large,
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  summaryCard: {
    marginBottom: SIZES.medium,
    padding: SIZES.medium,
    ...SHADOWS.medium,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  dateLabel: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SIZES.small,
  },
  summaryTitle: {
    fontSize: SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.small,
    textAlign: 'center',
  },
  impactTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.m,
  },
  impactTypeCard: {
    flex: 1,
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radius,
    padding: SPACING.s,
    marginHorizontal: SPACING.xs,
    ...SHADOWS.small,
  },
  impactTypeTitle: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  impactTypeDescription: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  impactContainer: {
    alignItems: 'center',
    marginVertical: SIZES.medium,
    padding: SIZES.medium,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  impactValue: {
    fontSize: SIZES.xxlarge,
    fontWeight: 'bold',
  },
  impactExplanation: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: SIZES.small,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.medium,
    marginBottom: SIZES.small,
  },
  factorCard: {
    marginBottom: SIZES.medium,
    padding: SIZES.medium,
    ...SHADOWS.small,
  },
  factorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  factorTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  factorDescription: {
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  impactLabel: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginRight: SIZES.small,
  },
  impactText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  recommendationContainer: {
    marginTop: SIZES.small,
    padding: SIZES.small,
    backgroundColor: COLORS.cardDark,
    borderRadius: SIZES.radius / 2,
  },
  recommendationLabel: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.small,
  },
  recommendationText: {
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  directImpactBadge: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SIZES.medium,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.small,
    flex: 1,
    marginRight: SIZES.small,
    ...SHADOWS.small,
  },
  todayEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.small,
    flex: 1,
    marginLeft: SIZES.small,
    ...SHADOWS.small,
  },
  shareButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: SIZES.small,
  },
  bottomSpacing: {
    height: SPACING.xl,
  }
});

export default ResultsScreen; 