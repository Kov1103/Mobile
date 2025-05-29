import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ItemImage from "@/components/closet/ItemImage";
import SwTag from "@/components/shared/SwTag";
import SwColor from "@/components/shared/SwColor";
import { Colors } from "@/constants/Colors";
import SwNavigator from '@/components/shared/SwNavigator';
import { SafeAreaView } from "react-native-safe-area-context";
import TitleHeader from "@/components/shared/TitleHeader";

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const { image, name, category = "[]", color = "[]" } = params;
  
  // Parse array strings
  const categoryArray = JSON.parse(category as string);
  const colorArray = JSON.parse(color as string);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, alignItems: 'center' }}>
        <TitleHeader title="Your Item" showBackButton={true} />
        <View style={styles.containerArea}>
            <ItemImage image={image as string} />
            <Text style={styles.name}>{name}</Text>

            <View style={styles.line}>
                <Text style={styles.text}>Category</Text>
                <View style={styles.itemLine}>
                    {categoryArray.map((cat: string, index: number) => (
                    <SwTag key={index} text={cat} />
                    ))}
                </View>
            </View>

            <View style={styles.line}>
                <Text style={styles.text}>Colors</Text>
                <View style={styles.itemLine}>
                    {colorArray.map((col: string, index: number) => (
                <SwColor key={index} color={col} />
                ))}
                </View>
            </View>
        </View>
        <SwNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerArea: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    // alignItems: 'center',
    },
  text: {
    fontSize: 18,
    color: Colors.pink,
    marginVertical: 10,
    fontFamily: 'League Spartan',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontFamily: 'League Spartan',
    color: '#4B4544',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  line: {
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 4,
  },
  itemLine: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 5,
  }
});
