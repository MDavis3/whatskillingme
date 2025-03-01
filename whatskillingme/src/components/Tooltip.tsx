import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  tooltipStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
  containerStyle,
  tooltipStyle,
  textStyle,
  iconName = 'information-circle',
  iconSize = 18,
  iconColor = COLORS.primary,
}) => {
  const [visible, setVisible] = useState(false);
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const toggleTooltip = () => {
    setVisible(!visible);
  };

  const getTooltipPosition = (): ViewStyle => {
    const tooltipWidth = Math.min(300, screenWidth - 40);
    let positionStyle: ViewStyle = { width: tooltipWidth };

    switch (position) {
      case 'top':
        positionStyle = {
          ...positionStyle,
          bottom: layout.height + 10,
          left: layout.width / 2 - tooltipWidth / 2,
        };
        break;
      case 'bottom':
        positionStyle = {
          ...positionStyle,
          top: layout.height + 10,
          left: layout.width / 2 - tooltipWidth / 2,
        };
        break;
      case 'left':
        positionStyle = {
          ...positionStyle,
          right: layout.width + 10,
          top: layout.height / 2 - 20,
        };
        break;
      case 'right':
        positionStyle = {
          ...positionStyle,
          left: layout.width + 10,
          top: layout.height / 2 - 20,
        };
        break;
    }

    // Adjust if tooltip would go off screen
    if ((position === 'top' || position === 'bottom') && 
        typeof positionStyle.left === 'number') {
      if (layout.x + positionStyle.left < 10) {
        positionStyle.left = -layout.x + 10;
      } else if (layout.x + positionStyle.left + tooltipWidth > screenWidth - 10) {
        positionStyle.left = screenWidth - layout.x - tooltipWidth - 10;
      }
    }

    return positionStyle;
  };

  const getTooltipArrow = (): ViewStyle => {
    let arrowStyle: ViewStyle = {
      position: 'absolute',
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
    };

    switch (position) {
      case 'top':
        arrowStyle = {
          ...arrowStyle,
          bottom: -10,
          left: '50%',
          marginLeft: -10,
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderTopWidth: 10,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: COLORS.card,
        };
        break;
      case 'bottom':
        arrowStyle = {
          ...arrowStyle,
          top: -10,
          left: '50%',
          marginLeft: -10,
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderBottomWidth: 10,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: COLORS.card,
        };
        break;
      case 'left':
        arrowStyle = {
          ...arrowStyle,
          right: -10,
          top: '50%',
          marginTop: -10,
          borderTopWidth: 10,
          borderBottomWidth: 10,
          borderLeftWidth: 10,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: COLORS.card,
        };
        break;
      case 'right':
        arrowStyle = {
          ...arrowStyle,
          left: -10,
          top: '50%',
          marginTop: -10,
          borderTopWidth: 10,
          borderBottomWidth: 10,
          borderRightWidth: 10,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: COLORS.card,
        };
        break;
    }

    return arrowStyle;
  };

  return (
    <View
      style={[styles.container, containerStyle]}
      onLayout={(event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        setLayout({ x, y, width, height });
      }}
    >
      <TouchableOpacity
        onPress={toggleTooltip}
        activeOpacity={0.7}
        style={styles.trigger}
      >
        {children || (
          <Ionicons name={iconName} size={iconSize} color={iconColor} />
        )}
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View
            style={[
              styles.tooltip,
              getTooltipPosition(),
              tooltipStyle,
            ]}
            pointerEvents="auto"
          >
            <Text style={[styles.tooltipText, textStyle]}>
              {content}
            </Text>
            <View style={getTooltipArrow()} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  trigger: {
    padding: SPACING.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.base,
    padding: SPACING.m,
    ...SHADOWS.medium,
  },
  tooltipText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.text,
  },
});

export default Tooltip; 