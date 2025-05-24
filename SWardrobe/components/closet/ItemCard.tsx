import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

interface ItemImageProps {
    image: any; // require(...) hoặc uri
    height?: number;
    width?: number;
}

const ItemCard:React.FC<ItemImageProps> = ({image})  => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>Grey t-shirt</Text>
    </View>
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
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 5, // shift right
      height: 4, // shift down
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Android shadow (only bottom and right)
    height: 136,
    width: 128,
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

