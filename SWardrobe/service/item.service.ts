import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";


export const uploadImage = async (imageUri: string, fileName: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Authentication Error', 'Missing access token.');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: fileName,
      type: 'image/jpeg',
    } as any);

    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/items/detect`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Upload failed:', response.status, errorData);
      Alert.alert('Upload Error', 'Server returned an error. Please try again.');
      return;
    }

    const data = await response.json();

    return data;

  } catch (err) {
    throw err;
  }
};

export const postItem = async (body: any) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API error:', errorText);
      throw new Error('Failed to post item');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    throw error;
  }
};

export const getAllItems = async (user_id = "1") => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/items/my/${user_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API error:', errorText);
      throw new Error('Failed to fetch items');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    throw error;
  }
}

export const getItem = async (id: number): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/items/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch item: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};