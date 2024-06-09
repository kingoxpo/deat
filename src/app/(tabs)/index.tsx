import React, { useEffect }from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';
import useLocation from '@/src/stores/useLocation';

export default function HomeScreen() {
  const categories = [
    { cate_name: '치킨', cate_code: 1 },
    { cate_name: '피자', cate_code: 2 },
    { cate_name: '한식', cate_code: 3 },
    { cate_name: '중식', cate_code: 4 },
    { cate_name: '일식', cate_code: 5 },
    { cate_name: '양식', cate_code: 6 },
    { cate_name: '분식', cate_code: 7 },
    { cate_name: '카페', cate_code: 8 },
  ];

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // 위치정보
  const { location, errorMsg, requestLocation } = useLocation();
  useEffect(() => {
    requestLocation();
  }, []);

  const goStore = (cate_code: number) => {
    navigation.navigate('store', { categoryCode: cate_code });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://store.img11.co.kr/64080781/ba22b81b-898f-4f97-8373-bc874612c8c0_1717472874064.png' }}
          style={styles.bannerImage}
        />
      </View>

      {/* Category Menu */}
      <View style={styles.categoryMenu}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => goStore(category.cate_code)}>
            <Text style={styles.categoryText}>{category.cate_name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recommended Restaurants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>추천 맛집</Text>
        {/* Restaurant Cards */}
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={{ uri: 'https://example.com/restaurant.jpg' }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Restaurant Name</Text>
            <Text style={styles.cardDescription}>Restaurant Description</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  homeButton: {
    position: 'absolute',
    right: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f99bb5',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  bannerContainer: {
    padding: 15,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  locationContainer: {
    padding: 15,
  },
  categoryMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  categoryItem: {
    width: '23%',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});
