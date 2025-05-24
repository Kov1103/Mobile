import SwButton from '@/components/shared/SwButton';
import SwLogo from '@/components/shared/SwLogo';
import SwNavigator from '@/components/shared/SwNavigator';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Palette from '@/components/closet/Palette';

const HomeScreen = ({ navigation }: any) => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <SwNavigator></SwNavigator>
      <Palette></Palette>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    width: '50%',
    alignItems: 'center',
    gap: 12,
    marginBottom: 50,
  },
  footer: {
    color: '#EFAF9B',
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    letterSpacing: 8,
    paddingTop: 20,
    marginBottom: 10, 
  },
});


