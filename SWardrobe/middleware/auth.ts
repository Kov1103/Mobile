// axiosInstance.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL, // Thay bằng URL của bạn
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const logIn = async (email: string, password: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  const data = await response.json();

  if (!data || !data.access_token) {
    throw new Error('No access_token returned from server');
  }

  const token = data.access_token;
  await AsyncStorage.setItem('token', token);

  if (!token) {
    throw new Error('No token returned from login');
  }
  return data;
};



export const signUp = async (full_name: string,
        email: string,
        password: string,
        mobileNumber: string,
        date: Date = new Date()): Promise<any> => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Sign up failed: ${errorText}`);
    }

    const data = await response.json();

  if (!data || !data.access_token) {
    throw new Error('No access_token returned from server');
  }

  const token = data.access_token;
  await AsyncStorage.setItem('token', token);

  if (!token) {
    throw new Error('No token returned from login');
  }
  return data;
}
  catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
};

