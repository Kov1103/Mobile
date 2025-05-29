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
import SwArrow from '@/components/shared/SwArrow';
import TitleHeader from '@/components/shared/TitleHeader';
const url = process.env.BASE_URL || 'http://localhost:3000'; // Đặt URL mặc định nếu không có biến môi trường
import {Item, CategoryProps, useItemStore} from '@/constants/Item';


const HomeScreen = ({ navigation }: any) => {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        const response = await api.get(`/items/my/${id}`);
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Failed to fetch items');
        }
        const data = response.data;
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
    router.push({
      pathname: '/closet/category',
      params: {
        items: JSON.stringify(filteredItems(selectedCategory)),
      },
    });

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, marginBottom: 40, paddingHorizontal: 0 }}>
        {/* <TitleHeader title="Your Closet" showBackButton={false} /> */}
        <ScrollView style={styles.container}>
        { categories.map((category, index) => (
          <View>
            <View key={index} style={styles.titleLine}>
              <Text style={styles.titleText}>{category}</Text>
              <SwArrow direction="right" onPress={() => handlePress()} />
            </View>
            <Category items={filteredItems(category)} />
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
    // alignItems: 'flex-start',
    width: Dimensions.get('window').width,
    paddingHorizontal: 30,
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


