import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.darkPink} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});

