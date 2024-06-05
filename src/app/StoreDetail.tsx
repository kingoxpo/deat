import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

type StoreDetailScreenRouteProp = RouteProp<{ StoreDetail: { store: any } }, 'StoreDetail'>;

const StoreDetail: React.FC = () => {
  const route = useRoute<StoreDetailScreenRouteProp>();
  console.log(route, '--route--');
  const { store } = route.params;
  console.log(store, '--store---');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{store.name}</Text>
      <Text style={styles.text}>Address: {store.add1} {store.add2}</Text>
      <Text style={styles.text}>Email: {store.email}</Text>
      <Text style={styles.text}>Phone: {store.htel}</Text>
      <Text style={styles.text}>Category: {store.cate}</Text>
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
});

export default StoreDetail;
