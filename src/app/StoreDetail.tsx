import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { CreateMenuScreenNavigationProp } from '../types/navigation';
import useMenuStore from '../stores/useMenu';

type StoreDetailScreenRouteProp = RouteProp<{ StoreDetail: { store: any } }, 'StoreDetail'>;

const StoreDetail: React.FC = () => {
  const navigation = useNavigation<CreateMenuScreenNavigationProp>();
  const route = useRoute<StoreDetailScreenRouteProp>();
  const { store } = route.params;
  console.log(store, '--store---');

  const { menus, loading, error, fetchMenus } = useMenuStore();

  useEffect(() => {
    fetchMenus(store._id);
  }, [fetchMenus, store._id]);

  useFocusEffect(
    useCallback(() => {
      fetchMenus(store._id);
    }, [fetchMenus, store._id])
  );

  console.log(menus, '--menus--');

  const navigateToCreateMenu = () => {
    navigation.navigate('CreateMenu', { storeId: store._id });
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardText}>메뉴설명: {item.description}</Text>
      <Text style={styles.cardText}>가격: {item.price}</Text>
      <Text style={styles.cardText}>재료: {item.ingredients.join(', ')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 스토어 상세 정보 */}
      <Text style={styles.title}>{store.name}</Text>
      <Text style={styles.text}>Address: {store.add1} {store.add2}</Text>
      <Text style={styles.text}>Email: {store.email}</Text>
      <Text style={styles.text}>Phone: {store.htel}</Text>
      <Text style={styles.text}>Category: {store.cate}</Text>

      

      {/* 메뉴 리스트 */}
      {loading ? (
        <Text>Loading menus...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={menus}
          renderItem={renderItem}
          keyExtractor={(item: { _id: any; }) => item._id || ''}
          contentContainerStyle={styles.menuList}
        />
      )}

      {/* 메뉴 생성 버튼 */}
      <Button title="메뉴 생성" onPress={navigateToCreateMenu} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  menuList: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default StoreDetail;
