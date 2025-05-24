import SwNavigator from '@/components/shared/SwNavigator';
import { Colors } from '@/constants/Colors';
import { Slot, useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LayoutScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Slot />
            </View>
            <SwNavigator></SwNavigator>
        </SafeAreaView>
    );
};

export default LayoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        backgroundColor: Colors.white,
        // paddingVertical: 20,
        paddingHorizontal: 20,
    }
});


