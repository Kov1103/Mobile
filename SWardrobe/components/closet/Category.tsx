import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ItemCard from './ItemCard';
import { Item, CategoryProps } from '@/constants/Item'; // Adjust the import path as necessary

const Category: React.FC<CategoryProps> = ({ items = [] }) => {
    return (
        <ScrollView style={styles.container}>
          <View style={styles.grid}>
              {items.map((item, index) => (
              <View style={styles.itemWrapper} key={index}>
                  <ItemCard item={item} />
              </View>
              ))}
          </View>
        </ScrollView>
    );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  itemWrapper: {
    width: '48%', // Almost half, accounting for spacing
    marginBottom: 16,
  },
});
