import SwButton from '@/components/shared/SwButton';
import ContentText from '@/components/shared/text/ContentText';
import TitleText from '@/components/shared/text/TitleText';
import TitleHeader from '@/components/shared/TitleHeader';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, SafeAreaView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface LoginProps {
  navigation: any; // hoặc bạn dùng expo-router thì dùng useRouter
}

export default function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Thêm logic xác thực ở đây
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill email and password');
      return;
    }
    // Giả sử đăng nhập thành công
    Alert.alert('Success', `Logged in as ${email}`);
    // Điều hướng tiếp theo nếu muốn
    // navigation.navigate('Home');
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
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            textContentType="password"
          />
        </View>
        <View style={styles.buttonContainer}>
          <SwButton
            label="Log In"
            onPress={handleLogin}
            backgroundColor={Colors.pink}
            textColor={Colors.darkPink}
            width={'50%'}
          />
        </View>
        <View style={styles.signUp}></View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: '#E9957C',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
