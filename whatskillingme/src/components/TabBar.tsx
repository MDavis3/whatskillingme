import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabBarItemProps {
  label: string;
  icon: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

const TabBarItem: React.FC<TabBarItemProps> = ({
  label,
  icon,
  isFocused,
  onPress,
  onLongPress,
}) => {
  const iconName = isFocused 
    ? icon.endsWith('-outline') ? icon.replace('-outline', '') : icon
    : icon.endsWith('-outline') ? icon : `${icon}-outline`;
    
  return (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.iconContainer,
        isFocused && styles.focusedIconContainer
      ]}>
        <Ionicons
          name={iconName as keyof typeof Ionicons.glyphMap}
          size={22}
          color={isFocused ? COLORS.primary : COLORS.textSecondary}
        />
      </View>
      
      <Text style={[
        styles.label,
        isFocused && styles.focusedLabel
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[
      styles.container,
      { paddingBottom: Math.max(insets.bottom, SPACING.s) }
    ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel as string || options.title || route.name;
        
        const icon = (options.tabBarIcon as any) || 'help-circle';
        
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
        
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        
        return (
          <TabBarItem
            key={route.key}
            label={label}
            icon={icon}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...Platform.select({
      ios: {
        ...SHADOWS.medium,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.s,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedIconContainer: {
    backgroundColor: `${COLORS.primary}10`,
  },
  label: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  focusedLabel: {
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
});

export default TabBar; 