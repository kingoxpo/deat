import { Tabs, useNavigation, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Button, Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [showHomeButton, setShowHomeButton] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const route = navigation.getState().routes[navigation.getState().index];
      setShowHomeButton(route.name !== 'index');
    }, [navigation])
  );

  return (
    <>
      {showHomeButton && (
        <View style={{ padding: 10, backgroundColor: Colors[colorScheme ?? 'light'].background }}>
          <Button
            title="홈 화면으로"
            onPress={() => navigation.navigate('index')}
          />
        </View>
      )}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarButton: () => null, // 탭에서 제외
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: '검색',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="store"
          options={{
            title: '스토어',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: '찜',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: '주문내역',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: '마이페이지',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
