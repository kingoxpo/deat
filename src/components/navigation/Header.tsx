import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { HeaderProps, RootStackParamList } from '@/src/types/navigation';
import { TabBarIcon } from '@/src/components/navigation/TabBarIcon'; // TabBarIcon 컴포넌트를 임포트합니다.


const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showHomeButton, setShowHomeButton] = useState(false);
  
  useFocusEffect(
    useCallback(() => {
      const route = navigation.getState().routes[navigation.getState().index];
      setShowHomeButton(route.name !== 'index');
    }, [navigation])
  );
  
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      {showHomeButton && (
        <TouchableOpacity onPress={() => navigation.navigate('index')} style={styles.homeButton}>
          <TabBarIcon name="home-outline" color="white" size={25} />
        </TouchableOpacity>
      )}
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