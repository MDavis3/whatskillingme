import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { QuestionnaireSection } from '../types';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';

interface SectionListProps {
  sections: QuestionnaireSection[];
  currentSectionId?: string;
  completedSections?: string[];
  onSelectSection: (sectionId: string) => void;
  containerStyle?: ViewStyle;
}

const SectionList: React.FC<SectionListProps> = ({
  sections,
  currentSectionId,
  completedSections = [],
  onSelectSection,
  containerStyle,
}) => {
  const getSectionStatus = (sectionId: string) => {
    if (currentSectionId === sectionId) return 'current';
    if (completedSections.includes(sectionId)) return 'completed';
    return 'pending';
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>Questionnaire Sections</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sections.map((section, index) => {
          const status = getSectionStatus(section.id);
          
          return (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.sectionItem,
                status === 'current' && styles.currentSection,
                status === 'completed' && styles.completedSection,
              ]}
              onPress={() => onSelectSection(section.id)}
              disabled={status === 'current'}
            >
              <View style={styles.sectionNumber}>
                <Text style={[
                  styles.sectionNumberText,
                  status === 'current' && styles.currentSectionNumberText,
                  status === 'completed' && styles.completedSectionNumberText,
                ]}>
                  {index + 1}
                </Text>
              </View>
              
              <Text style={[
                styles.sectionTitle,
                status === 'current' && styles.currentSectionTitle,
                status === 'completed' && styles.completedSectionTitle,
              ]}>
                {section.title}
              </Text>
              
              {status === 'completed' && (
                <View style={styles.completedIndicator} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginBottom: SPACING.s,
  },
  scrollContent: {
    paddingRight: SPACING.m,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    marginRight: SPACING.s,
    borderRadius: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  currentSection: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}10`,
  },
  completedSection: {
    borderColor: COLORS.success,
    backgroundColor: `${COLORS.success}10`,
  },
  sectionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.s,
  },
  sectionNumberText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  currentSectionNumberText: {
    color: COLORS.primary,
  },
  completedSectionNumberText: {
    color: COLORS.success,
  },
  sectionTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  currentSectionTitle: {
    color: COLORS.primary,
  },
  completedSectionTitle: {
    color: COLORS.success,
  },
  completedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginLeft: SPACING.s,
  },
});

export default SectionList; 