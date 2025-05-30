export const getUser = async (id: number): Promise<any> => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
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
