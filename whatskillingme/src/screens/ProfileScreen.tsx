import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Alert,
  Platform,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import FakeDataLoader from '../components/FakeDataLoader';

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataCollectionEnabled, setDataCollectionEnabled] = useState(true);
  
  const toggleSwitch = (setting: string, value: boolean) => {
    switch (setting) {
      case 'notifications':
        setNotificationsEnabled(value);
        break;
      case 'dataCollection':
        setDataCollectionEnabled(value);
        break;
    }
  };
  
  const handleDeleteAllData = () => {
    Alert.alert(
      'Delete All Data',
      'Are you sure you want to delete all your data? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // In a real app, you would delete all user data here
            Alert.alert('Data Deleted', 'All your data has been deleted.');
          },
        },
      ]
    );
  };
  
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@whatskillingme.app?subject=Support%20Request');
  };
  
  const handlePrivacyPolicy = () => {
    Linking.openURL('https://www.whatskillingme.app/privacy');
  };
  
  const handleTermsOfService = () => {
    Linking.openURL('https://www.whatskillingme.app/terms');
  };
  
  const renderSettingItem = (
    icon: string, 
    title: string, 
    description: string, 
    toggle?: boolean,
    toggleValue?: boolean,
    onToggle?: (value: boolean) => void,
    onPress?: () => void
  ) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      disabled={toggle || !onPress}
    >
      <View style={styles.settingIconContainer}>
        <Ionicons name={icon as any} size={24} color={COLORS.primary} />
      </View>
      
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      
      {toggle && onToggle && (
        <Switch
          trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
          thumbColor={toggleValue ? COLORS.primary : COLORS.textSecondary}
          ios_backgroundColor={COLORS.border}
          onValueChange={onToggle}
          value={toggleValue}
        />
      )}
      
      {!toggle && onPress && (
        <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
      )}
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Longevity Log</Text>
        <Text style={styles.headerSubtitle}>Your Account & Settings</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.profileCard}>
            <View style={styles.profileIconContainer}>
              <Ionicons name="person" size={40} color={COLORS.white} />
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Guest User</Text>
              <Text style={styles.profileEmail}>Sign in to sync your data</Text>
            </View>
            
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          {renderSettingItem(
            'notifications-outline',
            'Notifications',
            'Receive reminders to log your daily activities',
            true,
            notificationsEnabled,
            (value) => toggleSwitch('notifications', value)
          )}
          
          {renderSettingItem(
            'analytics-outline',
            'Data Collection',
            'Help us improve by sharing anonymous usage data',
            true,
            dataCollectionEnabled,
            (value) => toggleSwitch('dataCollection', value)
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          {renderSettingItem(
            'help-circle-outline',
            'Help Center',
            'Frequently asked questions and guides',
            false,
            undefined,
            undefined,
            () => Alert.alert('Coming Soon', 'Help center will be available in a future update.')
          )}
          
          {renderSettingItem(
            'mail-outline',
            'Contact Support',
            'Get help with any issues or questions',
            false,
            undefined,
            undefined,
            handleContactSupport
          )}
          
          {renderSettingItem(
            'star-outline',
            'Rate the App',
            'Let us know how we\'re doing',
            false,
            undefined,
            undefined,
            () => Alert.alert('Coming Soon', 'Rating will be available when the app is published.')
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          
          {renderSettingItem(
            'document-text-outline',
            'Privacy Policy',
            'How we handle your data',
            false,
            undefined,
            undefined,
            handlePrivacyPolicy
          )}
          
          {renderSettingItem(
            'document-text-outline',
            'Terms of Service',
            'Rules for using our app',
            false,
            undefined,
            undefined,
            handleTermsOfService
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          
          {renderSettingItem(
            'trash-outline',
            'Delete All Data',
            'Permanently remove all your data from our servers',
            false,
            undefined,
            undefined,
            handleDeleteAllData
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developer</Text>
          <FakeDataLoader />
        </View>
        
        <View style={[styles.footer, { marginTop: 0 }]}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 Longevity Log</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  },
  section: {
    marginBottom: SIZES.base * 3,
  },
  sectionTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.text,
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.base,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: SIZES.base * 2,
    padding: SIZES.base * 2,
    borderRadius: SIZES.radius,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  profileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: SIZES.base * 2,
  },
  profileName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.text,
  },
  profileEmail: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  signInButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 2,
    borderRadius: SIZES.radius,
  },
  signInButtonText: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.white,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.base * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: SIZES.base * 2,
  },
  settingTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  settingDescription: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  footer: {
    padding: SPACING.s,
    alignItems: 'center',
    marginTop: SPACING.s,
    marginBottom: SPACING.s,
  },
  versionText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  copyrightText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: SIZES.base,
  },
});

export default ProfileScreen; 