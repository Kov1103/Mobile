import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function SwColor({ color }: { color: string }) {
  return (
    <View style={styles.outerCircle}>
      <View style={[styles.innerCircle, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  outerCircle: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
    marginRight: 10,
  },
  innerCircle: {
    width: 25,
    height: 25,
    borderRadius: 12,
  },
});
