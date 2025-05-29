import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Category from '@/components/closet/Category';
import ItemCard from '@/components/closet/ItemCard';
import { Item } from '@/constants/Item';
import { useLocalSearchParams } from "expo-router";
import TitleHeader from '@/components/shared/TitleHeader';

export default function CategoryScreen({ items = [] }: { items: Item[] }) {
    const params = useLocalSearchParams();
    const itemList = params.items ? JSON.parse(params.items as string) : [];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <TitleHeader title="Category" showBackButton={true} />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.itemsWrapper}>
                    {itemList.map((item: Item, index: number) => (
                        <View key={item.id || index} style={styles.itemWrapper}>
                            <ItemCard item={item} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    itemsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    itemWrapper: {
        width: '48%', // 2 items per row with spacing
        marginBottom: 16,
    },
});
