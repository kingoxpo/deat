import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';


export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>먹자</Text>
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://example.com/banner.jpg' }}
          style={styles.bannerImage}
        />
      </View>

      {/* Category Menu */}
      <View style={styles.categoryMenu}>
        {['치킨', '피자', '한식', '중식', '일식', '양식', '분식', '카페'].map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <Text style={styles.categoryText}>{category}</Text>
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
