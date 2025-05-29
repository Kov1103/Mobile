import SwButton from '@/components/shared/SwButton';
import SwDatePicker from '@/components/shared/SwDatePicker';
import SwTextInput from '@/components/shared/SwTextInput';
import BoldContentText from '@/components/shared/text/BoldContentText';
import ContentText from '@/components/shared/text/ContentText';
import TitleText from '@/components/shared/text/TitleText';
import TitleHeader from '@/components/shared/TitleHeader';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import api from '@/middleware/auth'; // Giả sử bạn có một file api.js để quản lý các endpoint
interface SignUpProps {
  navigation: any; // hoặc bạn dùng expo-router thì dùng useRouter
}

export default function SignUp({ navigation }: SignUpProps) {
  const [full_name, setFull_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSignUP = async () => {
    // Thêm logic xác thực ở đây
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill email and password');
      return;
    }
    try {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      // const response = await fetch(`${process.env.BASE_URL}/users/register`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ full_name, email, password, mobileNumber, date }),
      // });
      const response = await api.post('/users/register', {
        full_name,
        email,
        password,
        mobileNumber,
        date: date.toISOString().split('T')[0], // Chuyển đổi ngày sang định dạng YYYY-MM-DD
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Sign up failed');
      }
      const data = response.data;
      // Lưu token vào AsyncStorage
      if (data) {
        // // Save the token
        await AsyncStorage.setItem('token', data.access_token);

        // Decode safely
        try {
          const user = data.user;
          await AsyncStorage.setItem('id', user.id.toString());
        } catch (decodeErr) {
          console.error('JWT decode failed:', decodeErr);
        }
      } else {
        console.error('Signup failed: ', data);
      }

        Alert.alert('Success', `Logged in as ${email}`);
        router.push("/navigate/home");
      } 
    catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred during sign up';
      Alert.alert('Error', errorMessage);
      return;
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title="Create Account"></TitleHeader>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.containerArea}
          behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
          <View style={styles.inputContainer}>
            <SwTextInput label="Full Name" type="default" placeholder='Input Your Full Name' value={fullName} onChangeText={setFullName}></SwTextInput>
            <SwTextInput label="Email" type="email" placeholder='Input Your Email' value={email} onChangeText={setEmail}></SwTextInput>
            <SwTextInput label="Mobile Number" type="phone" placeholder='0123 456 789' value={mobileNumber} onChangeText={setMobileNumber}></SwTextInput>
            {/* <SwTextInput label="Date of Birth" type="default" placeholder='DD/MM/YYYY'></SwTextInput> */}
            <SwDatePicker
              label="Date of Birth"
              value={date}
              onChange={setDate}
              minimumDate={new Date(1900, 0, 1)}
              maximumDate={new Date()}
            />
            <SwTextInput label="Password" type="password" placeholder='Enter password' value={password} onChangeText={setPassword}></SwTextInput>
            <SwTextInput label="Confirm Password" type="password" placeholder='Enter confirm password' value={confirmPassword} onChangeText={setConfirmPassword}></SwTextInput>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <ContentText>Already have an account?</ContentText>
              <TouchableOpacity onPress={() => router.push('/authen/login')}>
                <ContentText style={{ color: Colors.darkPink }}>Log In</ContentText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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