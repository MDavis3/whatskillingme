import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogEntry } from '../types';

const LOGS_STORAGE_KEY = '@WhatsKillingMe:logs';

// Save a log entry
export const saveLogEntry = async (logEntry: LogEntry): Promise<string> => {
  try {
    // First get existing logs
    const existingLogsJson = await AsyncStorage.getItem(LOGS_STORAGE_KEY);
    const existingLogs: LogEntry[] = existingLogsJson ? JSON.parse(existingLogsJson) : [];
    
    // Add new log
    const updatedLogs = [logEntry, ...existingLogs];
    
    // Save back to storage
    await AsyncStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs));
    
    return logEntry.id;
  } catch (error) {
    console.error('Error saving log entry:', error);
    throw error;
  }
};

// Get a specific log entry by ID
export const getLogEntry = async (id: string): Promise<LogEntry | null> => {
  try {
    const logsJson = await AsyncStorage.getItem(LOGS_STORAGE_KEY);
    if (!logsJson) return null;
    
    const logs: LogEntry[] = JSON.parse(logsJson);
    return logs.find(log => log.id === id) || null;
  } catch (error) {
    console.error('Error getting log entry:', error);
    return null;
  }
};

// Get all log entries
export const getAllLogEntries = async (): Promise<LogEntry[]> => {
  try {
    const logsJson = await AsyncStorage.getItem(LOGS_STORAGE_KEY);
    if (!logsJson) return [];
    
    return JSON.parse(logsJson);
  } catch (error) {
    console.error('Error getting all log entries:', error);
    return [];
  }
};

// Delete a log entry
export const deleteLogEntry = async (id: string): Promise<boolean> => {
  try {
    const logsJson = await AsyncStorage.getItem(LOGS_STORAGE_KEY);
    if (!logsJson) return false;
    
    const logs: LogEntry[] = JSON.parse(logsJson);
    const updatedLogs = logs.filter(log => log.id !== id);
    
    await AsyncStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs));
    return true;
  } catch (error) {
    console.error('Error deleting log entry:', error);
    return false;
  }
}; 