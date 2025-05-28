import SwButton from '@/components/shared/SwButton';
import SwLogo from '@/components/shared/SwLogo';
import SwNavigator from '@/components/shared/SwNavigator';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import { use, useEffect, useState } from 'react';
import api from '@/middleware/auth';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Palette from '@/components/closet/Palette';
import SwSelector from '@/components/shared/SwSelector';
import ItemImage from '@/components/closet/ItemImage';
import ItemCard from '@/components/closet/ItemCard';
import Category from '@/components/closet/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwTag from '@/components/shared/SwTag';
import CategoryLine from '@/components/closet/CategoryLine';
import DetailScreen from './detail';

const url = process.env.BASE_URL || 'http://localhost:3000'; // Đặt URL mặc định nếu không có biến môi trường
import {Item, CategoryProps, useItemStore} from '@/constants/Item';
import SwArrow from '@/components/shared/SwArrow';


const HomeScreen = ({ navigation }: any) => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        // const token = await AsyncStorage.getItem('token');
        // const response = await fetch(`${url}/items/my/${id}`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`,
        //   },
        // });
        const response = await api.get(`/items/my/${id}`);
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Failed to fetch items');
        }
        const data = response.data;
        console.log('Fetched items:', data);
        setItems(data);
        setCategories(getCategories(data));
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const getCategories = (items: Item[]): string[] => {
    const categorySet = new Set(
      items.flatMap(item => Array.isArray(item.category) ? item.category : [item.category])
    );
    return Array.from(categorySet);
  };


  const filteredItems = (category: string) => {
    if (category === 'All') {
      return items;
    }
    return items.filter(item => item.category.includes(category));
  };

  const handlePress = () => {
    useItemStore.getState().setItems({ items });
    router.push('/closet/category');
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.titleLine}>
          <Text style={styles.titleText}>Kind</Text>
          <SwArrow
              direction="right"
              onPress={() => handlePress()}
              size={24}
              color="#000"
          />
        </View>
        <CategoryLine items={filteredItems('All')} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // alignItems: 'flex-start',
    width: Dimensions.get('window').width*0.8,
    backgroundColor: Colors.white,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    width: '50%',
    alignItems: 'center',
    gap: 12,
    marginBottom: 50,
  },
  footer: {
    color: '#EFAF9B',
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    letterSpacing: 8,
    paddingTop: 20,
    marginBottom: 10, 
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
    }
});


