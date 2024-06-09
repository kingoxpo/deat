import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import useMenu from '../stores/useMenu';
type CreateMenuScreenNavigationProp = RouteProp<{ CreateMenu: { storeId: any } }, 'CreateMenu'>;

const CreateMenu = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const { addMenu, loading, error } = useMenu();
  const route = useRoute<CreateMenuScreenNavigationProp>();

  const { storeId } = route.params;

  const navigation = useNavigation();

  const handleCreateMenu = async () => {
    try {
      await addMenu({
        name,
        description,
        price: parseFloat(price), // 가격을 숫자로 변환
        ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
        storeId
      });
      Alert.alert('Success', 'Menu created successfully');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Failed to create menu');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Menu</Text>
      <TextInput
        style={styles.input}
        placeholder="Menu Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric" // 숫자 입력 전용 키보드
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChangeText={setIngredients}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Create Menu" onPress={handleCreateMenu} />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default CreateMenu;