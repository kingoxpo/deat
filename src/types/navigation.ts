export interface AppStackParamList {
    home: undefined;
    search: undefined;
    store: undefined;
    favorites: undefined;
    orders: undefined;
    profile: undefined;
  }
  
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
    name: string;
  }
  export type RootStackParamList = {
    index: undefined;
    StoreScreen: any;
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