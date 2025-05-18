import React, { useState } from 'react';
import { View, StyleSheet, TextInputProps, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import SubtitleText from './text/SubtitleText';

interface SwTextInputProps extends TextInputProps {
  label?: string;
  type: 'default' | 'password' | 'email';
  placeholder?: string;
  style?: object;
  onChangeText?: (text: string) => void;
}

const SwTextInput: React.FC<SwTextInputProps> = ({ label, type, style, placeholder = 'Input Text', onChangeText, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.container}>
      {label && <SubtitleText style={styles.label}>{label}</SubtitleText>}

      <TextInput
        style={[
          styles.input,
          style,
          !isFocused && styles.inputUnfocused,
          isFocused && styles.inputFocused,
        ]}
        autoComplete={type === 'email' ? 'email' : 'off'}
        placeholderTextColor={Colors.lightPink}
        placeholder={placeholder}
        secureTextEntry={type === 'password'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={(text) => {
          if (onChangeText) {
            onChangeText(text);
          }
        }}
        {...(type === 'email' && { keyboardType: 'email-address' })}
        {...(type === 'password' && { secureTextEntry: true })}
        {...rest}
      />
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
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    height: 41
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
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default SwTextInput;
