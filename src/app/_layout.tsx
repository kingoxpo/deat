import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import { useAuthStore } from '../stores/useAuth';

import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { ActivityIndicator, View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const checkLoginStatus = useAuthStore((state: any) => state.checkLoginStatus);
  const isLoggedIn = useAuthStore((state: any) => state.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      await checkLoginStatus();
      if (!loaded) {
        SplashScreen.hideAsync();
      }
    };
    init();
  }, [loaded]);

  useEffect(() => {
    if (isLoggedIn !== undefined && !isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn]);

  if (!loaded) {
    return null;
  }

  if (!loaded || isLoggedIn === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NativeBaseProvider>
       <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="StoreDetail" options={{ title: 'Store Details' }} />
          <Stack.Screen name="CreateMenu" options={{ title: 'Create Menu' }} />
          <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
        </Stack>
      </ThemeProvider>
    </NativeBaseProvider>
  );
}
