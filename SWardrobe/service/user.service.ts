import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = async (id: number): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch user: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
