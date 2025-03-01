import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  SectionList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList, LogEntry } from '../types';
import { COLORS, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { getAllLogEntries } from '../utils/storageUtils';
import Header from '../components/Header';

type HistoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'History'>;

interface SectionData {
  title: string;
  data: LogEntry[];
}

const HistoryScreen = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<SectionData[]>([]);
  
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const allLogs = await getAllLogEntries();
        // Sort logs by date (newest first)
        const sortedLogs = [...allLogs].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setLogs(sortedLogs);
        
        // Group logs by month
        const grouped = sortedLogs.reduce((acc, log) => {
          const date = new Date(log.date);
          const monthYear = date.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          });
          
          if (!acc[monthYear]) {
            acc[monthYear] = [];
          }
          
          acc[monthYear].push(log);
          return acc;
        }, {} as {[key: string]: LogEntry[]});
        
        // Convert to sections for SectionList
        const sectionsArray = Object.entries(grouped).map(([title, data]) => ({
          title,
          data
        }));
        
        setSections(sectionsArray);
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
  
  const handleViewLog = (logId: string) => {
    navigation.navigate('Results', { logId });
  };
  
  const handleEditLog = (logId: string, date: string) => {
    navigation.navigate('LogEntry', { id: logId, date: date });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const formatDirectImpact = (impact: number) => {
    const minutes = Math.abs(impact * 525600);
    
    if (minutes >= 1) {
      return `${impact >= 0 ? '+' : '-'}${Math.min(60, Math.round(minutes))} min`;
    } else {
      const seconds = minutes * 60;
      return `${impact >= 0 ? '+' : '-'}${Math.round(seconds)} sec`;
    }
  };
  
  const formatLongTermImpact = (years: number) => {
    const days = Math.abs(years * 365).toFixed(1);
    return `${years >= 0 ? '+' : '-'}${days} days lifetime`;
  };
  
  const getImpactColor = (impact: number) => {
    return impact >= 0 ? COLORS.success : COLORS.error;
  };
  
  const LogCard = React.memo(({ item }: { item: LogEntry }) => {
    const impactColor = getImpactColor(item.netImpact);
    
    return (
      <View style={styles.logCard}>
        <View style={styles.logHeader}>
          <Text style={styles.logDate}>{formatDate(item.date)}</Text>
          <View style={[
            styles.impactBadge,
            { backgroundColor: `${impactColor}20` }
          ]}>
            <Text style={[styles.impactBadgeText, { color: impactColor }]}>
              {formatDirectImpact(item.netImpact)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.logContent} numberOfLines={2}>
          {item.rawContent}
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.viewResultsButton}
            onPress={() => handleViewLog(item.id)}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="analytics-outline" size={18} color={COLORS.white} />
              <Text style={styles.viewResultsText}>View Impact</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleEditLog(item.id, item.date)}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="create-outline" size={18} color={COLORS.white} />
              <Text style={styles.editButtonText}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  });
  
  const renderSectionHeader = ({ section }: { section: SectionData }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading your history...</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Longevity Log</Text>
        <Text style={styles.headerSubtitle}>Your History Timeline</Text>
      </View>
      
      {logs.length > 0 ? (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LogCard item={item} />}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={true}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>
            No log entries yet. Start tracking your lifestyle to see your history.
          </Text>
          <TouchableOpacity 
            style={styles.createLogButton}
            onPress={() => navigation.navigate('LogEntry', {})}
          >
            <Text style={styles.createLogButtonText}>Create Log Entry</Text>
          </TouchableOpacity>
        </View>
      )}
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
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginTop: SPACING.m,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
  sectionHeader: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  logCard: {
    margin: SPACING.m,
    marginBottom: SPACING.s,
    padding: SPACING.m,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    ...SHADOWS.medium,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  logDate: {
    fontSize: SIZES.font,
    fontWeight: '500',
    color: COLORS.text,
  },
  impactBadge: {
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
    borderRadius: SIZES.radius,
    minWidth: 80,
    alignItems: 'center',
  },
  impactBadgeText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  logContent: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginBottom: SPACING.m,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewResultsButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginRight: SPACING.xs,
  },
  editButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginLeft: SPACING.xs,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewResultsText: {
    fontSize: SIZES.font,
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  editButtonText: {
    fontSize: SIZES.font,
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.m,
    marginBottom: SPACING.l,
  },
  createLogButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.l,
    borderRadius: SIZES.radius,
    ...SHADOWS.small,
  },
  createLogButtonText: {
    fontSize: SIZES.font,
    color: COLORS.white,
    fontWeight: 'bold',
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
});

export default HistoryScreen; 