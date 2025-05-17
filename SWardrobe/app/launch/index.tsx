import SwButton from '@/components/shared/SwButton';
import SwLogo from '@/components/shared/SwLogo';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const LaunchScreen = ({ navigation }: any) => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <SwLogo hasTitle={true} />
      </View>
      <View style={styles.buttonContainer}>
        <SwButton
          label="Log In"
          onPress={() => router.replace("/authen/login")}
          backgroundColor={Colors.pink}
          textColor={Colors.white}
          width={'100%'}
        />
        <SwButton
          label="Sign Up"
          onPress={() => router.replace("/authen/signup")}
          backgroundColor={Colors.lightYellow}
          textColor={Colors.pink}
          width={'100%'}
        />
      </View>
      <Text style={styles.footer}>Sticket Group</Text>
    </SafeAreaView>
  );
};

export default LaunchScreen;

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


