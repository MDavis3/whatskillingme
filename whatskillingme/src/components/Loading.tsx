import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { COLORS, SIZES, SPACING } from '../constants/theme';

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
  size?: 'small' | 'large';
  style?: ViewStyle;
}

const Loading: React.FC<LoadingProps> = ({
  text = 'Loading...',
  fullScreen = false,
  size = 'large',
  style,
}) => {
  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, style]}>
        <View style={styles.loadingBubble}>
          <ActivityIndicator size={size} color={COLORS.primary} />
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={COLORS.primary} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  loadingBubble: {
    backgroundColor: COLORS.card,
    padding: SPACING.l,
    borderRadius: SIZES.radius * 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    minWidth: 150,
  },
  text: {
    marginTop: SPACING.s,
    fontSize: SIZES.font,
    color: COLORS.text,
    textAlign: 'center',
  },
});

export default Loading; 