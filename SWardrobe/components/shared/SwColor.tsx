import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

export default function SwColor({color}: { color: string }) {
    return (
        <View style={[styles.colorBox, { backgroundColor: color }]}>
        </View>
    );
}

const styles = StyleSheet.create({
    colorBox: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    }
})
