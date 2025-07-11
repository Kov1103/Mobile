import SwButton from '@/components/shared/SwButton';
import SwDatePicker from '@/components/shared/SwDatePicker';
import SwTextInput from '@/components/shared/SwTextInput';
import BoldContentText from '@/components/shared/text/BoldContentText';
import ContentText from '@/components/shared/text/ContentText';
import TitleHeader from '@/components/shared/TitleHeader';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '@/components/loading';
import { signUp } from '@/middleware/auth'; // Giả sử bạn đã tạo middleware auth để xử lý đăng ký
interface SignUpProps {
  navigation: any; // hoặc bạn dùng expo-router thì dùng useRouter
}

export default function SignUp({ navigation }: SignUpProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [full_name, setFull_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const response = await signUp(
        full_name,
        email,
        password,
        mobileNumber,
        date
      );
      // if (response.status < 200 || response.status >= 300) {
      //   throw new Error('Sign up failed');
      // }

      Alert.alert('Success', `Your account as ${email} has been created successfully! Please log in to continue.`);
      router.push("/launch");
    }
    catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred during sign up';
      Alert.alert('Error', errorMessage);
      return;
    }
    finally {
      setLoading(false);
    };
  }

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    });

    return () => {
      keyboardHideListener.remove();
    };
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title="Create Account"></TitleHeader>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.containerArea}
          behavior={Platform.select({ ios: 'padding', android: 'padding' })} enabled
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ paddingBottom: 200 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputContainer}>
              <SwTextInput label="Full Name" type="default" placeholder='Input Your Full Name' value={full_name} onChangeText={setFull_name}></SwTextInput>
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
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {loading && (
        <Loading />
      )}
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
    paddingHorizontal: 30,
  },
  inputContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    borderColor: '#E9957C',
    borderWidth: 1,
    borderRadius: 10,
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