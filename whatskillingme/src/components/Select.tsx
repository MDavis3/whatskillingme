import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, FONT, SIZES, SPACING } from '../constants/theme';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  selectStyle?: ViewStyle;
  optionStyle?: ViewStyle;
  optionTextStyle?: TextStyle;
  errorStyle?: TextStyle;
}

const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  error,
  containerStyle,
  labelStyle,
  selectStyle,
  optionStyle,
  optionTextStyle,
  errorStyle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      
      <TouchableOpacity
        style={[
          styles.select,
          error && styles.selectError,
          selectStyle,
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.selectText,
            !selectedOption && styles.placeholderText,
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <View style={styles.arrow} />
      </TouchableOpacity>
      
      {error && (
        <Text style={[styles.error, errorStyle]}>
          {error}
        </Text>
      )}
      
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label || 'Select an option'}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.value === value && styles.selectedOption,
                    optionStyle,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.selectedOptionText,
                      optionTextStyle,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
  },
  label: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.base,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.card,
  },
  selectError: {
    borderColor: COLORS.error,
  },
  selectText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
    flex: 1,
  },
  placeholderText: {
    color: COLORS.textSecondary,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.textSecondary,
  },
  error: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: SPACING.m,
    borderTopRightRadius: SPACING.m,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  closeButton: {
    fontFamily: FONT.medium,
    fontSize: SIZES.font,
    color: COLORS.primary,
  },
  option: {
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedOption: {
    backgroundColor: `${COLORS.primary}10`,
  },
  optionText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  selectedOptionText: {
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
});

export default Select; 