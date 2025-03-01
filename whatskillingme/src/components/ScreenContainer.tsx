import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = true,
  keyboardAvoiding = true,
  containerStyle,
  contentContainerStyle,
}) => {
  const renderContent = () => {
    if (scrollable) {
      return (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      );
    }

    return (
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.card}
      />
      
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          {renderContent()}
        </KeyboardAvoidingView>
      ) : (
        renderContent()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: SPACING.m,
  },
});

export default ScreenContainer; 