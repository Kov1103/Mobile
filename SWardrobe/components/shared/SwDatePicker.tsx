import React, { useState } from 'react';
import { View, StyleSheet, Platform, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '@/constants/Colors';
import SubtitleText from './text/SubtitleText';

interface SwDatePickerProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

const SwDatePicker: React.FC<SwDatePickerProps> = ({ label, value, onChange, minimumDate, maximumDate }) => {
  const [show, setShow] = useState(false);

  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB');
  };

  return (
    <View style={styles.container}>
      {label && <SubtitleText style={styles.label}>{label}</SubtitleText>}

      <Pressable
        onPress={() => setShow(true)}
        style={({ pressed }) => [
          styles.input,
          styles.inputUnfocused,
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text style={styles.dateText}>{formatDate(value)}</Text>
      </Pressable>

      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display={'default'}
          onChange={onChangeDate}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    paddingLeft: 10,
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 41,
    justifyContent: 'center',
  },
  inputUnfocused: {
    backgroundColor: Colors.lightYellow,
    borderColor: Colors.lightYellow,
  },
  dateText: {
    fontSize: 16,
    color: Colors.lightPink,
    fontFamily: 'Poppins-Regular',
  },
});

export default SwDatePicker;
