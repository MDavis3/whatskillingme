import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  ViewStyle,
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface ShareCardProps {
  title: string;
  message: string;
  url?: string;
  containerStyle?: ViewStyle;
}

const ShareCard: React.FC<ShareCardProps> = ({
  title,
  message,
  url = 'https://whatskillingme.com',
  containerStyle,
}) => {
  const handleShare = async () => {
    try {
      await Share.share({
        title,
        message: `${message}\n\n${url}`,
        url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handleShare}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Share Your Results</Text>
        <Text style={styles.description}>
          Challenge your friends to discover their lifestyle impact and compare results!
        </Text>
      </View>
      
      <View style={styles.iconContainer}>
        <Ionicons name="share-social" size={24} color={COLORS.card} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.base,
    padding: SPACING.m,
    marginVertical: SPACING.m,
    ...SHADOWS.medium,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.card,
    marginBottom: SPACING.xs,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.card,
    opacity: 0.9,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.card}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.m,
  },
});

export default ShareCard; 