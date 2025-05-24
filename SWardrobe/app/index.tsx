import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const check = async () => {
            const seen = await AsyncStorage.getItem('hasSeenOnboarding');
            if (seen === 'true') {
                router.replace('/launch');
            } else {
                router.replace('/onboarding');
            }
        };

        check();
    }, []);

    return (
        <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </SafeAreaProvider>
    );
}
