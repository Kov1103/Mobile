import SwButton from '@/components/shared/SwButton';
import SwTextInput from '@/components/shared/SwTextInput';
import BoldContentText from '@/components/shared/text/BoldContentText';
import ContentText from '@/components/shared/text/ContentText';
import TitleText from '@/components/shared/text/TitleText';
import TitleHeader from '@/components/shared/TitleHeader';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import api from '@/middleware/auth'; // Giả sử bạn có một file api.js để quản lý các endpoint

interface LoginProps {
  navigation: any; // hoặc bạn dùng expo-router thì dùng useRouter
}

type JwtPayload = {
  sub: number; // user ID
  email: string;
  iat: number;
  exp: number;
};

const url = process.env.BASE_URL || 'http://localhost:3000'; // Đặt URL mặc định nếu không có biến môi trường

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Thêm logic xác thực ở đây
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill email and password');
      return;
    }

    try {
      const response = await api.post('/users/login', {
        email,
        password,
      });
      if (response.status < 200 || response.status >= 300) {
        console.log(response)
        throw new Error('Login failed');
      }
      const data = response.data;
      console.log('Login response data:', data);
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
        console.error('Login failed: No token returned', data);
      }

      Alert.alert('Success', `Logged in as ${email}`);
      router.push("/navigate/home");
    } 
    catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred during login';
        console.error('Login error:', errorMessage);
      Alert.alert('Error', errorMessage);
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title="Log In"></TitleHeader>

      <KeyboardAvoidingView style={styles.containerArea}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <View style={styles.welcomeContainer}>
          <TitleText style={styles.welcomeText}>Welcome</TitleText>
          <ContentText style={styles.welcomeContentText}>Please enter your details to proceed.</ContentText>
        </View>

        <View style={styles.inputContainer}>
          <SwTextInput label="Email" type="email" placeholder='example@gmail.com' onChangeText={setEmail}></SwTextInput>
          <SwTextInput label="Password" type="password" placeholder='Enter password' onChangeText={setPassword}></SwTextInput>
        </View>
        <View style={styles.buttonContainer}>
          <SwButton
            label="Log In"
            onPress={handleLogin}
            backgroundColor={Colors.pink}
            textColor={Colors.darkPink}
            width={186}
            height={41}
          />
          <TouchableOpacity>
            <BoldContentText style={{ color: Colors.black }}>Forgot Password?</BoldContentText>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <ContentText>Don't have an account?</ContentText>
            <TouchableOpacity onPress={() => router.push('/authen/signup')}>
              <ContentText style={{ color: Colors.darkPink }}>Sign Up</ContentText>
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
  welcomeContainer: {
    alignItems: 'flex-start',
    paddingVertical: 30
  },
  welcomeText: {
    fontSize: 20,
    color: Colors.black,
  },
  welcomeContentText: {
    fontSize: 14,
    color: Colors.black,
    marginTop: 10,
  },
  inputContainer: {
    justifyContent: 'center',
    paddingVertical: 30
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
    paddingVertical: 10
  },
  signUpContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 33,
    height: 33,
  },
});
