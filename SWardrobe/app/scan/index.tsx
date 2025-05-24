import SwScanNavigator from '@/components/shared/SwScanNavigator';
import TitleHeader from '@/components/shared/TitleHeader';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScanScreen  = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title="Scan Your Clothes"></TitleHeader>
      <SwScanNavigator></SwScanNavigator>
    </SafeAreaView>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});


