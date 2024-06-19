import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
export interface HeaderProps {
  title: string;
}

export type Store = {
  id: string;
  key: string;
  name: string;
}

export type RootStackParamList = {
  cart: any;
  menu: any;
  index: any;
  store: any;
  StoreDetail: any;
  CreateMenu: any;
  search: any;
  favorites: any;
  orders: any;
  profile: any;
  signup: any;
  login: any;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
};

export type StoreScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'store'
>;

export type StoreDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'StoreDetail'
>;

export type CreateMenuScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateMenu'
>;