import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SwButtonProps {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
}

const SwButton: React.FC<SwButtonProps> = ({
  label,
  onPress,
  backgroundColor = '#EFAF9B',
  textColor = '#FFFFFF',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SwButton;
