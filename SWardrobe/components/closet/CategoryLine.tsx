import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Category from '@/components/closet/Category';
import SwArrow from '../shared/SwArrow';
import {Item, CategoryProps, useItemStore} from '@/constants/Item';


const CategoryLine: React.FC<CategoryProps> = ({ items }) => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <View style={styles.itemWrapper}>
                    <Category items={items} />
                </View>
            </ScrollView>
        </View>
    );
};

export default CategoryLine;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: 0,
        width: '100%',
    },
    itemWrapper: {
        marginRight: 0,
        padding: 0
    },
    noItemsText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
    },
    

});
