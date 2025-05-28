import { Link } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Item } from '@/constants/Item';


type ItemCardProps = {
  item: Item;
};

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <Link href={{
      pathname: '/closet/detail',
      params: {
        image: item.image[0],
        name: item.name,
        category: item.category,
        color: item.color,
      }
    }}>
      <View style={styles.card}>
        <Image source={{ uri: item.image[0] }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </Link>
  );
}
export default ItemCard;

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 5, // shift right
      height: 4, // shift down
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Android shadow (only bottom and right)
    height: 140,
    width: 150,
  },
  name: {
    fontFamily: 'League Spartan',
    fontSize: 14,
    marginTop: 15,
  },
  image: {
    width: 60,
    height: 70,
  }
});

