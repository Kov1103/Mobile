import React from 'react';
import { View, StyleSheet } from 'react-native';
const ItemCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.card}>
      <img
        src=""
        alt="Item"
        style={styles.image}
        />
        <p style={styles.name}>Grey t-shirt</p>
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
    width: 97,
    height: 81  
  }
});

