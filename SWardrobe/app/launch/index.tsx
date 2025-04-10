import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const LaunchScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>SWardrobe</Text>
      </View>

      {/* Chỉnh sửa buttonContainer */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Sticket Group</Text>
    </SafeAreaView>
  );
};

export default LaunchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between', // Đảm bảo có khoảng cách giữa logo và footer
    alignItems: 'center',
    paddingVertical: 40,
  },
  centered: {
    flex: 1, // Chiếm không gian giữa logo và footer
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  logo: {
    height: 100,
    marginBottom: 20, // Khoảng cách giữa logo và title (nếu có)
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#EFAF9B',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    gap: 12,
    marginTop: 'auto',  // Đảm bảo các nút nằm giữa logo và footer
    marginBottom: 'auto', // Đảm bảo khoảng cách với footer
  },
  loginButton: {
    backgroundColor: '#EFAF9B',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#FFF4EF',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  signupText: {
    color: '#EFAF9B',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    color: '#EFAF9B',
    fontSize: 12,
    letterSpacing: 2,
    paddingTop: 20, // Thêm paddingTop tại đây
    marginBottom: 10, // Đảm bảo footer cách đáy màn hình
  },
});


