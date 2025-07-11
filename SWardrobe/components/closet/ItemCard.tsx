import { Link } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Image, Text,TouchableOpacity } from 'react-native';
import { Item } from '@/constants/Item';


type ItemCardProps = {
  item: Item;
};

import { useRouter } from "expo-router";
import ContentText from '../shared/text/ContentText';

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/closet/detail",
      params: {
        id: item.id,
      }
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Image source={{ uri: item.image[0] }} style={styles.image} />
        <ContentText style={styles.name}>{item.name}</ContentText>
      </View>
    </TouchableOpacity>
  );
};
export default ItemCard;


const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    // marginVertical: 10,
    marginBottom: 20,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 5, // shift right
      height: 4, // shift down
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    height: 140,
    width: 150,
  },
  name: {
    fontSize: 14,
    marginTop: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  image: {
    width: 60,
    height: 70,
  }
});

