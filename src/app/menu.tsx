import React from 'react';
import { View, Text, Button, FlatList, ListRenderItem } from 'react-native';
import { MenuItem, RootStackParamList } from '@/src/types/navigation';
import { NativeStackScreenProps, } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'menu'>;

const Menu: React.FC<Props> = ({ navigation }) => {
  const menuItems = [
    { id: '1', name: 'Pizza', price: 10 },
    { id: '2', name: 'Burger', price: 8 },
    { id: '3', name: 'Pasta', price: 12 },
  ];

  const renderItem: ListRenderItem<MenuItem> = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      <Button title="Add to Cart" onPress={() => navigation.navigate('cart')} />
    </View>
  );

  return (
    <FlatList
      data={menuItems}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default Menu;
