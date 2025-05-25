import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import SwScanNavigator from '@/components/shared/SwScanNavigator';
import { Colors } from '@/constants/Colors';
import { ScanProvider } from './scan.context';

const NAV_HEIGHT = 73;

export const ScanContext = React.createContext<{ onScanPress?: () => void }>({});

const LayoutScreen = () => {
    const [onScanPress, setOnScanPress] = useState<(() => void) | undefined>(undefined);

    useEffect(() => {
    }, [onScanPress]);

    return (
        <SafeAreaView style={styles.container}>
            <ScanProvider>
                <View style={[styles.content, { paddingBottom: NAV_HEIGHT }]}>
                    <Slot />
                </View>
                <SwScanNavigator onScanPress={onScanPress} />
            </ScanProvider>
        </SafeAreaView>
    );
};

export default LayoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        width: '100%',
        backgroundColor: Colors.white,
    },
    navigatorWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
    },
});
