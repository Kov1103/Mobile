import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import SwArrow from '@/components/shared/SwArrow';
import Category from '@/components/closet/Category';
import { Colors } from '@/constants/Colors';
import api from '@/middleware/auth';
import { Item } from '@/constants/Item';

const HomeScreen = ({ navigation }: any) => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        if (!id) {
          console.warn('User ID not found in AsyncStorage');
          return;
        }

        const response = await api.get(`/items/my/${id}`);
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Failed to fetch items');
        }

        const data = response.data;
        setItems(data);
        setCategories(['All', ...getCategories(data)]);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const getCategories = (items: Item[]): string[] => {
    const categorySet = new Set(
      items.flatMap(item =>
        Array.isArray(item.category) ? item.category : [item.category]
      )
    );
    return Array.from(categorySet).filter(Boolean); // Remove null/undefined
  };

  const filteredItems = (category: string) => {
    if (category === 'All') return items;
    return items.filter(item => item.category.includes(category));
  };

  const handlePress = () => {
    router.push({
      pathname: '/closet/category',
      params: {
        items: JSON.stringify(filteredItems(selectedCategory)),
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, marginBottom: 40 }}>
      <ScrollView style={styles.container}>
        {categories.map((category, index) => (
          <View key={category || index}>
            <View style={styles.titleLine}>
              <Text style={styles.titleText}>{category}</Text>
              <SwArrow direction="right" onPress={() => handlePress()} />
            </View>
            <Category items={filteredItems(category).slice(0, 2)} />
            {filteredItems(category).length === 0 && (
              <Text style={styles.emptyText}>No items in this category</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: Dimensions.get('window').width,
    paddingHorizontal: 30,
    backgroundColor: Colors.white,
  },
  titleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#aaa',
    paddingLeft: 10,
  },
});
