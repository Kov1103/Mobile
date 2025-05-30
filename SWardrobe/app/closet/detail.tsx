import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import SwNavigator from '@/components/shared/SwNavigator';
import { SafeAreaView } from "react-native-safe-area-context";
import TitleHeader from "@/components/shared/TitleHeader";
import ItemDetailComponent from "@/components/shared/ItemDetail";
import { getItem } from "@/service/item.service";

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const { id } = params;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const data = getItem(Number(id));
    data.then((res) => {
      setData(res);
    }).catch((err) => {
      console.error("Error fetching item:", err);
    });
  })


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white}}>
      <TitleHeader title="Your Item" showBackButton={true} />
      <View style={styles.containerArea}>
        <ItemDetailComponent image={data?.image[0]} name={data?.name} category={data?.category} color={data?.color} addButton={false}></ItemDetailComponent>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerArea: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
