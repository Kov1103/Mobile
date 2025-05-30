import React, { useState } from 'react';
import { View, StyleSheet, TextInputProps, TextInput, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import SubtitleText from './text/SubtitleText';

interface SwTextInputProps extends TextInputProps {
  label?: string;
  type: 'default' | 'password' | 'email' | 'number' | 'phone';
  placeholder?: string;
  style?: object;
  value?: string;
  onChangeText?: (text: string) => void;
  showValidationError?: boolean;
  ref?: React.Ref<TextInput>;
}

const SwTextInput: React.FC<SwTextInputProps> = ({
  label,
  type,
  style,
  placeholder = 'Input Text',
  onChangeText,
  showValidationError = true,
  ref,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const formatPhoneNumber = (input: string) => {
    const digits = input.replace(/\D/g, '').slice(0, 10); // chỉ lấy 10 số
    const parts = [];

    if (digits.length > 0) parts.push(digits.slice(0, 4));
    if (digits.length > 4) parts.push(digits.slice(4, 7));
    if (digits.length > 7) parts.push(digits.slice(7, 10));

    return parts.join(' ');
  };

  const validate = (text: string) => {
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setError(emailRegex.test(text) ? '' : 'Invalid email format');
    } else if (type === 'number') {
      const numberRegex = /^\d+$/;
      setError(numberRegex.test(text) ? '' : 'Only numbers are allowed');
    } else if (type === 'phone') {
      const digits = text.replace(/\D/g, '');
      setError(digits.length === 10 ? '' : 'Phone number must be 10 digits');
    } else if (text === '') {
      setError('This field is required');
    } else {
      setError('');
    }
  };

  const handleTextChange = (text: string) => {
    let processedText = text;

    if (type === 'phone') {
      processedText = formatPhoneNumber(text);
    }

    setValue(processedText);
    validate(processedText);

    if (onChangeText) {
      onChangeText(processedText);
    }
  };

  return (
    <View style={styles.container}>
      {label && <SubtitleText style={styles.label}>{label}</SubtitleText>}
      <TextInput
        ref={ref}
        style={[
          styles.input,
          !isFocused && styles.inputUnfocused,
          isFocused && styles.inputFocused,
          !!error && styles.inputError,
          style,
        ]}
        autoComplete={type === 'email' ? 'email' : 'off'}
        placeholderTextColor={Colors.lightPink}
        placeholder={placeholder}
        secureTextEntry={type === 'password'}
        keyboardType={
          type === 'email' ? 'email-address' :
            type === 'number' || type === 'phone' ? 'numeric' :
              'default'
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          validate(value);
        }}
        onChangeText={handleTextChange}
        value={value}
        {...rest}
      />
      {error && showValidationError && <Text style={[styles.errorText, { color: 'red' }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16,
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
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    paddingVertical: 10,
  },
  inputUnfocused: {
    backgroundColor: Colors.lightYellow,
    color: Colors.lightPink,
    borderColor: Colors.lightYellow,
  },
  inputFocused: {
    borderColor: Colors.pink,
    backgroundColor: Colors.white,
    color: Colors.darkPink,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    paddingLeft: 10,
  },
});

export default SwTextInput;
