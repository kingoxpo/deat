import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Store } from '@/src/types/navigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useStoreStore } from '@/src/stores/useStoreStore';
import Config from 'react-native-config';

type StoreScreenRouteProp = RouteProp<{ StoreScreen: { categoryCode: number } }, 'StoreScreen'>;

const StoreScreen: React.FC = () => {
  const route = useRoute<StoreScreenRouteProp>();

  const { categoryCode } = route.params;
  const { stores, loading, error, fetchStores } = useStoreStore((state) => state);

  useEffect(() => {
    fetchStores(categoryCode);
  }, [categoryCode, fetchStores]);

  const renderItem = ({ item }: { item: Store }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={stores}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StoreScreen;
