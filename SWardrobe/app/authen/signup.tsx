import SwButton from '@/components/shared/SwButton';
import SwTextInput from '@/components/shared/SwTextInput';
import BoldContentText from '@/components/shared/text/BoldContentText';
import ContentText from '@/components/shared/text/ContentText';
import TitleText from '@/components/shared/text/TitleText';
import TitleHeader from '@/components/shared/TitleHeader';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

interface SignUpProps {
  navigation: any; // hoặc bạn dùng expo-router thì dùng useRouter
}

export default function SignUp({ navigation }: SignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUP = () => {
    // Thêm logic xác thực ở đây
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill email and password');
      return;
    }
    Alert.alert('Success', `Logged in as ${email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title="Create Account"></TitleHeader>

      <KeyboardAvoidingView style={styles.containerArea}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <View style={styles.inputContainer}>
          <SwTextInput label="Full Name" type="default"></SwTextInput>
          <SwTextInput label="Email" type="email" placeholder='Input Your Email'></SwTextInput>
          <SwTextInput label="Mobile Number" type="default" placeholder='0123 456 789'></SwTextInput>
          <SwTextInput label="Date of Birth" type="default" placeholder='DD/MM/YYYY'></SwTextInput>
          <SwTextInput label="Password" type="password" placeholder='Enter password'></SwTextInput>
          <SwTextInput label="Confirm Password" type="password" placeholder='Enter confirm password'></SwTextInput>
        </View>
        <View style={styles.buttonContainer}>
          <ContentText style={{ textAlign: 'center', width: 195 }}>
            By continuing, you agree to{' '}
            <BoldContentText>Terms of Use</BoldContentText> and{' '}
            <BoldContentText>Privacy Policy</BoldContentText>.
          </ContentText>
          <SwButton
            label="Sign Up"
            onPress={handleSignUP}
            backgroundColor={Colors.pink}
            textColor={Colors.darkPink}
            width={186}
            height={41}
          />
        </View>
        <View style={styles.signUpContainer}>
          <ContentText>or sign up with</ContentText>
          <TouchableOpacity onPress={() => console.log('Facebook pressed')}>
            <Image source={require('@/assets/icon/google-icon.png')} style={styles.icon} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <ContentText>Already have an account?</ContentText>
            <TouchableOpacity onPress={() => router.push('/authen/login')}>
              <ContentText style={{ color: Colors.darkPink }}>Log In</ContentText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30
  },
  inputContainer: {
    justifyContent: 'center',
    paddingVertical: 20
  },
  input: {
    borderColor: '#E9957C',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 33,
    height: 33,
  },
});
