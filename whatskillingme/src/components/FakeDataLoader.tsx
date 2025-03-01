import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { saveFakeLogEntries, clearAllLogEntries, generatePositiveLogEntry, generateNegativeLogEntry } from '../utils/fakeDataUtils';
import { saveLogEntry } from '../utils/storageUtils';

interface FakeDataLoaderProps {
  onDataLoaded?: () => void;
}

const FakeDataLoader: React.FC<FakeDataLoaderProps> = ({ onDataLoaded }) => {
  const [loading, setLoading] = useState(false);

  const handleLoadFakeData = async () => {
    try {
      setLoading(true);
      
      // Generate a mix of positive and negative entries
      await saveFakeLogEntries(5);
      
      // Add one very positive entry
      const positiveEntry = generatePositiveLogEntry();
      await saveLogEntry(positiveEntry);
      
      // Add one very negative entry
      const negativeEntry = generateNegativeLogEntry();
      await saveLogEntry(negativeEntry);
      
      Alert.alert(
        "Success",
        "Fake data has been loaded successfully!",
        [{ text: "OK" }]
      );
      
      if (onDataLoaded) {
        onDataLoaded();
      }
    } catch (error) {
      console.error('Error loading fake data:', error);
      Alert.alert(
        "Error",
        "Failed to load fake data. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClearData = async () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to clear all log entries? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await clearAllLogEntries();
              
              Alert.alert(
                "Success",
                "All log entries have been cleared.",
                [{ text: "OK" }]
              );
              
              if (onDataLoaded) {
                onDataLoaded();
              }
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert(
                "Error",
                "Failed to clear data. Please try again.",
                [{ text: "OK" }]
              );
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Data Controls</Text>
      <Text style={styles.subtitle}>For development purposes only</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.loadButton]}
          onPress={handleLoadFakeData}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Load Fake Data</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.clearButton]}
          onPress={handleClearData}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Clear All Data</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SPACING.m,
    margin: SPACING.m,
    ...SHADOWS.medium,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.m,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  loadButton: {
    backgroundColor: COLORS.secondary,
    marginRight: SPACING.xs,
  },
  clearButton: {
    backgroundColor: COLORS.error,
    marginLeft: SPACING.xs,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.font,
    fontWeight: 'bold',
  },
});

export default FakeDataLoader; 