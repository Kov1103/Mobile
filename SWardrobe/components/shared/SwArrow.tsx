import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface SwArrowProps {
  direction: 'left' | 'right';
  onPress: () => void;
  size?: number;
  color?: string;
}
const SwArrow: React.FC<SwArrowProps> = ({ direction, onPress, size = 24, color = Colors.black }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons
        name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
}
export default SwArrow;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    transform: [{ rotate: '180deg' }],
  },
  right: {
    transform: [{ rotate: '0deg' }],
    }
});