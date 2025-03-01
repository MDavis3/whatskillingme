import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { RootStackParamList, MainTabParamList } from '../types';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import HistoryScreen from '../screens/HistoryScreen';
import LogEntryScreen from '../screens/LogEntryScreen';
import ResultsScreen from '../screens/ResultsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import Onboarding1Screen from '../screens/Onboarding1Screen';
import Onboarding2Screen from '../screens/Onboarding2Screen';
import Onboarding3Screen from '../screens/Onboarding3Screen';
import Onboarding4Screen from '../screens/Onboarding4Screen';
import Onboarding5Screen from '../screens/Onboarding5Screen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Custom tab bar component
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[
      styles.tabBarContainer, 
      { paddingBottom: Math.max(insets.bottom, 10) }
    ]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;
        
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Ionicons
              name={options.tabBarIcon({ color: '', size: 0 }).props.name}
              size={24}
              color={isFocused ? COLORS.primary : COLORS.textSecondary}
            />
            <Text style={[
              styles.tabBarLabel,
              { color: isFocused ? COLORS.primary : COLORS.textSecondary }
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Main tab navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="NewLog"
        component={LogEntryScreen}
        options={{
          tabBarLabel: 'Journal',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="journal" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Root stack navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding1" component={Onboarding1Screen} />
        <Stack.Screen name="Onboarding2" component={Onboarding2Screen} />
        <Stack.Screen name="Onboarding3" component={Onboarding3Screen} />
        <Stack.Screen name="Onboarding4" component={Onboarding4Screen} />
        <Stack.Screen name="Onboarding5" component={Onboarding5Screen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="LogEntry" component={LogEntryScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    height: 75,
    ...SHADOWS.medium,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default AppNavigator; 