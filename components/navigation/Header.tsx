import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HeaderProps, RootStackParamList } from '@/types/navigation';
import { TabBarIcon } from '@/components/navigation/TabBarIcon'; // TabBarIcon 컴포넌트를 임포트합니다.


const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.homeButton}>
        <TabBarIcon name="home-outline" color="white" size={25} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#CCCCFF',
    padding: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  homeButton: {
    position: 'absolute',
    right: 25,
    top: 18
  },
  homeIcon: {
    marginRight: 10,
  },
});

export default Header;