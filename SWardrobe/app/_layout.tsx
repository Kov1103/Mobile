import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getUser } from '@/service/user.service';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter_18pt-Regular.ttf'),
    'LeagueSpartan-Regular': require('../assets/fonts/LeagueSpartan-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'LeagueSpartan-SemiBold': require('../assets/fonts/LeagueSpartan-SemiBold.ttf'),
  });

  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);
  const [hasLogin, setHasLogin] = useState<boolean | null>(false);

  useEffect(() => {
    let isMounted = true;

    const prepare = async () => {
      try {
        const value = await AsyncStorage.getItem('hasSeenOnboarding');
        if (isMounted) {
          setHasSeenOnboarding(value === 'true');
        }
        const userId = await AsyncStorage.getItem('id');
        if (userId) {
          const response = await getUser(Number(userId));
          if (isMounted) {
            setHasLogin(response.status >= 200 && response.status < 300);
          }
        } else {
          if (isMounted) {
            setHasLogin(false);
          }
        }
        if (fontsLoaded && isMounted) {
          await SplashScreen.hideAsync();
        }
      } catch (err) {
        console.error('🔥 Error in prepare()', err);
        if (isMounted) {
          setHasLogin(false);
          setHasSeenOnboarding(false);
        }
        if (fontsLoaded && isMounted) {
          await SplashScreen.hideAsync();
        }
      }
    };

    prepare();

    return () => {
      isMounted = false;
    };
  }, [fontsLoaded]);

  // useEffect(() => {
  //   AsyncStorage.removeItem('hasSeenOnboarding');
  // }, []);

  if (!fontsLoaded || hasSeenOnboarding === null) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!hasSeenOnboarding ? (
          <Stack.Screen name="onboarding/index" />
        ) : hasLogin ? (
          <Stack.Screen name="navigate" />
        ) : (
          <Stack.Screen name="launch/index" />
        )}
        {/* <Stack.Screen name="launch/index" /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
