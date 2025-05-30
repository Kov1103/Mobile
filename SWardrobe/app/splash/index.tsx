import SwLogo from '@/components/shared/SwLogo';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <SwLogo hasTitle={true} isWhite={true}/>
      </View>
      <Text style={styles.footer}>Sticket Group</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pink,
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
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    letterSpacing: 8,
    paddingTop: 20,
  },
});


