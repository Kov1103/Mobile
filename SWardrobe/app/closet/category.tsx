import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Category from '@/components/closet/Category';

export default function CategoryScreen({ items }: { items: any[] }) {
    return (
        <SafeAreaView>
            <ScrollView>
                <Category items={items} />
            </ScrollView>
        </SafeAreaView>
    )
}