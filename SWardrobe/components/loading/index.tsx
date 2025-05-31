import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import TitleText from '../shared/text/TitleText';

export default function Loading({text}: {text?: string}) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" color={Colors.darkPink} />
            <TitleText style={{marginTop: 10, fontWeight: 'bold'}}>{text}</TitleText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(220, 190, 182, 0.1)'
    }
});

