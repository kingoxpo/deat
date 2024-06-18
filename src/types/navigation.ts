import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
export interface HeaderProps {
  title: string;
}

export type AuthList = {
  login: undefined;
  index: undefined;
  signup: undefined;
};

export type Store = {
  id: string;
  key: string;
  name: string;
}

export type RootStackParamList = {
  cart: undefined;
  menu: undefined;
  index: undefined;
  store: any;
  StoreDetail: any;
  CreateMenu: any;
  search: undefined;
  favorites: undefined;
  orders: undefined;
  profile: undefined;
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