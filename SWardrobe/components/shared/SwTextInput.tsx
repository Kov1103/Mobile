import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '@/constants/Colors';

interface SwTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const SwTextInput: React.FC<SwTextInputProps> = ({ label, error, style, ...rest }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[styles.input, style, error ? styles.inputError : null]}
        placeholderTextColor={Colors.lightPink}
        {...rest}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: Colors.black,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.black,
    backgroundColor: Colors.white,
  },
  inputError: {
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default SwTextInput;
