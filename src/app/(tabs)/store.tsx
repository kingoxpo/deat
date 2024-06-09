import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { StoreScreenNavigationProp } from '../../types/navigation';
import useStore from '@/src/stores/useStore';

type StoreScreenRouteProp = RouteProp<{ store: { categoryCode?: number } }, 'store'>;

const StoreScreen: React.FC = () => {
  const route = useRoute<StoreScreenRouteProp>();
  const navigation = useNavigation<StoreScreenNavigationProp>();

  const categoryCode = route.params?.categoryCode;  // 기본값으로 undefined 허용
  const { stores, loading, error, fetchStores } = useStore((state: any) => state);

  useEffect(() => {
    fetchStores(categoryCode);
  }, [categoryCode]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StoreDetail', { store: item })}>
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
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
      keyExtractor={(item) => item._id}
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
