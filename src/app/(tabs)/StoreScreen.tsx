import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useStoreStore } from '@/src/stores/useStoreStore';
import Config from 'react-native-config';

type StoreScreenRouteProp = RouteProp<{ StoreScreen: { categoryCode: number } }, 'StoreScreen'>;

const StoreScreen: React.FC = () => {
  const route = useRoute<StoreScreenRouteProp>();
  const { categoryCode } = route.params;
  const { stores, loading, error, fetchStores } = useStoreStore((state) => state);

  console.log(stores, '--stores');
  useEffect(() => {
    fetchStores(categoryCode);
  }, [categoryCode]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
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
