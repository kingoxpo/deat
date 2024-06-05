import { StackNavigationProp } from '@react-navigation/stack';
export interface HeaderProps {
  title: string;
}

export type AuthList = {
  Login: undefined;
  Home: undefined;
  Signup: undefined;
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
  search: undefined;
  favorites: undefined;
  orders: undefined;
  profile: undefined;
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